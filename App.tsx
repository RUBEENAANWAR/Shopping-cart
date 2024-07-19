import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './redux/store';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Order from './screens/Order';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
       <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Product') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Order') {
              iconName = focused ? 'cube' : 'cube-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          activeTintColor: 'red',
          inactiveTintColor: 'blue',
        })}
      >
        <Tab.Screen name="Product" component={Product} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Order" component={Order} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;