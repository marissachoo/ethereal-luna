import * as React from 'react';
import { Imamount, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../utils/firebase';

function Item({item, food, amount, unit, onPress, onDelete}) {
  return (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Text style={{fontSize: 22}}>{food} </Text>
        <Text style={{fontSize: 22}}>{amount} {unit}</Text>
        <Ionicons onPress={onDelete} name="md-trash" size={32} color="#141414" style={{marginTop: 5, marginHorizontal: 10}} />
      </View>
    </TouchableOpacity>
  );
}

export default class InventoryScreen extends React.Component {
  state = {
    inventory: [],
    isLoading: true,
  }


  itemHandler = (item, image) => () => {
    console.log("handler", item);
    this.props.navigation.navigate('item', { itemURL: item, imageURL: image })
  }

  deleteItem = (id) => () => {
    firebase.firestore().collection('inventory').doc(id).delete();
  }
  
  fetchInventory = () => {
    this.unsubscribe = firebase.firestore().collection('inventory')
    //.where("user", "==", this.state.currentUser.uid)
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
              this.setState({inventory: [item, ...this.state.inventory], isLoading: false});
          }
          if (change.type === "modified") {
              //console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
              //console.log("Removed city: ", change.doc.data());
              let id = change.doc.id;
              this.setState({inventory: this.state.inventory.filter(item => item.id !== id)})

          }
      });
    })
  }

  extractItemKey = (item) => `${item.key}`;

  componentDidMount() {
    this.fetchInventory()
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
          data={this.state.inventory}
          renderItem={({ item }) => <Item {...item} onPress={this.itemHandler(item.game, item.image)} onDelete={this.deleteItem(item.id)} />}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1,
    height: 80,
    paddingHorizontal: 10
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