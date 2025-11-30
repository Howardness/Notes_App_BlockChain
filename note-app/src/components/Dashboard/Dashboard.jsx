import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NoteCard from '../notes/NoteCard';
import NoteEditor from '../Notes/NoteEditor';
import NoteViewer from '../Notes/NoteViewer';
import WalletConnect from '../Wallet/WalletConnect';
import { Plus, Search } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setTimeout(() => setNotes(savedNotes), 0);
  }, []);

  const handleSaveNote = (noteData) => {
    let updatedNotes;

    if (editingNote) {
      updatedNotes = notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...noteData, updatedAt: new Date().toISOString() }
          : note
      );
    } else {
      const newNote = {
        id: Date.now(),
        ...noteData,
        createdAt: new Date().toISOString(),
        isPinned: false,
      };
      updatedNotes = [newNote, ...notes];
    }

    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setShowViewer(false);
      setSelectedNote(null);
    }
  };

  const handleTogglePin = (noteId) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleViewNote = (note) => {
    setSelectedNote(note);
    setShowViewer(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowViewer(false);
    setShowEditor(true);
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  // Compute filtered notes on the fly
  const filteredNotes = notes.filter(note => {
    if (currentCategory !== 'all' && note.category !== currentCategory) return false;
    if (
      searchQuery &&
      !note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  if (showWallet) {
    return <WalletConnect user={user} onClose={() => setShowWallet(false)} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        user={user}
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
        onLogout={onLogout}
        onShowWallet={() => setShowWallet(true)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <button
              onClick={handleCreateNote}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-1 transition"
            >
              <Plus size={20} />
              New Note
            </button>
          </div>

          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Notes Sections */}
        <div className="space-y-12">
          {/* Pinned Notes */}
          {pinnedNotes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pinned</h2>
              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {pinnedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onView={() => handleViewNote(note)}
                    onEdit={() => handleEditNote(note)}
                    onDelete={() => handleDeleteNote(note.id)}
                    onTogglePin={() => handleTogglePin(note.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Unpinned Notes */}
          {unpinnedNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && <h2 className="text-xl font-semibold text-gray-800 mb-4">All Notes</h2>}
              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {unpinnedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onView={() => handleViewNote(note)}
                    onEdit={() => handleEditNote(note)}
                    onDelete={() => handleDeleteNote(note.id)}
                    onTogglePin={() => handleTogglePin(note.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredNotes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-50">📝</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Notes Found</h2>
              <p className="text-gray-500">
                {searchQuery
                  ? 'Try a different search term'
                  : currentCategory === 'all'
                  ? 'Create your first note to get started'
                  : `No notes in ${currentCategory} category`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showEditor && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => {
            setShowEditor(false);
            setEditingNote(null);
          }}
        />
      )}

      {showViewer && selectedNote && (
        <NoteViewer
          note={selectedNote}
          onEdit={() => handleEditNote(selectedNote)}
          onDelete={() => handleDeleteNote(selectedNote.id)}
          onTogglePin={() => handleTogglePin(selectedNote.id)}
          onClose={() => {
            setShowViewer(false);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
