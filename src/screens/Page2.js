import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,Button,
  ToastAndroid
} from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';
import firebase  from '../config';
const db= firebase.database();
let itemsRef = db.ref('/dataset');
let input = db.ref('/tags');
let addItem = item => {
  input.push({
    userSymptom: item
  });
};

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      tagsSelected:[],
      storedTags:[]
    };
  }
  componentDidMount(){
    let storedTags=[];
    itemsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        storedTags.push({'name':childSnapshot.val().Symptom});
        });
      });
    this.setState({ storedTags: storedTags})
  }

  handleSubmit = () => {
    addItem(this.state.tagsSelected);
    ToastAndroid.show('Symptoms saved successfully', ToastAndroid.SHORT)
  };

  handleDelete = index => {
      let tagsSelected = this.state.tagsSelected;
      tagsSelected.splice(index, 1);
      this.setState({ tagsSelected });
   }
   
  handleAddition = suggestion => {
      this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
   }
  
  render() {
    
    return (
      <View style={styles.container}>
          <View style={styles.autocompleteContainer}>
            <AutoTags
                suggestions={this.state.storedTags}
                tagsSelected={this.state.tagsSelected}
                handleAddition={this.handleAddition}
                handleDelete={this.handleDelete}
                placeholder="Add a Symptom.." />
          </View>
          <TouchableHighlight
            style={styles.button}
            underlayColor="blue"
            onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
          <Button
                        title="Go to Page3"
                        onPress={() => this.props.navigation.navigate('Page3')}
                    /> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      marginTop: 8,
      borderRadius: 5,
      padding: 3,
    },
  button:{
      justifyContent:'center',

  },
    autocompleteContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom:10
      }
});