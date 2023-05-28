import React, {useRef} from 'react';
import {SafeAreaView, View, Text, Button, StyleSheet} from 'react-native';
import Reel from './Components/Reel';
import Constants from './Constants';

function App(): JSX.Element {
  const spinner = useRef<any>();

  const ReelContainer = [];
  for (let i = 0; i < Constants.numColumns; i++) {
    ReelContainer.push(<Reel reference={spinner} key={i} />);
  }
  // console.log('ReelContainer', ReelContainer);
  console.log(Constants);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.reelContainer}>{ReelContainer}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoBox}>$</Text>
          <Text style={styles.infoBox}>Bet Multiplier</Text>
          <Text style={styles.infoBox}>Free Spins</Text>
          <Button
            title="Spin"
            onPress={() => {
              console.log(spinner.current);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    height: '100%',
  },
  reelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Constants.screenWidth * 0.8,
  },
  infoContainer: {
    width: Constants.screenWidth * 0.15,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  infoBox: {
    marginVertical: 0.01,
    marginHorizontal: 0.01,
    backgroundColor: 'violet',
    fontFamily: 'ARCADECLASSIC',
  },
});

export default App;
