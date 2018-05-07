import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BoxComponent from './BoxComponent';
import BlueBoxComponent from './BlueBoxComponent';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BoxComponent color="red" />
        <BoxComponent color="green" />
        <BlueBoxComponent color="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
