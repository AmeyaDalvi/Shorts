import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainCard} from './MainCard';

export const SubCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getListNews();

    return () => {};
  }, []);

  const getListNews = () => {
    const apiURL =
      'https://jsonplaceholder.typicode.com/photos?_limit=20&_page=1';
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setNewsData(resJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity>
        <View style={styles.subCard}>
          <Image
            style={styles.image}
            source={{uri: item.url}}
            resizeMode="cover"
          />
          <View style={styles.newsTextContainer}>
            <Text style={styles.newsHeading}>{item.title}</Text>
            <View style={styles.subHeading}>
              <Text>Author: {item.albumId}</Text>
              <Text>Date: {item.id}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={item => `key-${item.id}`}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={MainCard}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
    // maxHeight: 230,
  },
  subCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    // paddingVertical: 20,
    // marginBottom: 10,
    // backgroundColor: 'lightgrey',
    borderRadius: 15,
    width: 350,
    shadowOffset: {width: 1, height: 3},
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  image: {
    alignItems: 'flex-start',
    width: 120,
    height: 100,
    // borderWidth: 1,
    borderRadius: 10,
  },
  newsTextContainer: {
    marginLeft: 10,
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
    width: 219,
    height: 100,
    justifyContent: 'space-between',
  },
  newsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
