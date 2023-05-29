import { StyleSheet, View, Animated, Easing } from 'react-native';
import Tile from './Tile';
import Constants from '../Constants';
import { forwardRef, useImperativeHandle } from 'react';

const Reel = forwardRef((props, reference) => {
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

  useImperativeHandle(reference, () => ({
    handleReelSpin,
  }));

  const  handleReelSpin = () => {
    const result =
      Math.floor(
        Math.random() *
          (reelTiles.length -
            Constants.minimumSpinCycleCount * initialReelTiles.length),
      ) +
      Constants.minimumSpinCycleCount * initialReelTiles.length;

    Animated.timing(scrollPosition, {
      toValue: -(result * Constants.windowHeight * 0.85) / Constants.numRows,
      duration: Constants.reelSpinMinDuration + props.reelIndex * Constants.reelSpinDurationDelay, // spin for longer the further to the right the reel is,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.exp),
    }).start(() => {
      // using a trick to reset the reel to the first set of tiles
      scrollPosition.setValue(
        -((result % initialReelTiles.length) * Constants.windowHeight * 0.85) /
          Constants.numRows,
      );
      // stop the music
      // calculate the payout
      return true;
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
              width={(Constants.windowHeight * 0.85) / Constants.numRows}
              height={(Constants.windowHeight * 0.85) / Constants.numRows}
              key={index}
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
  },
});

export default Reel;
