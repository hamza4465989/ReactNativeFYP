import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList
} from "react-native";
import firebase  from '../config';
import ProgressCircle from 'react-native-progress-circle'

const db= firebase.firestore();
let diseaseData =db.collection('datasetDisease')// storing connection of datasetDisease into diseaseData var
let dis='HIV';
let symptoms=[];
diseaseData.doc('HIV').get().then(querySnapshot => {
        symptoms.push(querySnapshot.data());
});
    
    // this.setState({symptoms:symptoms})
    // this.setState({disease:dis})
    console.log(dis)
export default class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.visible,// Modal visible variable received from page 3
      disease:dis,
      symptoms:symptoms,
      sessionSymptom:this.props.Symptom,
    }
  }
 

  setModalVisible(visible){// changing visibility method 
    this.setState({ modalVisible: visible });
  }
  componentDidMount(){
    
  }
  render() {
    const { modalVisible } = this.state; // assigning states to name for not writing this.state.name again and again
    const {disease}=this.state;
    const{symptoms}=this.state;
    return (
      <View style={styles.centeredView}>
        <Modal //Modal with disease Name and flat list of specific disease symptoms
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{disease}</Text>
              <FlatList
                data={symptoms}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                numColumns={2} // 2 symptoms per row
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <TouchableHighlight style={styles.back} onPress={()=>this.setModalVisible(true)}>// the touchable highlight shown 
              <View style={styles.DisEntry}>
                  <Text style={styles.text}>{disease}</Text>
                  <ProgressCircle
                      percent={30}
                      radius={50}
                      borderWidth={8}
                      color="#3399FF"
                      shadowColor="#999"
                      bgColor="#fff"
                  >
                  <Text style={{ fontSize: 18 }}>{'70%'}</Text>
                </ProgressCircle>
              </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  DisEntry:{
    flexDirection:"row",
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    width: 350,
  },
  item:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight:5,
    padding:2
  },
  text:{
    flex:1,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

