import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainCard} from './MainCard';
import {useNavigation} from '@react-navigation/native';
import {API_URL, API_TOKEN} from '../apis/API';
import axios from 'axios';

export const SubCard = () => {
  const navigation = useNavigation();

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getTechNews();
    getBusinessNews();
    getSportsNews();
    getFinanceNews();

    return () => {
      setNewsData([]);
      console.log('inside cleanup');
    };
  }, []);

  const getTechNews = () => {
    var options = {
      method: 'GET',
      url: `${API_URL}search`,
      params: {
        q: 'tech',
        lang: 'en',
        page_size: '2',
        page: '1',
        topic: 'tech',
      },
      headers: {
        'x-api-key': `${API_TOKEN}`,
      },
    };

    axios
      .request(options)
      .then(response => {
        setNewsData(current => [
          ...current,
          {title: 'Tech', data: response.data.articles},
        ]);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const getBusinessNews = () => {
    var options = {
      method: 'GET',
      url: `${API_URL}search`,
      params: {
        q: 'business',
        lang: 'en',
        page_size: '2',
        page: '1',
        topic: 'business',
      },
      headers: {
        'x-api-key': `${API_TOKEN}`,
      },
    };

    axios
      .request(options)
      .then(response => {
        setNewsData(current => [
          ...current,
          {title: 'Business', data: response.data.articles},
        ]);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const getSportsNews = () => {
    var options = {
      method: 'GET',
      url: `${API_URL}search`,
      params: {
        q: 'sport',
        lang: 'en',
        page_size: '2',
        page: '1',
        topic: 'sport',
      },
      headers: {
        'x-api-key': `${API_TOKEN}`,
      },
    };

    axios
      .request(options)
      .then(response => {
        setNewsData(current => [
          ...current,
          {title: 'Sport', data: response.data.articles},
        ]);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const getFinanceNews = () => {
    var options = {
      method: 'GET',
      url: `${API_URL}search`,
      params: {
        q: 'finance',
        lang: 'en',
        page_size: '2',
        page: '1',
        topic: 'finance',
        countries: 'US',
      },
      headers: {
        'x-api-key': `${API_TOKEN}`,
      },
    };

    axios
      .request(options)
      .then(response => {
        setNewsData(current => [
          ...current,
          {title: 'Finance', data: response.data.articles},
        ]);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const renderItem = ({item, index}) => {
    var title = item.title;
    var media = item.media;
    var date = item.published_date;
    var author = item.author;
    var summary = item.summary;
    media === ''
      ? (media =
          'https://www.statecollege.com/wp-content/uploads/2020/12/news-placeholder.jpg')
      : media;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Read', {title, media, summary, author, date})
        }>
        <View style={styles.subCard}>
          <Image
            style={styles.image}
            source={{uri: item.media}}
            resizeMode="cover"
          />
          <View style={styles.newsTextContainer}>
            <Text style={styles.newsHeading} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.subHeading}>
              <Text>{author}</Text>
              <Text>{new Date(date).toLocaleDateString()}</Text>
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
        <>
          <SectionList
            sections={newsData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item + index}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={MainCard}
            renderSectionHeader={({section: {title}}) => (
              <View style={styles.subNewsBorder}>
                <Text style={styles.subNewsHeading}>{title}</Text>
                <TouchableOpacity
                  style={styles.buttonWrapper}
                  onPress={() => navigation.navigate('News', {title})}>
                  <Image
                    source={require('../../assets/right-arrow.png')}
                    style={styles.button}
                  />
                </TouchableOpacity>
              </View>
            )}
            stickySectionHeadersEnabled={false}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    borderRadius: 10,
  },
  newsTextContainer: {
    marginLeft: 10,
    flex: 1,
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
  subNewsBorder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: 'rgb(240, 240, 240)',
    borderTopWidth: 8,
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    height: 15,
    width: 15,
    alignSelf: 'center',
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 5,
    backgroundColor: 'rgb(230, 230, 230)',
    marginBottom: 5,
    borderRadius: 12,
  },
});
