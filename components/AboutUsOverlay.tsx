import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { useTheme } from '../Hooks/ThemeProvider ';

interface AboutUsOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const AboutUsOverlay: React.FC<AboutUsOverlayProps> = ({ visible, onClose }) => {
  const { isDarkMode } = useTheme();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => alert('Unable to open link.'));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlayContainer}>
        <View style={[styles.overlayContent, isDarkMode ? styles.darkMode : styles.lightMode]}>
          <TouchableOpacity onPress={onClose}>
            <ImageBackground style={styles.closeBtn} source={require('../assets/close.png')} />
          </TouchableOpacity>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.section}>
              <Text style={[styles.header, isDarkMode ? styles.textDark : styles.textLight]}>About Us</Text>
              <Text style={[styles.text, isDarkMode ? styles.paraDark:styles.paraLight]}>
                Welcome to our app! Our mission is to help you manage your finances effectively and efficiently. 
                We strive to provide a user-friendly experience that meets your needs and helps you stay on top 
                of your expenses and budget.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.header, isDarkMode ? styles.textDark : styles.textLight]}>Our Team</Text>
              <Text style={[styles.text, isDarkMode ? styles.paraDark:styles.paraLight]}>
                Our team consists of dedicated professionals who are passionate about financial management and 
                technology. We are constantly working to improve our app and provide you with the best experience possible.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.header, isDarkMode ? styles.textDark : styles.textLight]}>Contact Us</Text>
              <TouchableOpacity onPress={() => openLink('mailto:support@example.com')}>
                <Text style={styles.link}>support@example.com</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink('https://twitter.com/yourapp')}>
                <Text style={styles.link}>Follow us on Twitter</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={[styles.header, isDarkMode ? styles.textDark : styles.textLight]}>Acknowledgements</Text>
              <Text style={[styles.text, isDarkMode ? styles.paraDark:styles.paraLight]}>
                We would like to thank the open-source community for their contributions and support. Special thanks 
                to the developers of the libraries and tools that made this app possible.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.header, isDarkMode ? styles.textDark : styles.textLight]}>Legal Information</Text>
              <TouchableOpacity onPress={() => openLink('https://example.com/privacy-policy')}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink('https://example.com/terms-of-service')}>
                <Text style={styles.link}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    width: '90%',
    height: '80%',
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
  },
  closeBtn: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -15,
    right: -15,
  },
  darkMode: {
    backgroundColor: '#161616',
  },
  lightMode: {
    backgroundColor: 'white',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#22D293',
    textDecorationLine: 'underline',
  },
  textDark:{
    color:'white'
  },
  textLight:{
    
  },
  paraDark:{
    color:'white',
    opacity:.6
  },
  paraLight:{
    
  }
});

export default AboutUsOverlay;
