import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RequestsScreen from '../screens/RequestsScreen';
import RequestDetailScreen from '../screens/RequestDetailScreen';
import LinksScreen from '../screens/LinksScreen';
import Colors from '../constants/Colors';
import CompleteScreen from '../screens/CompleteScreen';

const RequestsStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Requests';

export default function RequestsStackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ 
      headerTitle: getHeaderTitle(route)
    });

  return (
    <RequestsStack.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: Colors.secondaryColor
        }}>
      <RequestsStack.Screen
        name="Requests"
        component={RequestsScreen}
      />
      <RequestsStack.Screen
        name="RequestDetail"
        component={RequestDetailScreen}
      />
      <RequestsStack.Screen
        name="Complete"
        component={CompleteScreen}
      />
    </RequestsStack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Requests':
      return 'Food Requests';
    case 'Links':
      return 'Links to learn more';
  }
}
