import React, { useState, useEffect } from 'react';
import { uploadPhoto, getPhotos, deletePhoto } from '../api';
import './PhotoShare.css';

function PhotoShare() {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const data = await getPhotos();
      setPhotos(data);
    } catch (err) {
      console.error('Failed to load photos:', err);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('caption', caption);

      await uploadPhoto(formData);
      
      setSelectedFile(null);
      setCaption('');
      setPreview(null);
      await loadPhotos();
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await deletePhoto(photoId);
        await loadPhotos();
      } catch (err) {
        setError('Failed to delete photo');
      }
    }
  };

  return (
    <div className="photo-share-container">
      <div className="upload-section">
        <h2>📸 Share a Photo</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleUpload} className="upload-form">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="photo-input"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={loading}
            />
            <label htmlFor="photo-input" className="file-label">
              Choose Photo
            </label>
          </div>

          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            className="caption-input"
            disabled={loading}
            maxLength={500}
          />

          <div className="char-count">
            {caption.length}/500
          </div>

          <button type="submit" disabled={loading || !selectedFile} className="upload-btn">
            {loading ? 'Uploading...' : 'Share Photo'}
          </button>
        </form>
      </div>

      <div className="photos-grid-section">
        <h2>📷 Photo Feed</h2>
        
        {photos.length === 0 ? (
          <p className="empty-message">No photos yet. Be the first to share!</p>
        ) : (
          <div className="photos-grid">
            {photos.map((photo) => (
              <div key={photo._id} className="photo-card">
                <img 
                  src={`data:${photo.mimetype};base64,${photo.data}`} 
                  alt="Photo" 
                  className="photo-image"
                />
                <div className="photo-info">
                  <p className="photo-username">@{photo.username}</p>
                  {photo.caption && <p className="photo-caption">{photo.caption}</p>}
                  <p className="photo-date">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </p>
                  {photo.userId === localStorage.getItem('userId') && (
                    <button
                      onClick={() => handleDelete(photo._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoShare;
