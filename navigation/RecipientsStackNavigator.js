import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RecipientsScreen from '../screens/RecipientsScreen';
import RecipientDetailScreen from '../screens/RecipientDetailScreen';
import LinksScreen from '../screens/LinksScreen';
import Colors from '../constants/Colors';

const RecipientsStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Recipients';

export default function RecipientsStackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ 
      headerTitle: getHeaderTitle(route)
    });

  return (
    <RecipientsStack.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: Colors.secondaryColor
        }}>
      <RecipientsStack.Screen
        name="Recipients"
        component={RecipientsScreen}
      />
      <RecipientsStack.Screen
        name="RecipientDetail"
        component={RecipientDetailScreen}
      />
    </RecipientsStack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Recipients':
      return 'Food Recipients';
    case 'Links':
      return 'Links to learn more';
  }
}
