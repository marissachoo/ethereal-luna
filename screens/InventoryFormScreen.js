import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import firebase from '../utils/firebase'

export default class InventoryFormScreen extends Component {
  state = {
    loading: false,
    food: null,
    amount: null, 
    unit: null,
  };

  render() {
    return (
      <KeyboardAvoidingView 
        style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}}
        behavior="position" enabled   >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Food"
              onChangeText={food => this.setState({ food })}
              value={this.state.food}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Amount"
              onChangeText={amount => this.setState({ amount })}
              value={this.state.amount}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Unit"
              onChangeText={unit => this.setState({ unit })}
              value={this.state.unit}
            />
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          </View>
          <View style={styles.buttonsContainer} >
            <TouchableOpacity style={Styles.roundedButton} onPress={this.createInventory}>
              {
                this.state.loading ? 
                (<ActivityIndicator color="#fff"/>) : 
                (
                  <Text style={styles.buttonText}>
                    Add Inventory
                  </Text>
                )
              }
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  createInventory = async () => {
    try {
      this.setState({loading: true});
      await firebase.firestore().collection('inventory').add({
        food: this.state.food,
        amount: this.state.amount,
        unit: this.state.unit
      });
      console.log("Saved to firebase");
      this.props.navigation.navigate('Inventory')
    } catch (e) {
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        loading: false
      });
    }

    return 
  }
}



InventoryFormScreen.navigationOptions = {
  headerFood: 'Create a Inventory'
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: Colors.secondaryColor
  },
  image: {
    width: 280,
    height: 200,
    marginVertical: 30,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  button: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 50,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#141414',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  inputsContainer: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    fontSize: 15,
    height: 50,
    paddingHorizontal: 25,
    width: 300,
    borderRadius: 25,
    borderColor: '#141414',
    borderWidth: 1,
    marginBottom: 16
  },
  descInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 20,
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  }
});