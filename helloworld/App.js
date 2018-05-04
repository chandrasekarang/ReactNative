
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import ContactList from "./ContactList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {container} = styles;
    return (
      <View style={container}>
        <ContactList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "center"
  },
  label: {
    fontSize: 32,
    color: "purple"
  },
  result: {
    fontSize: 64,
    color: "red"
  }
});
