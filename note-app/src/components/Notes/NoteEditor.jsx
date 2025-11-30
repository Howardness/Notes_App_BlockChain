import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const NoteEditor = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');

  useEffect(() => {
    if (note) {
      const timer = setTimeout(() => {
        setTitle(note.title || '');
        setContent(note.content || '');
        setCategory(note.category || 'personal');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ title, content, category });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{note ? 'Edit Note' : 'New Note'}</h2>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 flex-1 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
              required
              autoFocus
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
              required
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="ideas">Ideas</option>
              <option value="learning">Learning</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="w-full border-2 border-gray-200 rounded-lg p-3 min-h-[200px] resize-vertical focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
              required
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-4 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center gap-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 flex items-center gap-2"
            >
              <Save size={18} />
              {note ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
