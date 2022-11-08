import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const NewsPage = () => {
  const navigation = useNavigation();
  const {
    params: {title, media, summary, author, date},
  } = useRoute();

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
      <StatusBar hidden={true} />
      <ScrollView>
        <View>
          <Image style={styles.newsImage} source={{uri: media}} />
        </View>

        <View style={styles.headingTextWrapper}>
          <Text style={styles.headingText}>{title}</Text>
        </View>
        <View style={styles.summaryTextWrapper}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={navigation.goBack}>
        <Image
          source={require('../../assets/left-arrow.png')}
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'flex-start',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    width: '100%',
  },
  newsImage: {
    width: 400,
    height: 300,
  },
  summaryText: {
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 23,
  },
  summaryTextWrapper: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
});
