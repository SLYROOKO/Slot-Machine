import {StyleSheet, TouchableOpacity, Text, View, Modal} from 'react-native';
import Constants from '../../Global/Constants';
import {forwardRef, useImperativeHandle, useState, useEffect} from 'react';
import {Audio} from 'expo-av';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import AppColors from '../../Global/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomBar = forwardRef((props, ref) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [credits, setCredits] = useState(Constants.startingCredits);
  const Paylines = [1, 5, 9, 15, 20];
  const [lineIndex, setLineIndex] = useState(4);
  const [freeSpins, setFreeSpins] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [autoSpin, setAutoSpin] = useState(false);

  const [sound, setSound] = useState();

  const playSound = async () => {
    let {sound} = await Audio.Sound.createAsync(
      require('../../assets/sounds/SpinPlay.mp3'),
    );
    setSound(sound);

    sound.setVolumeAsync(0.1);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    AsyncStorage.getItem('credits').then(value => {
      if (value !== null) {
        console.log('credits retrieved:', value);
        setCredits(parseInt(value));
      }
    });
  }, []);

  const adjustLineIndex = goRight => {
    if (lineIndex >= Paylines.length - 1 && goRight) {
      return;
    }
    if (lineIndex <= 0 && !goRight) {
      return;
    }
    if (goRight) {
      setLineIndex(lineIndex + 1);
    } else {
      setLineIndex(lineIndex - 1);
    }
  };

  useImperativeHandle(ref, () => ({
    addCredits: amount => {
      AsyncStorage.setItem('credits', (credits + amount).toString());
      setCredits(credits + amount);
    },
    getFreeSpins: () => {
      return freeSpins;
    },
    addFreeSpins: amount => {
      setFreeSpins(freeSpins + amount);
    },
    setPlayButtonDisable: bool => {
      setButtonDisable(bool);
    },
    getAutoSpinState: () => {
      return autoSpin;
    },
    spinController: freeSpin => {
      handleButtonPress(freeSpin);
    },
  }));

  const handleButtonPress = freeSpin => {
    if (freeSpin) {
      setFreeSpins(freeSpins - 1);
      playSound(); // swap this with the sound for free spins next branch
      setButtonDisable(true);
      props.spinreel(freeSpin);
    }

    if (!freeSpin && credits >= Paylines[lineIndex]) {
      setCredits(credits - Paylines[lineIndex]);
      props.getPaylineState.current = Paylines[lineIndex];
      playSound();
      setButtonDisable(true);
      props.spinreel(freeSpin);
    }
  };

  const autoPlayButton = autoSpin ? (
    <TouchableOpacity
      style={[
        styles.playButton,
        {
          backgroundColor: 'blue',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={() => setAutoSpin(false)}>
      <FontAwesome name="stop" size={24} color="black" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.playButton,
        {
          backgroundColor: 'blue',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={() => setAutoSpin(true)}>
      <Text style={{fontWeight:'bold'}}>Auto</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.infoContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              AsyncStorage.setItem('credits', (credits + 100).toString());
              setCredits(credits + 100);
            }}>
            <Text>Buy 100</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              AsyncStorage.setItem('credits', (credits + 500).toString());
              setCredits(credits + 500);
            }}>
            <Text>Buy 500</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              AsyncStorage.setItem('credits', (credits + 1000).toString());
              setCredits(credits + 1000);
            }}>
            <Text>Buy 1000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, {backgroundColor: AppColors.Primary}]}
            onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        disabled={buttonDisable}
        style={styles.infoBox}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.infoText}>Credits {credits}</Text>
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <TouchableOpacity
          style={styles.lineSelector}
          onPress={() => {
            adjustLineIndex(false);
          }}>
          <AntDesign name="left" size={24} color={AppColors.tenColor} />
        </TouchableOpacity>
        <Text style={styles.infoText}>Lines {Paylines[lineIndex]}</Text>
        <TouchableOpacity
          style={styles.lineSelector}
          onPress={() => {
            adjustLineIndex(true);
          }}>
          <AntDesign name="right" size={24} color={AppColors.tenColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Free Spins {freeSpins} </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: Constants.windowWidth * 0.01,
        }}>
        <TouchableOpacity
          style={[
            styles.playButton,
            {
              flex: 3,
              backgroundColor:
                buttonDisable || credits < Paylines[lineIndex]
                  ? 'gray'
                  : AppColors.Tertiary,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            },
          ]}
          disabled={buttonDisable}
          onPress={() => {
            handleButtonPress();
          }}>
          <Text style={styles.playButtonText}>SPIN</Text>
        </TouchableOpacity>
        {autoPlayButton}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  playButtonText: {
    fontSize: Constants.windowHeight * 0.07,
    color: AppColors.sixtyColor,
    // fontFamily: 'ARCADECLASSIC', //not working fix in future
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  playButton: {
    marginVertical: Constants.windowHeight * 0.01,
    flex: 1,
    height: Constants.windowHeight * 0.1,
    backgroundColor: 'blue',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Constants.windowHeight * 0.08,
    marginVertical: Constants.windowHeight * 0.03,
  },
  infoBox: {
    flexDirection: 'row',
    marginVertical: Constants.windowHeight * 0.01,
    backgroundColor: AppColors.Secondary,
    height: Constants.windowHeight * 0.1,
    marginHorizontal: Constants.windowWidth * 0.01,
    flex: 1,
    justifyContent: 'space-evenly',
    borderRadius: 20,
  },
  infoText: {
    fontSize: Constants.windowHeight * 0.05,
    color: AppColors.Primary,
    //fontFamily: 'ARCADECLASSIC', //not working fix in future
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
  },
  lineSelector: {
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    marginHorizontal: Constants.windowWidth * 0.3,
    marginVertical: Constants.windowHeight * 0.1,
    backgroundColor: AppColors.Secondary,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.windowWidth * 0.2,
  },
  modalButton: {
    flex: 1,
    backgroundColor: AppColors.Tertiary,
    borderRadius: 20,
    elevation: 6,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'black',
    fontSize: Constants.windowHeight * 0.08,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BottomBar;
