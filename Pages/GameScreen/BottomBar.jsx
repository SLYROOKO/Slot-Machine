import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Constants from '../../Global/Constants';
import {forwardRef, useImperativeHandle, useState, useEffect} from 'react';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import AppColors from '../../Global/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomBar = forwardRef((props, ref) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [credits, setCredits] = useState(Constants.startingCredits);
  const Paylines = [1, 5, 9, 15, 20];
  const [lineIndex, setLineIndex] = useState(4);
  const [freeSpins, setFreeSpins] = useState(0);

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
    addFreeSpins: amount => {
      setFreeSpins(freeSpins + amount);
    },
    setPlayButtonDisable: bool => {
      setButtonDisable(bool);
    },
  }));

  const handleButtonPress = () => {
    if (credits >= Paylines[lineIndex]) {
      setCredits(credits - Paylines[lineIndex]);
      props.getPaylineState.current = Paylines[lineIndex];
      playSound();
      setButtonDisable(true);
      props.spinreel();
    }
  };

  const styles = StyleSheet.create({
    playButtonText: {
      fontSize: Constants.windowHeight * 0.07,
      color: AppColors.sixtyColor,
      // fontFamily: 'ARCADECLASSIC', //not working fix in future
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    playButton: {
      marginHorizontal: Constants.windowWidth * 0.01,
      marginVertical: Constants.windowHeight * 0.01,
      flex: 1,
      height: Constants.windowHeight * 0.1,
      backgroundColor:
        buttonDisable || credits < Paylines[lineIndex]
          ? 'gray'
          : AppColors.tenColor,
      borderRadius: 20,
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
      backgroundColor: AppColors.thirtyColor,
      height: Constants.windowHeight * 0.1,
      marginHorizontal: Constants.windowWidth * 0.01,
      flex: 1,
      justifyContent: 'space-evenly',
      borderRadius: 20,
    },
    infoText: {
      fontSize: Constants.windowHeight * 0.05,
      color: AppColors.sixtyColor,
      //fontFamily: 'ARCADECLASSIC', //not working fix in future
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    lineSelector: {
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Credits {credits}</Text>
      </View>
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
      <TouchableOpacity
        style={styles.playButton}
        disabled={buttonDisable}
        onPress={() => {
          handleButtonPress();
        }}>
        <Text style={styles.playButtonText}>SPIN</Text>
      </TouchableOpacity>
    </View>
  );
});

export default BottomBar;
