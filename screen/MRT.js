import React, { useState } from 'react';
import GlobalStyle from '../utils/GlobalStyle';

import {  
  StyleSheet, 
  Text, 
  View,
  Image,
  } from 'react-native'


export default function  MRT({navigation}) {

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Map scene
      </Text>
      <Image style={styles.body} 
      source={require('../assets/MRT_map.png')} />


    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    fflex:200,
    justifyContent: 'center',
    alignItems:'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
});

