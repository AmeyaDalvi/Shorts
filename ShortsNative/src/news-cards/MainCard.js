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

export const MainCard = () => {
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
      <TouchableOpacity style={styles.shadow}>
        <Image
          style={styles.mainCard}
          source={{uri: item.url}}
          resizeMode="cover"
        />
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
          horizontal
          showsHorizontalScrollIndicator={false}
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
    maxHeight: 230,
  },
  shadow: {
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.4,
  },
  mainCard: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    paddingVertical: 100,
    marginBottom: 10,
    // backgroundColor: 'lightgrey',
    borderRadius: 20,
    width: 320,
  },
  image: {
    width: 100,
    height: 100,
  },
});
