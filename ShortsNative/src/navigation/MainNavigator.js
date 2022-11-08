import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../screens/SplashScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {NewsScreen} from '../screens/NewsScreen';
import {NewsPage} from '../pages/NewsPage';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      {console.log('before splash')}
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{header: () => null}}
        />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Read" component={NewsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
