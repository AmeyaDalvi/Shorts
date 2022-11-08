import React from 'react';
import {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {VoiceModal} from './VoiceModal';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

export const Search = () => {
  const [title, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const textInputRef = useRef(null);

  const navigation = useNavigation();

  const setShowModalHandler = state => {
    setShowModal(state);
  };

  useFocusEffect(
    React.useCallback(() => {
      textInputRef.current?.clear();
    }, []),
  );

  return (
    <View style={styles.textInputStyleWrapper}>
      {showModal && (
        <VoiceModal
          show={showModal}
          setShowModalHandler={setShowModalHandler}
        />
      )}
      <TextInput
        ref={textInputRef}
        value={title}
        style={styles.textInputStyle}
        placeholder="Search..."
        onChangeText={value => setSearchText(value)}
        onEndEditing={() => {
          title !== '' && navigation.navigate('News', {title});
        }}
      />
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Image
          source={require('../../assets/microphone.png')}
          style={styles.microphone}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  microphone: {
    width: 25,
    height: 25,
  },
});
