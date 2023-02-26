import React, { useState } from 'react';
import GlobalStyle from '../utils/GlobalStyle';

import { 
  Button, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  } from 'react-native'


const Home = ({navigation}) => {

  const [name, SetName] = useState('');
  const [submitted, SetSubmitted] = useState(false);
  const onPressHandler = () => {
    SetSubmitted(!submitted);
  }

  return (
    // add test view for your own test
    <View style={styles.container}>
      <Button 
        title='Eirc MRT'
        onPress={() => navigation.navigate('MRT') }
      />
      <Button 
        title='Weng MRT'
        onPress={() => navigation.navigate('wengMRT') }
      />
      <Button 
        title='Melo MRT'
        onPress={() => navigation.navigate('MeloMRT') }
      />
      <Button 
        title='Gesture Test'
        onPress={() => navigation.navigate('GestureTest') }
      />
      
    </View>
  );
}


const Test = (props) => {
  return(
    <View>
      <Text style={[GlobalStyle.CustomFont]} > Welcome to MRT for Foodies You are reistered as {props.name}! </Text>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Home;