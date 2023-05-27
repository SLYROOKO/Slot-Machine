import React, {useLayoutEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Roller from './Components/Roller';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function App(): JSX.Element {
  const ref =useRef();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.rollerContainer}>
          <Roller ref={ref}/>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoBox}>$</Text>
          <Text style={styles.infoBox}>Bet Multiplier</Text>
          <Text style={styles.infoBox}>Free Spins</Text>
        </View>
        <Button title="Spin" onPress={() => {
          ref.current.handleReelSpin();
        }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  rollerContainer: {
    marginVertical: screenHeight * 0.05,
    marginHorizontal: screenWidth * 0.05,
    maxHeight: screenHeight * 0.5,
  },
  infoContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
  infoBox: {
    marginVertical: screenHeight * 0.01,
    marginHorizontal: screenWidth * 0.01,
  },
});
export default App;
