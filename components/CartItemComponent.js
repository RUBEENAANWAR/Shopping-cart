import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
// import {removeItemFromCart, updateQuantity} from '../redux/store/cartSlice'
import { clearCart,addToCart } from '../redux/cartSlice';

const CartItem = ({ item, onRemove, onReorder }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(addToCart({ id: item.id, quantity: quantity + 1 }));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(addToCart({ id: item.id, quantity: quantity - 1 }));
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.imageContainer}>
        <Image source={item?.image} style={styles.productImage} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
        <Text style={styles.price}>INR {item?.price}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
              >
              <Icon name="remove" size={16} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item?.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
              >
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
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 2,
  },
  productImage: {
    width: moderateScale(50),
    height: moderateScale(70),
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#6A6A6A',
    marginBottom: 10,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#F5F5F5'
  },
  quantityButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 15,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color:'#000'
  },
  deleteButton: {
    backgroundColor: '#E30613',
    padding: 10,
    borderRadius: 50,
  },
  imageContainer:{
    backgroundColor: '#F3F3F3',
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(30),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    marginRight: moderateScale(10),
  }
});

export default CartItem;
