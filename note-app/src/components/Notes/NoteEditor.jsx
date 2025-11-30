import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import './Notes.css';

const NoteEditor = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setCategory(note.category || 'personal');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ title, content, category });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{note ? 'Edit Note' : 'New Note'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="ideas">Ideas</option>
              <option value="learning">Learning</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              required
              rows={12}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={20} />
              {note ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;