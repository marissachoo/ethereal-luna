// LoginScreen.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
// import * as Google from 'expo-google-app-auth';
import firebase from '../utils/firebase';

import Layout from '../constants/Layout';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';


export default class CompleteScreen extends React.Component {

  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };

  state = { loading: false }
  

  handleLogin = () => {
    // TODO: Firebase stuff...
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(this.state.email, this.state.password)
    //   .then(() => this.props.navigation.navigate('Main'))
    //   .catch(error => this.setState({ errorMessage: error.message }))
    // console.log('handleLogin')
    this.props.navigation.navigate('Root')
  }

  

  render() {
    
    return (
      <View style={{flex:1}}>
        <View style={styles.logoContainer}>
          <Ionicons name="md-checkmark-circle" size={150} color={Colors.secondaryColor} />
        </View>
        <View style={styles.container}>
          <View style={styles.inputsContainer}>
            <Text style={{fontSize: 40, padding: 10}}>Good Job!</Text>
            <Text style={{fontSize: 18, padding: 10, textAlign: 'center'}}>We've send an SMS to the recepient to confirm the delivery</Text>
            <Text style={{fontSize: 20, padding: 10}}>Thank you for the help</Text>

          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Requests')} style={Styles.roundedButton}>
              <Text style={Styles.buttonText}>You're Welcome</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor
  },
  logoContainer:{
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.window.width,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  logoSub: {
    color: '#999999',
    marginBottom: 40,
  },
  buttonsContainer: {
    width: Layout.window.width,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLogo: {
    left: -15
  },
  inputsContainer: {
    borderColor: Colors.primaryColor,
    width: Layout.window.width,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderColor: Colors.primaryColor,
    height: 40,
    fontSize: 15,
    height: 50,
    paddingHorizontal: 25,
    width: 300,
    borderRadius: 50,
    borderColor: '#141414',
    borderWidth: 1,
    marginBottom: 16
  }
})