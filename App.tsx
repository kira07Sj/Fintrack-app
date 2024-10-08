import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Suspense, useEffect, useState } from 'react';
import { SQLiteProvider } from 'expo-sqlite/next';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/Tabs'; // Import the Tabs component
import Header from './components/Header';
import { ThemeProvider } from './Hooks/ThemeProvider '; // Import ThemeProvider

const LoadDatabase = async () => {
  const dbName = "FinTrack.db";
  const dbAsset = require("./assets/FinTrack.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
    
  useEffect(() => {
    LoadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []); // Ensure this useEffect only runs once when the component mounts

 

  return (
    <ThemeProvider> 
      <NavigationContainer>
        <Suspense>
          <SQLiteProvider databaseName='FinTrack.db' useSuspense>
            <Header />
            <Tabs /> 
          </SQLiteProvider>
        </Suspense>
      </NavigationContainer>
    </ThemeProvider>
  );
}
