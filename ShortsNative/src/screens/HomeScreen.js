import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Search} from '../voice_search/Search';
import {SubCard} from '../news-cards/SubCard';

export const HomeScreen = props => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.headingText}>Shorts</Text>
      <Search />
      <SubCard />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  headingText: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingRight: 290,
    paddingLeft: 20,
    paddingTop: 50,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  newsTopic: {
    paddingRight: 250,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
