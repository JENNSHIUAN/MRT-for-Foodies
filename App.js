import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './screen/home';
import MRT from './screen/MRT';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator(); 


function App() {
  
  let [fontsLoaded] = useFonts({
    'ImprimaRegular': require('./assets/fonts/Imprima-Regular.ttf'),
    'IMFellGreatPrimerItalic': require('./assets/fonts/IMFellGreatPrimer-Italic.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
     <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen
            name="MRT"
            component={MRT}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


export default App;