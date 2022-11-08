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
import {useNavigation} from '@react-navigation/native';
import {API_URL, API_TOKEN} from '../api/API';
import axios from 'axios';

export const MainCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getListNews();

    return () => {};
  }, []);

  const getListNews = () => {
    var options = {
      method: 'GET',
      url: `${API_URL}latest_headlines`,
      params: {
        lang: 'en',
        page_size: '20',
        page: '1',
        countries: 'US',
      },
      headers: {
        'x-api-key': `${API_TOKEN}`,
      },
    };

    axios
      .request(options)
      .then(response => {
        setNewsData(response.data.articles);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const renderItem = ({item, index}) => {
    var title = item.title;
    let media = item.media;
    var author = item.author;
    var summary = item.summary;
    var date = item.published_date;
    media === ''
      ? (media =
          'https://www.statecollege.com/wp-content/uploads/2020/12/news-placeholder.jpg')
      : media;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Read', {title, media, summary, author, date})
        }>
        <View style={styles.mainCard}>
          <Image
            style={styles.image}
            source={{uri: media}}
            resizeMode="cover"
          />
        </View>

        <View style={styles.newsHeadlineTextWrapper}>
          <Text style={styles.newsHeadlineText} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.subNewsHeading}>Latest News</Text>
          <FlatList
            data={newsData}
            renderItem={renderItem}
            keyExtractor={item => `${item.link}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 230,
    marginBottom: 40,
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
    paddingVertical: 100,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 320,
  },
  image: {
    position: 'absolute',
    borderRadius: 20,
    height: 200,
    opacity: 0.6,
    Radius: 20,
    width: 320,
  },
  subNewsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  newsHeadlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowRadius: 3,
    textShadowColor: 'black',
    textShadowOffset: {width: 1.5, height: 1.5},
  },
  newsHeadlineTextWrapper: {
    position: 'absolute',
    top: 150,
    left: 0,
    paddingHorizontal: 40,
  },
});
