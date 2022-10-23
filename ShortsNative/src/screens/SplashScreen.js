import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';

export const SplashScreen = props => {
  const [homeLoaded, setHomeLoaded] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    console.log('inside splash');
    setTimeout(() => {
      setHomeLoaded(true);
    }, 2900);
  }, []);

  useEffect(() => {
    if (homeLoaded && animationLoaded) {
      props.navigation.replace('Home');
    }
  }, [homeLoaded, props.navigation, animationLoaded]);

  const onAnimationFinish = () => {
    setAnimationLoaded(true);
  };
  return (
    <View style={styles.splashContainer}>
      <Lottie
        source={require('../../assets/shorts-splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
