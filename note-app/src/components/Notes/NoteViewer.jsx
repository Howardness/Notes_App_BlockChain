import React from 'react';
import { X, Edit, Trash2, Pin } from 'lucide-react';

const NoteViewer = ({ note, onEdit, onDelete, onTogglePin, onClose }) => {
  const getCategoryColor = (category) => {
    const colors = {
      work: 'bg-blue-500',
      personal: 'bg-pink-500',
      ideas: 'bg-purple-500',
      learning: 'bg-green-500',
    };
    return colors[category] || 'bg-gray-400';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{note.title}</h2>
            <span
              className={`text-white text-xs font-semibold px-3 py-1 rounded-full capitalize ${getCategoryColor(
                note.category
              )}`}
            >
              {note.category}
            </span>
          </div>
          <button
            className="p-2 rounded hover:bg-gray-100 text-gray-500 transition"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-4">
          <div className="flex gap-4 text-gray-400 text-sm border-b border-gray-200 pb-3">
            <span>Created: {formatDate(note.createdAt)}</span>
            {note.updatedAt && <span>Updated: {formatDate(note.updatedAt)}</span>}
          </div>

          <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap flex-1">
            {note.content}
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            className={`px-4 py-2 rounded-lg border-2 border-gray-200 flex items-center gap-2 ${
              note.isPinned ? 'border-indigo-500 text-indigo-500 bg-indigo-50' : 'text-gray-500'
            } hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 transition`}
            onClick={onTogglePin}
          >
            <Pin size={20} />
            {note.isPinned ? 'Unpin' : 'Pin'}
          </button>

          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold flex items-center gap-2 hover:bg-gray-300 transition"
              onClick={onEdit}
            >
              <Edit size={20} />
              Edit
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold flex items-center gap-2 hover:bg-red-600 transition"
              onClick={onDelete}
            >
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
