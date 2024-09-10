import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ImageBackground
} from 'react-native';

interface CustomDropdownProps {
  label: string;
  data: { label: string; value: any }[];
  onSelect: (value: any) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  data,
  onSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = (item: { label: string; value: any }) => {
    setSelectedValue(item.label);
    setIsVisible(false);
    onSelect(item.value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(!isVisible)}
      >
        <View style={styles.textArea}>
        <Text style={styles.dropdownButtonText}>
          {selectedValue ? selectedValue : label}
        </Text>
            <ImageBackground

                source={require("../../assets/arrow_drop_down.png")}
                style={styles.dropdownIcon}
            />
        </View>
      </TouchableOpacity>

      {isVisible && (
        <Modal transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setIsVisible(false)}
          >
            <View style={styles.dropdown}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%"
  },
  dropdownButton: {
    width: '100%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    display:'flex',
    justifyContent:"center"
  },
  dropdownButtonText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    paddingVertical:15
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth:.7,
    
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  textArea:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  dropdownIcon:
  {
    width:24,
    height:24
  }
});

export default CustomDropdown;
