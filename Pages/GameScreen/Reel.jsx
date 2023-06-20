import {StyleSheet, View, Animated, Easing} from 'react-native';
import Tile from './Tile';
import Constants from '../../Global/Constants';
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {Audio} from 'expo-av';

const Reel = forwardRef((props, reference) => {
  const resultStore = useRef(0);

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

  const scrollPosition = new Animated.Value(
    (Constants.reelContainerHeight / Constants.numRows) *
      -1 *
      (reelTiles.length - 3),
  );

  let tileRefs = [];

  const soundRef = useRef();

  const playSound = async () => {
    let {sound} = await Audio.Sound.createAsync(
      require('../../assets/sounds/5_4_3_2_1.mp3'),
      null,
      handleSoundUnload,
    );
    sound.setVolumeAsync(0.5);
    sound.setPositionAsync(250); //remove pause at start of sound
    soundRef.current = sound;
    await soundRef.current.playAsync();
  };

  const handleSoundUnload = state => {
    if (state.didJustFinish) {
      soundRef.current.unloadAsync();
    }
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
    let tileHeight = Constants.reelContainerHeight / Constants.numRows;
    const result =
      Math.floor(
        Math.random() *
          (reelTiles.length -
            Constants.minimumSpinCycleCount * initialReelTiles.length), //650-10*13=520
      ) +
      Constants.minimumSpinCycleCount * initialReelTiles.length;

    Animated.timing(scrollPosition, {
      toValue: (result - reelTiles.length) * tileHeight,
      duration:
        Constants.reelSpinMinDuration +
        props.reelIndex * Constants.reelSpinDurationDelay, // spin for longer the further to the right the reel is,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.exp),
    }).start(() => {
      // play reel click sound here
      if (props.reelIndex == 0) {
        playSound();
      }
      // using a trick to make the reel appear to be spinning infinitely
      scrollPosition.setValue(
        (-reelTiles.length +
          initialReelTiles.length +
          (result % initialReelTiles.length)) *
          tileHeight,
      );

      resultStore.current =
        reelTiles.length -
        initialReelTiles.length -
        (result % initialReelTiles.length);
      // return the current reel state
      props.reelState.current = [
        reelTiles[
          reelTiles.length -
            initialReelTiles.length -
            (result % initialReelTiles.length)
        ],
        reelTiles[
          reelTiles.length -
            initialReelTiles.length -
            (result % initialReelTiles.length) -
            initialReelTiles.length +
            1
        ],
        reelTiles[
          reelTiles.length -
            initialReelTiles.length -
            (result % initialReelTiles.length) +
            2
        ],
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
    backgroundColor: 'black',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 5,
  },
});

export default Reel;
