import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import Header from '../components/Header';
import { moderateScale } from 'react-native-size-matters';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = useMemo(() => ['All', ...new Set(products.map(product => product.category))], [products]);

  const filteredProducts = useMemo(() => {
    return selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log('product*******', product)
  };

  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderCategory = ({ item: category }) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.selectedCategoryText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
     <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={{padding:moderateScale(8), width:'91%'}}>
      <FlatList
        data={categories}
        horizontal
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        style={styles.categoriesContainer}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: moderateScale(10),
  },
  categoryButton: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(12),
    backgroundColor: '#ccc',
    marginRight: 5,
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
    alignSelf:'center',
  },
  selectedCategoryButton: {
    backgroundColor: 'tomato',
  },
  categoryText: {
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    padding: 10,
    width:'49%',
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  productCategory: {
    fontSize: 14,
    color: '#999',
  },
  productPrice:{
    fontSize: 14,
    color: '#000',
    fontWeight:'800'
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#116e9c',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
