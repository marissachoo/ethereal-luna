import * as React from 'react';
import { Imamount, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

export default class InventoryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList contentContainerStyle={{}} style={{width: Layout.window.width}}
          data={[
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
          ]}
          renderItem={({item}) => (
            <TouchableOpacity>
            <View style={styles.itemContainer}>
              <Text style={{fontWeight: '', fontSize: 22}}>{item.food} </Text>
              <Text style={{fontWeight: '', fontSize: 22}}>{item.amount} {item.unit}</Text>
            </View>
            </TouchableOpacity>
          )}
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