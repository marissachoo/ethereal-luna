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

export default class RecipientFormScreen extends Component {
  state = {
    loading: false,
    name: null,
    phone: null, 
    address: null,
    familyMembers: null,
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
              placeholder="Name"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Phone"
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Address"
              onChangeText={address => this.setState({ address })}
              value={this.state.address}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Total Family Members"
              onChangeText={familyMembers => this.setState({ familyMembers })}
              value={this.state.familyMembers}
            />
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          </View>
          <View style={styles.buttonsContainer} >
            <TouchableOpacity style={Styles.roundedButton} onPress={this.createRecipient}>
              {
                this.state.loading ? 
                (<ActivityIndicator color="#fff"/>) : 
                (
                  <Text style={styles.buttonText}>
                    Add Recipient
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

  createRecipient = async () => {
    try {
      this.setState({loading: true});
      await firebase.firestore().collection('inventory').add({
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        familyMembers: this.state.familyMembers,
        status: "ongoing",
        volunteer: {
          id: "34509",
          name: "David Lee"
        }
      });
      console.log("Saved to firebase");
      this.props.navigation.navigate('Recipient')
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



RecipientFormScreen.navigationOptions = {
  headerFood: 'Create a Recipient'
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