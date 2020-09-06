import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainView from './scripts/views/MainView';

export default class App extends React.Component{
  render(){
    return (
      <View style={{backgroundColor: "#E5DCDD", width: "100%", height: "100%"}}>
        <MainView />
      </View>
    );
  }
}


