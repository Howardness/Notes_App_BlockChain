import React from 'react';
import { X, Edit, Trash2, Pin } from 'lucide-react';
import './Notes.css';

const NoteViewer = ({ note, onEdit, onDelete, onTogglePin, onClose }) => {
  const getCategoryColor = (category) => {
    const colors = {
      work: '#3b82f6',
      personal: '#ec4899',
      ideas: '#8b5cf6',
      learning: '#10b981'
    };
    return colors[category] || '#6b7280';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container viewer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="viewer-header-left">
            <h2>{note.title}</h2>
            <span
              className="note-category"
              style={{ backgroundColor: getCategoryColor(note.category) }}
            >
              {note.category}
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="viewer-content">
          <div className="viewer-meta">
            <span>Created: {formatDate(note.createdAt)}</span>
            {note.updatedAt && <span>Updated: {formatDate(note.updatedAt)}</span>}
          </div>

          <div className="viewer-text">
            {note.content}
          </div>
        </div>

        <div className="modal-footer">
          <button
            className={`btn-icon ${note.isPinned ? 'active' : ''}`}
            onClick={onTogglePin}
          >
            <Pin size={20} />
            {note.isPinned ? 'Unpin' : 'Pin'}
          </button>
          <div className="footer-actions">
            <button className="btn-secondary" onClick={onEdit}>
              <Edit size={20} />
              Edit
            </button>
            <button className="btn-danger" onClick={onDelete}>
              <Trash2 size={20} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;