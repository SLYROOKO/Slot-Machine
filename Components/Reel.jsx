import {StyleSheet, View, Animated, Easing} from 'react-native';
import Tile from './Tile';
import Constants from '../Constants';
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {Audio} from 'expo-av';
import AppColors from '../AppColors';

const Reel = forwardRef((props, reference) => {
  const resultStore = useRef(0);
  let scrollPosition = new Animated.Value(0);

  //create an array of 13 tiles
  let initialReelTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  //shuffle the array
  for (let i = initialReelTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = initialReelTiles[i];
    initialReelTiles[i] = initialReelTiles[j];
    initialReelTiles[j] = temp;
  }
  //add initial copies of initialReelTiles to the end of the array 10 times
  let reelTiles = initialReelTiles;
  for (let i = 0; i < Constants.reelRepeatCount - 1; i++) {
    reelTiles = reelTiles.concat(initialReelTiles);
  }

  let tileRefs = [];

  const soundRef = useRef();

  const playSound = async () => {
    let {sound} = await Audio.Sound.createAsync(
      require('../assets/sounds/5_4_3_2_1.mp3'),
    );
    sound.setVolumeAsync(0.5);
    soundRef.current = sound;
    await soundRef.current.playAsync();
  };

  useEffect(() => {
    return soundRef.current
      ? () => {
          soundRef.current.unloadAsync();
        }
      : undefined;
  }, [soundRef.current]);

  useImperativeHandle(reference, () => ({
    handleReelSpin,
    setWinningLines,
  }));

  const setWinningLines = winningLineList => {
    if (winningLineList.length != 3) {
      return;
    }
    winningLineList[0] == 1
      ? tileRefs[resultStore.current].highlight(true)
      : tileRefs[resultStore.current].highlight(false);
    winningLineList[1] == 1
      ? tileRefs[resultStore.current + 1].highlight(true)
      : tileRefs[resultStore.current + 1].highlight(false);
    winningLineList[2] == 1
      ? tileRefs[resultStore.current + 2].highlight(true)
      : tileRefs[resultStore.current + 2].highlight(false);
  };

  const handleReelSpin = () => {
    //turn on all tile highlights
    tileRefs.forEach(tile => {
      tile.highlight(true);
    });

    const result =
      Math.floor(
        Math.random() *
          (reelTiles.length -
            initialReelTiles.length -
            Constants.minimumSpinCycleCount * initialReelTiles.length),
      ) +
      Constants.minimumSpinCycleCount * initialReelTiles.length;

    Animated.timing(scrollPosition, {
      toValue: -(result * Constants.reelContainerHeight) / Constants.numRows,
      duration:
        Constants.reelSpinMinDuration +
        props.reelIndex * Constants.reelSpinDurationDelay, // spin for longer the further to the right the reel is,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.exp),
    }).start(() => {
      // play reel click sound
      if (props.reelIndex == 0) {
        playSound();
      }
      // using a trick to make the reel appear to be spinning infinitely
      scrollPosition.setValue(
        -((result % initialReelTiles.length) * Constants.reelContainerHeight) /
          Constants.numRows,
      );
      resultStore.current = result % initialReelTiles.length;
      // return the current reel state
      props.reelState.current = [
        reelTiles[result % initialReelTiles.length],
        reelTiles[(result + 1) % initialReelTiles.length],
        reelTiles[(result + 2) % initialReelTiles.length],
      ];
    });
  };

  return (
    <View style={styles.reel}>
      <Animated.View style={{transform: [{translateY: scrollPosition}]}}>
        {reelTiles.map((tile, index) => {
          return (
            <Tile
              tileType={tile}
              index={index}
              width={Constants.reelContainerHeight / Constants.numRows}
              height={Constants.reelContainerHeight / Constants.numRows}
              key={index}
              ref={ref => (tileRefs[index] = ref)}
            />
          );
        })}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  reel: {
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: AppColors.sixtyColor,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 5,
  },
});

export default Reel;
