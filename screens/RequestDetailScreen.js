import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { Ionicons } from '@expo/vector-icons';

import firebase from '../utils/firebase'

export default class RequestDetailScreen extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    familyMembers: 0,
    status: "",
    volunteer: {}
  };

  deleteItem = (id) => () => {
    firebase.firestore().collection('recipients').doc(id).delete();
  }

  render() {
    console.log("Passing params");
    console.log(this.props);
    let {
      key, name, phone, address, familyMembers, status, volunteer
    } = this.props.route.params;

    

    return (
      <ScrollView>
        <View style={styles.itemContainer}>
          <Text style={{fontSize: 26}}>{name} </Text>
          <Text style={{fontSize: 18}}>{phone}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginRight: 15}}>
            <Text style={{fontSize: 18}}>Bread</Text>
            <Text style={{fontSize: 18}}> 2 pack</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginRight: 15}}>
            <Text style={{fontSize: 18}}>Rice</Text>
            <Text style={{fontSize: 18}}> 7 kg</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={{fontSize: 22}}>Address </Text>
          <Text style={{fontSize: 20}}>{address}</Text>
        </View>
        <View style={[styles.itemContainer, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={{fontSize: 22}}>Family Members: </Text>
          <Text style={{fontSize: 20}}>{familyMembers} people</Text>
        </View>
        <View style={[Styles.center, {marginTop: 60}]}>
          <TouchableOpacity onPress={() => this.props.navigation.push("Complete", {key})} style={Styles.roundedButton}>
            <Text style={Styles.buttonText}>Complete Delivery</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    );
  }

  componentDidMount() {
    //const { currentUser } = firebase.auth()
    //this.setState({ currentUser })
  }

}


RequestDetailScreen.navigationOptions = {
  headerTitle: 'Recipient Detail'
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 30,
    elevation: 8
  }
});