import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InventoryScreen from '../screens/InventoryScreen';
import LinksScreen from '../screens/LinksScreen';
import Colors from '../constants/Colors';
import InventoryFormScreen from '../screens/InventoryFormScreen';

const InventoryStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Inventory';

export default function InventoryStackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ 
      headerTitle: getHeaderTitle(route)
    });

  return (
    <InventoryStack.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: Colors.secondaryColor
        }}>
      <InventoryStack.Screen
        name="Inventory"
        component={InventoryScreen}
      />
      <InventoryStack.Screen
        name="InventoryForm"
        component={InventoryFormScreen}
      />
    </InventoryStack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Inventory':
      return 'Food Inventory';
    case 'Links':
      return 'Links to learn more';
  }
}
