import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {decrypt, encrypt} from '../../helpers/encryption';
import {STORAGE_KEY} from '@env';
import {Note} from '../../types/note.type';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [viewNote, setViewNote] = useState<Note | null>(null);
  const [editNote, setEditNote] = useState<Note | null>(null);

  const loadNotes = useCallback(async () => {
    try {
      const savedNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        const decryptedNotes = JSON.parse(savedNotes).map((note: Note) => ({
          ...note,
          title: decrypt(note.title),
          content: decrypt(note.content),
        }));
        setNotes(decryptedNotes);
      }
    } catch (error) {
      console.error('Error loading notes from AsyncStorage:', error);
    }
  }, []);

  const saveNotesToStorage = useCallback(async (notesToSave: Note[]) => {
    try {
      const encryptedNotes = notesToSave.map((note: Note) => ({
        ...note,
        title: encrypt(note.title),
        content: encrypt(note.content),
      }));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(encryptedNotes));
    } catch (error) {
      console.error('Error saving notes to AsyncStorage:', error);
    }
  }, []);

  const addNote = useCallback(() => {
    if (
      newNote &&
      newNote.title.trim() !== '' &&
      newNote.content.trim() !== ''
    ) {
      const newId = (notes.length + 1).toString();
      const updatedNotes = [...notes, {...newNote, id: newId}];
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
      setNewNote(null);
      setModalVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newNote, notes]);

  const openCreateNoteModal = useCallback(() => {
    setNewNote({id: '', title: '', content: ''});
    setModalVisible(true);
  }, []);

  const openViewNoteModal = useCallback((note: Note) => {
    setViewNote(note);
  }, []);

  const saveEditedNote = useCallback(() => {
    if (
      editNote &&
      editNote.title.trim() !== '' &&
      editNote.content.trim() !== ''
    ) {
      const updatedNotes = notes.map((note: Note) =>
        note.id === editNote.id ? {...note, ...editNote} : note,
      );
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
      setEditNote(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editNote, notes]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setViewNote(null);
    setEditNote(null);
  }, []);

  useEffect(() => {
    // Load notes from AsyncStorage when the component mounts
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notes,
    openViewNoteModal,
    openCreateNoteModal,
    modalVisible,
    viewNote,
    editNote,
    closeModal,
    setEditNote,
    setNewNote,
    newNote,
    saveEditedNote,
    addNote,
  };
};
