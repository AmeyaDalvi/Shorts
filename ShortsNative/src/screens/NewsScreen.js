import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {NewsCardList} from '../news-cards/NewsCardList';

export const NewsScreen = props => {
  const {
    params: {title},
  } = useRoute();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      [],
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.headingTextWrapper}>
        <Text style={styles.headingText}>{title}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={navigation.goBack}>
        <Image
          source={require('../../assets/left-arrow.png')}
          style={styles.button}
        />
      </TouchableOpacity>
      <NewsCardList heading={title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'column',
    fontWeight: 'bold',
    color: '#000',
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  buttonWrapper: {
    top: 40,
    position: 'absolute',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 5,
    backgroundColor: 'rgb(230, 230, 230)',
    marginBottom: 5,
    borderRadius: 15,
  },
  headingTextWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 10,
    borderBottomColor: 'rgb(230, 230, 230)',
    borderBottomWidth: 0.5,
    width: '100%',
  },
});
