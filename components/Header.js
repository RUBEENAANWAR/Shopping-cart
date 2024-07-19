import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Header = ({
  showLogo = true,
}) => {
  return (
    <View style={styles.container}>
      {showLogo && (
        <Image source={require('../statics/logo.png')} style={styles.logo} />
      )}
        <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(14),
    backgroundColor: '#bbb',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#000'
  },
});

export default Header;
