import React from 'react';
import { Modal, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useTheme } from '../Hooks/ThemeProvider ';

interface ResetOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const ResetOverlay: React.FC<ResetOverlayProps> = ({ visible, onClose }) => {
  const db = useSQLiteContext();
  const { isDarkMode } = useTheme();

  async function onReset() {
    try {
      await db.runAsync('DELETE FROM expense'); // Delete all rows from the expense table
      await db.runAsync('DELETE FROM balance');
      await db.runAsync('DELETE FROM plans');
      onClose(); // Close the modal after deletion
    } catch (error) {
      console.error('Failed to reset the table:', error);
    }
  }

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlayContainer} onPress={onClose}>
        <View style={[styles.overlayContent, isDarkMode ? styles.Darkmode : styles.lightMode]}>
          <TouchableOpacity onPress={onClose}>
            <ImageBackground style={styles.closeBtn} source={require('../assets/close.png')} />
          </TouchableOpacity>
          <View style={styles.warning}>
            <Text style={styles.Text}>Warning</Text>
            <Text style={styles.warn}>
              If you reset, all your progress will be lost forever. Are you sure you want to continue?
            </Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={onReset}>
            <Text style={styles.btnText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    width: 250,
    height: 220,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderColor: '#ED3125',
    borderWidth: 0.7,
  },
  btn: {
    width: 100,
    height: 35,
    backgroundColor: '#ED3125',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
  },
  closeBtn: {
    width: 24,
    height: 24,
    marginLeft: 200,
    marginBottom: 5,
    marginTop: -10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  Text: {
    color: '#ED3125',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  warning: {
    alignItems: 'center',
    marginTop: -15,
  },
  warn: {
    color: '#ED3125',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  lightMode: {
    backgroundColor: 'white',
  },
  Darkmode: {
    backgroundColor: '#1F1F1F',
  },
});

export default ResetOverlay;
