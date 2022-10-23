import React from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {VoiceSearch} from '../voice_search/VoiceSearch';
import {MainCard} from '../news-cards/MainCard';
import {SubCard} from '../news-cards/SubCard';

export const HomeScreen = () => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.headingText}>Shorts</Text>
      <VoiceSearch />
      <SubCard />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'white',
  },
  headingText: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingRight: 290,
    paddingLeft: 20,
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 24,
    // color: '#fff',
    fontWeight: 'bold',
    // backgroundColor: '#000',
  },
});
