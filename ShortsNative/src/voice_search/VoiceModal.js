import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';

import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Lottie from 'lottie-react-native';

import {useNavigation} from '@react-navigation/native';

export const VoiceModal = ({show, setShowModalHandler}) => {
  const [state, setState] = useState(show);
  const [pulseOn, setPulseOn] = useState(true);
  const [title, setVoiceText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    console.log('Hello');
    pulseOn ? startRecording() : stopRecording();
    title && navigation.navigate('News', {title});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulseOn]);

  const setModal = () => {
    setShowModalHandler(false);
  };

  const onSpeechStartHandler = e => {
    setPulseOn(true);
    console.log('start handler', e);
  };

  const onSpeechEndHandler = e => {
    console.log('stop handler', e);
  };

  const onSpeechResultsHandler = e => {
    let text = e.value[0];

    let arr = e.value[0].split(' ');

    if (arr[arr.length - 1] === 'search') {
      setPulseOn(prev => {
        !prev;
      });
    } else {
      setVoiceText(text);
    }
    console.log(text);

    console.log('results handler', e);
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('recording error', error);
    }
  };
  const stopRecording = async () => {
    try {
      setModal();
      await Voice.stop();
    } catch (error) {
      console.log('recording error', error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Modal visible={state} animationType={'slide'} transparent={true}>
        <View style={styles.modal}>
          <Text style={styles.searchText}>{title}</Text>
          <View style={styles.pulse}>
            {pulseOn && (
              <Lottie
                source={require('../../assets/pulse2.json')}
                autoPlay
                loop={true}
              />
            )}
            <TouchableOpacity
              style={styles.microphone}
              onPress={() => {
                setPulseOn(prev => {
                  !prev;
                });
              }}>
              <View>
                <Image
                  source={require('../../assets/microphone.png')}
                  style={styles.microImg}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.helpText}>
              Click on the mic or say "Search" after your keyword
            </Text>
          </View>
          <TouchableOpacity
            style={styles.closeImgWrapper}
            onPress={() => {
              setState(prev => !prev);
              setShowModalHandler(false);
              setPulseOn(prev => !prev);
            }}>
            <View>
              <Image
                source={require('../../assets/close.png')}
                style={styles.closeImg}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'grey',
    left: -20,
    opacity: 0.9,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height - 760,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  textInputStyleWrapper: {
    paddingHorizontal: 20,
    marginHorizontal: 20,
    paddingVertical: 11,
    marginBottom: 10,
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 20,
  },
  textInputStyle: {
    fontSize: 18,
  },
  pulse: {
    flex: 0.6,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  microphone: {
    width: 50,
    height: 50,
  },
  microImg: {
    width: '100%',
    height: '100%',
  },
  closeImgWrapper: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: Dimensions.get('window').height - 810,
    left: Dimensions.get('window').height - 820,
  },
  closeImg: {
    width: '100%',
    height: '100%',
  },
  searchText: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  helpText: {
    fontSize: 15,
  },
});
