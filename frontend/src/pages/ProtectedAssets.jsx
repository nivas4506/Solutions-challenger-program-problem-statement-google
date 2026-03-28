import React, { useState, useEffect } from 'react';
import { FileVideo, Shield, PlayCircle, UploadCloud, RefreshCw } from 'lucide-react';

export default function ProtectedAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchAssets = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/ingest/assets');
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
    // Poll every 5 seconds for status updates (e.g., analyzing -> protected)
    const interval = setInterval(fetchAssets, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('http://localhost:8080/api/ingest/upload', {
        method: 'POST',
        body: formData,
      });
      // Refresh list immediately after upload request completes
      fetchAssets();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      event.target.value = null; // Reset input
    }
  };

  return (
    <div className="dashboard-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Protected Assets</h1>
          <p className="page-subtitle">Manage and monitor your digital media catalog</p>
        </div>
        
        {/* Upload Button */}
        <div>
          <input 
            type="file" 
            id="video-upload" 
            accept="video/*" 
            style={{ display: 'none' }} 
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <label htmlFor="video-upload" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
            background: 'var(--color-primary)', color: '#fff', 
            padding: '0.75rem 1.5rem', borderRadius: '8px', 
            fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.7 : 1
          }}>
            {uploading ? <RefreshCw size={18} className="spin" /> : <UploadCloud size={18} />}
            {uploading ? 'Vaulting...' : 'Secure New Asset'}
          </label>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0', marginTop: '1.5rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <div className="panel-title" style={{ marginBottom: 0 }}>
            <FileVideo size={18} color="var(--color-primary)" />
            Live Vault Catalog
          </div>
        </div>
        
        {loading && assets.length === 0 ? (
           <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Synching with Deep Analysis Core...</div>
        ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Asset ID</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Filename</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Ingestion Time</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>DNA Snapshot</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No assets vaulted yet. Upload a video to extract a mathematical fingerprint.
                </td>
              </tr>
            ) : (
              assets.map((asset) => {
                let statusClass = '';
                let statusLabel = asset.status.toUpperCase();
                
                if (asset.status === 'protected') statusClass = 'blocked';      // Green badge
                else if (asset.status === 'analyzing') statusClass = 'pending'; // Orange badge
                else if (asset.status === 'failed') statusClass = 'danger';     // Red badge

                // Parse DNA to show a preview
                let dnaPreview = "Awaiting extraction...";
                try {
                  if (asset.digital_dna) {
                    const hashes = JSON.parse(asset.digital_dna);
                    dnaPreview = hashes.length > 0 ? `${hashes[0].substring(0, 12)}... [${hashes.length} frames]` : "No frames found";
                  }
                } catch(e) {}

                return (
                  <tr key={asset.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }} className="hover-row">
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>VAULT-{asset.id.toString().padStart(4, '0')}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <PlayCircle size={16} color="var(--color-primary)" />
                      {asset.filename}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>
                      {new Date(asset.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span className={`status-badge ${statusClass}`}>
                        {asset.status === 'protected' && <Shield size={10} style={{marginRight: '4px', display: 'inline-block'}}/>}
                        {statusLabel}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-accent)', fontFamily: 'monospace' }}>
                      {dnaPreview}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        )}
      </div>
      <style>{`
        .hover-row:hover { background: rgba(255,255,255,0.02); }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .danger { background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); color: var(--color-danger); }
      `}</style>
    </div>
  );
}
