import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useTheme } from '../Hooks/ThemeProvider ';
import { HelpLists } from '../constants'; // Adjust the path as needed

interface MenuOverlayProps {
  visible: boolean;
  onCloseHelp: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ visible, onCloseHelp }) => {
  const { isDarkMode } = useTheme();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const handleListPress = (id: string) => {
    setSelectedSectionId(selectedSectionId === id ? null : id);
  };

  const renderHelpContent = () => {
    const selectedSection = HelpLists.find(section => section.id === selectedSectionId);

    if (!selectedSection) return null;

    return selectedSection.content.map(item => (
      <View key={item.id} style={styles.instContainer}>
        <Text style={styles.instPar}>{item.id}</Text>
        <Text style={styles.instPar}>{item.para}</Text>
      </View>
    ));
  };

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onCloseHelp}>
      <View style={styles.overlayContainer}>
        <View style={[styles.overlayContent, isDarkMode ? styles.Darkmode : styles.lightMode]}>
          <TouchableOpacity onPress={onCloseHelp}>
            <ImageBackground style={styles.closeBtn} source={require('../assets/back.png')} />
          </TouchableOpacity>

          <Text style={styles.Text}>Help</Text>

          <ScrollView style={styles.cont}>
            {HelpLists.map(section => (
              <TouchableOpacity
                key={section.id}
                onPress={() => handleListPress(section.id)}
                style={[styles.HelpList, isDarkMode ? styles.helpListDark : styles.helpListLight]}
              >
                <View style={styles.ListHeader}>
                  <ImageBackground
                    source={require('../assets/dot.png')}
                    style={styles.dot}
                  >
                    <Text style={styles.dotText}>{section.id}</Text>
                  </ImageBackground>
                  <Text style={styles.headerText}>{section.title}</Text>
                </View>
                {selectedSectionId === section.id && (
                  <View style={styles.inst}>
                    <Text style={styles.instText}>{section.header}</Text>
                    {renderHelpContent()}
                    <TouchableOpacity onPress={() => setSelectedSectionId(null)} style={styles.arrowBtn}>
                      <ImageBackground
                        source={require('../assets/arrow_upward.png')}
                        style={styles.arrow}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
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
  },
  cont: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  overlayContent: {
    width: '90%',
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    position: 'absolute',
    right: 1,
    marginTop: 0,
  },
  Text: {
    color: '#22D293',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeBtn: {
    width: 45,
    height: 30,
    position: 'absolute',
    right: 90,
    marginBottom: 3,
    marginTop: 0,
  },
  HelpList: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#22D293',
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 5,
    
  },
  ListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    color: '#22D293',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
  },
  inst: {
    marginLeft: 10,
    flexDirection: 'column',
    padding: 5,
  },
  instContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    width: "90%",
  },
  instText: {
    color: '#22D293',
  },
  instPar: {
    color: "#22D293",
    opacity: 0.7,
  },
  DisplayList: {
    display: 'flex',
  },
  DisplayNone: {
    display: 'none',
  },
  arrow: {
    width: 28,
    height: 28,
  },
  arrowBtn: {
    position: 'absolute',
    bottom: 0,
    right: 3,
  },
  helpListDark: {
    backgroundColor: '#1F1F1F',
  },
  helpListLight: {
    backgroundColor: '#F3F3F3',
  },
  lightMode: {
    backgroundColor: 'white',
  },
  Darkmode: {
    backgroundColor: '#161616',
  },
});

export default MenuOverlay;
