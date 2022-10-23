import React from 'react';
import {useState, useEffect} from 'react';
import Voice from '@react-native-voice/voice';
import {StyleSheet, View, Text, TextInput} from 'react-native';

export const VoiceSearch = () => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
    console.log('hellos start', e);
  };

  const onSpeechEndHandler = e => {
    console.log('hellos end', e);
  };

  const onSpeechResultsHandler = e => {
    console.log('hellos results', e);
  };

  return (
    <View style={styles.textStyleInput}>
      <TextInput
        value={searchText}
        placeholder="Search..."
        onChangeText={value => setSearchText(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyleInput: {
    // justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    elevation: 2,
    shadowOpacity: 0.4,
  },
});
