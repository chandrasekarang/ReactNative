import React from "react";
import ContactListItem from "./ContactListItem";
import { View, ScrollView } from "react-native";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=20")
      .then(response => response.json())
      .then(data => {
        this.setState({ contacts: data.results });
      });
  }

  renderItems() {
    return this.state.contacts.map((c,i) => (      
      <ContactListItem
        name={`${c.name.title} ${c.name.first} ${c.name.last}`}
        profileImage={c.picture.thumbnail}
        index={i%2}
      />
    ));
  }

  render() {
    return <ScrollView>{this.renderItems()}</ScrollView>;
  }
}

export default ContactList;


