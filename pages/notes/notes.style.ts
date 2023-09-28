import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 8,
    padding: 16,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalTextInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  modalTextarea: {
    minHeight: 100,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  modalButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
