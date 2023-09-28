// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
// } from 'react-native';
// import styles from './notes.style';
// import {useNotes} from './notes.hook';

// const Notes: React.FC = () => {
//   const {
//     notes,
//     openViewNoteModal,
//     openCreateNoteModal,
//     modalVisible,
//     viewNote,
//     editNote,
//     closeModal,
//     setEditNote,
//     setNewNote,
//     newNote,
//     saveEditedNote,
//     addNote,
//   } = useNotes();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Notes</Text>
//       <ScrollView style={styles.notesContainer}>
//         {notes.map(note => (
//           <TouchableOpacity
//             key={note.id}
//             onPress={() => openViewNoteModal(note)}
//             style={styles.noteCard}>
//             <Text style={styles.noteTitle}>{note.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.addButton} onPress={openCreateNoteModal}>
//         <Text style={styles.addButtonLabel}>Create Note</Text>
//       </TouchableOpacity>

//       {/* Create/Edit/View Note Modal */}
//       <Modal
//         visible={modalVisible || viewNote !== null || editNote !== null}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={closeModal}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalHeader}>
//               {viewNote
//                 ? 'View Note'
//                 : editNote
//                 ? 'Edit Note'
//                 : 'Create New Note'}
//             </Text>
//             <TextInput
//               placeholder="Title"
//               value={editNote?.title || newNote?.title || ''}
//               onChangeText={text =>
//                 editNote
//                   ? setEditNote({...editNote, title: text})
//                   : newNote
//                   ? setNewNote({...newNote, title: text})
//                   : null
//               }
//               style={styles.modalTextInput}
//               editable={editNote !== null || newNote !== null}
//             />
//             <TextInput
//               placeholder="Content"
//               value={editNote?.content || newNote?.content || ''}
//               onChangeText={text =>
//                 editNote
//                   ? setEditNote({...editNote, content: text})
//                   : newNote
//                   ? setNewNote({...newNote, content: text})
//                   : null
//               }
//               multiline={true}
//               style={[styles.modalTextInput, styles.modalTextarea]}
//               editable={editNote !== null || newNote !== null}
//             />
//             {(editNote !== null || newNote !== null) && (
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={editNote !== null ? saveEditedNote : addNote}>
//                 <Text style={styles.modalButtonLabel}>
//                   {editNote !== null ? 'Save' : 'Create'}
//                 </Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
//               <Text style={styles.modalButtonLabel}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Notes;

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {encrypt, decrypt} from '../../helpers/encryption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '@env';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Note {
  id: string;
  text: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');

  const loadNotes = useCallback(async () => {
    try {
      const savedNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        console.log(JSON.parse(savedNotes));
        const decryptedNotes = JSON.parse(savedNotes).map((note: Note) => ({
          ...note,
          text: decrypt(note.text),
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
        text: encrypt(note.text),
      }));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(encryptedNotes));
    } catch (error) {
      console.error('Error saving notes to AsyncStorage:', error);
    }
  }, []);

  const addNote = () => {
    if (newNote.trim() !== '') {
      const newId = (notes.length + 1).toString();
      const encryptedNote = encrypt(newNote);
      const updatedNotes = [...notes, {id: newId, text: encryptedNote}];
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
      setNewNote('');
    }
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notes</Text>
      <ScrollView style={styles.notesContainer}>
        {notes.map(note => (
          <View key={note.id} style={styles.noteCard}>
            <Text style={styles.noteText}>{decrypt(note.text)}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        placeholder="Add a new note..."
        value={newNote}
        onChangeText={text => setNewNote(text)}
        multiline={true}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={addNote}>
        <Text style={styles.addButtonLabel}>Add Note</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2, // Add elevation for a card-like effect (Android)
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  noteText: {
    fontSize: 16,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    maxHeight: 150, // Adjust as needed
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Notes;
