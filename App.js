import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Nav from './components/Nav';
import { useNetInfo } from "@react-native-community/netinfo";
import { Text } from 'react-native';

export default function App() {
  const netInfo = useNetInfo();
  return (
   <>
      <StatusBar style='auto'/>
      <Nav />
      <Text style={{fontSize: 30, height : netInfo.isConnected ? 0 : 50, textAlign : "center", backgroundColor: 'red' }}>
        {netInfo.isConnected ? "" : "No Internet"}
      </Text>
   </>
  );
}


