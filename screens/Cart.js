// CartScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
// import { clearCart, incrementQuantity, decrementQuantity } from '../redux/productSlice';
import CartItem from '../components/CartItemComponent';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  console.log('calculateTotal*****',calculateTotal())

  const handleCheckout = async () => {
    const order = {
      orderNumber: `ORDER-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItems,
      totalAmount: calculateTotal(),
    };

    try {
      const existingOrders = JSON.parse(await AsyncStorage.getItem('orders')) || [];
      const updatedOrders = [...existingOrders, order];
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));

      dispatch(clearCart());
      Alert.alert('Success', 'Order placed successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to place order');
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemDetails}>QTY: {item.quantity}</Text>
        <Text style={styles.itemDetails}>Price: ${item.price.toFixed(2)}</Text>
        <View style={{flexDirection:"row", justifyContent:'space-between'}}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))} style={styles.quantityButton}>
            <Icon name="remove" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))} style={styles.quantityButton}>
            <Icon name="add" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => dispatch(clearCart(item.id))}>
          <Icon2 name="trash" size={14} color="#fff" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length>0 ? (
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
      ):(
      <View style={{height:'100%',justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:moderateScale(20),color:'#000'}}>Your cart is empty</Text>
    </View>
  )}
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartList: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDetails: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDetails: {
    fontSize: 14,
    color: '#888',
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  checkoutButton: {
    padding: 15,
    backgroundColor: '#116e9c',
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
