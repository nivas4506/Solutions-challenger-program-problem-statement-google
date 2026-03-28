from fastapi import FastAPI, UploadFile, File, BackgroundTasks, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import time

import models
from database import engine, get_db
from fingerprint_engine import process_video_fingerprint

# Create Database Tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Media Ingestion & Fingerprinting Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "vault"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def background_fingerprint_task(asset_id: int, file_path: str, db: Session):
    try:
        # Update status
        asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
        asset.status = "analyzing"
        db.commit()

        print(f"[{asset_id}] Extracting structural frame sequence...")
        time.sleep(1) # Fake delay for visual effect
        
        # Run Core Engine
        dna_sequence = process_video_fingerprint(file_path)
        
        # Save to Secure Database
        asset.digital_dna = dna_sequence
        asset.status = "protected"
        db.commit()
        
        print(f"[{asset_id}] High-Entropy Perceptual DNA securely generated and vaulted!")
        
    except Exception as e:
        print(f"[{asset_id}] Error in fingerprint task: {e}")
        asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
        if asset:
            asset.status = "failed"
            db.commit()

@app.post("/upload")
async def upload_media(
    background_tasks: BackgroundTasks, 
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    try:
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        
        # Save file to disk
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
            
        # Create database entry
        db_asset = models.Asset(filename=file.filename, status="queued")
        db.add(db_asset)
        db.commit()
        db.refresh(db_asset)
        
        # Kick off background fingerprinting worker
        background_tasks.add_task(background_fingerprint_task, db_asset.id, file_location, db)
        
        return {
            "status": "success",
            "message": "File accurately staged in the Secure Vault for deep fingerprinting extraction.",
            "asset_id": db_asset.id,
            "filename": file.filename
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/assets")
def get_assets(db: Session = Depends(get_db)):
    return db.query(models.Asset).all()

@app.get("/health")
def health_check():
    return {"status": "Ingestion Core Healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)
