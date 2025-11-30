import React from 'react';
import { Pin, Edit, Trash2, Clock } from 'lucide-react';
import './Notes.css';

const NoteCard = ({ note, onView, onEdit, onDelete, onTogglePin }) => {
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
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const preview = note.content.length > 150
    ? note.content.substring(0, 150) + '...'
    : note.content;

  return (
    <div className="note-card" onClick={onView}>
      <div className="note-card-header">
        <span
          className="note-category"
          style={{ backgroundColor: getCategoryColor(note.category) }}
        >
          {note.category}
        </span>
        <button
          className={`pin-btn ${note.isPinned ? 'pinned' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
        >
          <Pin size={16} />
        </button>
      </div>

      <h3 className="note-title">{note.title}</h3>
      <p className="note-preview">{preview}</p>

      <div className="note-card-footer">
        <div className="note-date">
          <Clock size={14} />
          {formatDate(note.updatedAt || note.createdAt)}
        </div>
        <div className="note-actions">
          <button
            className="action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit size={16} />
          </button>
          <button
            className="action-btn delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;