import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NoteCard from '../Notes/NoteCard';
import NoteEditor from '../Notes/NoteEditor';
import NoteViewer from '../Notes/NoteViewer';
import WalletConnect from '../Wallet/WalletConnect';
import { Plus, Search } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    let filtered = notes;

    if (currentCategory !== 'all') {
      filtered = filtered.filter(note => note.category === currentCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredNotes(filtered);
  }, [notes, currentCategory, searchQuery]);

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
        isPinned: false
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

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  if (showWallet) {
    return <WalletConnect user={user} onClose={() => setShowWallet(false)} />;
  }

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
        onLogout={onLogout}
        onShowWallet={() => setShowWallet(true)}
      />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-top">
            <h1>My Notes</h1>
            <button className="btn-primary" onClick={handleCreateNote}>
              <Plus size={20} />
              New Note
            </button>
          </div>

          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="notes-container">
          {pinnedNotes.length > 0 && (
            <div className="notes-section">
              <h2 className="section-title">Pinned</h2>
              <div className="notes-grid">
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

          {unpinnedNotes.length > 0 && (
            <div className="notes-section">
              {pinnedNotes.length > 0 && <h2 className="section-title">All Notes</h2>}
              <div className="notes-grid">
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

          {filteredNotes.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h2>No Folder Found</h2>
              <p>
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