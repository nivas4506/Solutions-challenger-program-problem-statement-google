import cv2
import imagehash
from PIL import Image
import os
import json

def process_video_fingerprint(video_path: str) -> str:
    """
    Extracts 1 frame per second from the video, 
    calculates the perceptual hash (pHash) for each frame,
    and returns a unique digital DNA array (JSON string).
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file {video_path} not found")

    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps == 0:
        fps = 30 # fallback
        
    phash_sequence = []
    
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        # Capture 1 frame every second
        if int(frame_count % fps) == 0:
            # OpenCV uses BGR, convert to RGB for standard image processing
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(rgb_frame)
            
            # Generate Perceptual Hash
            p_hash = str(imagehash.phash(pil_img))
            phash_sequence.append(p_hash)
            
        frame_count += 1
        
        # Max limit for prototype: 60 seconds (60 frames) to speed up testing
        if len(phash_sequence) >= 60:
            break

    cap.release()
    
    return json.dumps(phash_sequence)
