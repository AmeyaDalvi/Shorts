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

export const NewsCardList = ({heading}) => {
  const [newsData, setNewsData] = useState([]);
  const navigation = useNavigation();

  const check = ['tech', 'sport', 'business', 'finance'];
  var topic = '';
  if (check.includes(heading.toLowerCase())) {
    topic = heading.toLowerCase();
  } else {
    topic = 'news';
  }

  useEffect(() => {
    getTitledNews();

    return () => {
      setNewsData([]);
      console.log('inside cleanup');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTitledNews = () => {
    var options = {
      method: 'GET',
      url: `${API_URL}search`,
      params: {
        q: `${heading}`,
        lang: 'en',
        page_size: '20',
        page: '1',
        countries: 'US',
        topic: `${topic}`,
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

  const renderItem = ({
    item: {title, media, author, published_date, summary},
    index,
  }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Read', {
            title,
            media,
            author,
            published_date,
            summary,
          })
        }>
        <View style={styles.subCard}>
          <Image
            style={styles.image}
            source={{uri: media}}
            resizeMode="cover"
          />
          <View style={styles.newsTextContainer}>
            <Text style={styles.newsHeading} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.subHeading}>
              <Text numberOfLines={1}>{author}</Text>
              <Text>{new Date(published_date).toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {newsData.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={item => `${item.link}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  subCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  image: {
    alignItems: 'flex-start',
    width: 120,
    height: 100,
    borderRadius: 7,
  },
  newsTextContainer: {
    marginLeft: 10,
    width: 219,
    height: 100,
    justifyContent: 'space-between',
  },
  newsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subNewsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
