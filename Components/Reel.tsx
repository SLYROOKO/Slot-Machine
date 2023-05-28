import React, {useImperativeHandle} from 'react';
import {useState, forwardRef} from 'react';
import {StyleSheet, View, Animated, Easing, Text} from 'react-native';
import Tile from './Tile';

const Reel = forwardRef((props, reference) => {
  let scrollPosition = new Animated.Value(0);
  const reelTiles = [...Array(14)].map(() => {
    return Math.floor(Math.random() * 14);
  });

  useImperativeHandle(reference, () => ({
    handleReelSpin,
  }));

  const handleReelSpin = () => {
    console.log('Spinning');
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
      backgroundColor: 'white',
      overflow: 'hidden',
    },
  });

  return (
    <View style={styles.reel}>
      <Animated.View style={{transform: [{translateY: scrollPosition}]}}>
        {reelTiles.map((tile, index) => {
          return <Tile tileType={tile} index={index} width={"change"} height={"change"} key={index}/>;
        })}
      </Animated.View>
    </View>
  );
});

export default Reel;
