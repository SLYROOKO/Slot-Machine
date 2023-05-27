import React, {useImperativeHandle} from 'react';
import {useState, forwardRef} from 'react';
import {StyleSheet, View, Animated, Easing, Text} from 'react-native';

const Roller = forwardRef((props, reference) => {
  let scrollPosition = new Animated.Value(0);
  const [tileIndex, setTileIndex] = useState(0);
  //fill reelTiles with 200 random capital letters
  const reelTiles = [...Array(1000)].map(() => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  });

  useImperativeHandle(reference, () => ({
    handleReelSpin,
  }));
  const handleReelSpin = () => {
    //random number between .9 and 1

    console.log('Spin');
    Animated.timing(scrollPosition, {
      toValue: -5000,
      duration: 1750,
      //+props.index *250,// spin for longer the further to the right the reel is
      useNativeDriver: true,
      easing: Easing.inOut(Easing.exp),
    }).start(() => {
      scrollPosition.setValue(0);
    });
  };

  const styles = StyleSheet.create({
    reel: {
      // width: 100,
      // height: 100,
      // borderRadius: 50,
      backgroundColor: 'white',
      overflow: 'hidden',
    },
    reelImage: {
      width: 100,
      height: 100,
    },
  });

  return (
    <View style={styles.reel}>
      <Animated.View style={{transform: [{translateY: scrollPosition}]}}>
        {reelTiles.map((tile, index) => {
          return <Text> {tile} </Text>;
        })}
      </Animated.View>
    </View>
  );
});

export default Roller;
