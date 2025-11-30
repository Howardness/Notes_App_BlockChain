import React from 'react';
import { Pin, Edit, Trash2, Clock } from 'lucide-react';

const NoteCard = ({ note, onView, onEdit, onDelete, onTogglePin }) => {
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
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const preview =
    note.content.length > 150 ? note.content.substring(0, 150) + '...' : note.content;

  return (
    <div
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer border-2 border-transparent hover:border-indigo-500"
      onClick={onView}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-white text-xs font-semibold px-3 py-1 rounded-full capitalize ${getCategoryColor(
            note.category
          )}`}
        >
          {note.category}
        </span>
        <button
          className={`p-1 rounded hover:bg-gray-100 transition ${
            note.isPinned ? 'text-indigo-500' : 'text-gray-400'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
        >
          <Pin size={16} />
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">{note.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{preview}</p>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <Clock size={14} />
          {formatDate(note.updatedAt || note.createdAt)}
        </div>
        <div className="flex gap-2">
          <button
            className="p-1 rounded hover:bg-gray-100 transition text-gray-500 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit size={16} />
          </button>
          <button
            className="p-1 rounded hover:bg-red-100 hover:text-red-500 transition text-gray-500 flex items-center justify-center"
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
