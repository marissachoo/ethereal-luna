import * as React from 'react';
import { Imamount, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../utils/firebase';

function Item({id, name, phone, address, familyMembers, status, volunteer, onPress, onDelete}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <Text style={{fontSize: 26}}>{name} </Text>
        <Text style={{fontSize: 18}}>{phone}</Text>
        <View style={{marginVertical: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{fontSize: 18}}>Bread</Text>
            <Text style={{fontSize: 18}}> 2 pack</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{fontSize: 18}}>Rice</Text>
            <Text style={{fontSize: 18}}> 7 kg</Text>
          </View>
        </View>
        <Text style={{fontSize: 18}}>Status: {status.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class RequestsScreen extends React.Component {
  state = {
    recipients: [],
    isLoading: true,
  }


  itemHandler = (item) => () => {
    console.log("handler", item);
    this.props.navigation.push('RequestDetail', item)
  }

  deleteItem = (id) => () => {
    firebase.firestore().collection('recipients').doc(id).delete();
  }
  
  fetchRequests = () => {
    this.unsubscribe = firebase.firestore().collection('recipients')
    .where("volunteer.id", "==", "34509")
    //.orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      if(snapshot.empty) {
        this.setState({isLoading: false})
      }
      snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
              console.log('exist')
              let item = change.doc.data();
              item['key'] = change.doc.id
              this.setState({recipients: [item, ...this.state.recipients], isLoading: false});
          }
          if (change.type === "modified") {
              //console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
              //console.log("Removed city: ", change.doc.data());
              let id = change.doc.id;
              this.setState({recipients: this.state.recipients.filter(item => item.id !== id)})

          }
      });
    })
  }

  extractItemKey = (item) => `${item.key}`;

  componentDidMount() {
    this.fetchRequests()
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.state.isLoading? (
      <View style={Styles.center}>
        <ActivityIndicator size={100} color={Colors.primaryColor} />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList 
          contentContainerStyle={{}}
          style={{width: Layout.window.width}}
          keyExtractor={this.extractItemKey}
          data={this.state.recipients}
          renderItem={({ item }) => <Item {...item} onPress={this.itemHandler(item)} onDelete={this.deleteItem(item.id)} />}
        />
        <TouchableOpacity onPress={() => {}} style={[Styles.fab]}>
          <Ionicons name="md-add" size={20} color={Colors.secondaryColor}></Ionicons>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryColor
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
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


const MOCK_DATA = [
  {
    key: "0",
    food: "Rice",
    unit:"Kg",
    amount: 12,
  },
  {
    key: "1",
    food: "Bread",
    unit:"Pack",
    amount: 30,
  },
  {
    key: "3",
    food: "Flour",
    unit:"Kg",
    amount: 29,
  },
  {
    key: "4",
    food: "Biscuit",
    unit:"Pack",
    amount: 18,
  },
  {
    key: "5",
    food: "Biscuit",
    unit:"Pack",
    amount: 18,
  },
  {
    key: "6",
    food: "Biscuist",
    unit:"Pack",
    amount: 18,
  },
  {
    key: "7",
    food: "Biscuit",
    unit:"Pack",
    amount: 18,
  },
  {
    key: "8",
    food: "Biscuit",
    unit:"Pack",
    amount: 18,
  },
  {
    key: "9",
    food: "Biscuist",
    unit:"Pack",
    amount: 18,
  }
];