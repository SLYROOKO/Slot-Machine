import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Reel from './Components/Reel';
import Constants from './Constants';
import PlayButton from './Components/PlayButton';
import { useRef } from 'react';

function App() {
  const reelController1 = useRef();
  const reelController2 = useRef();
  const reelController3 = useRef();
  const reelController4 = useRef();
  const reelController5 = useRef();

  const handleSpin = () => {
    reelController1.current.handleReelSpin();
    reelController2.current.handleReelSpin();
    reelController3.current.handleReelSpin();
    reelController4.current.handleReelSpin();
    reelController5.current.handleReelSpin();
  };

  const ReelContainer = (
    <View style={styles.reelContainer}>
      <Reel reelIndex={0} ref={reelController1} />
      <Reel reelIndex={1} ref={reelController2} />
      <Reel reelIndex={2} ref={reelController3} />
      <Reel reelIndex={3} ref={reelController4} />
      <Reel reelIndex={4} ref={reelController5} />
    </View>
  );

 
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {ReelContainer}
        <View style={styles.infoContainer}>
          <Text style={styles.infoBox}>Credits</Text>
          <Text style={styles.infoBox}>Lines</Text>
          <Text style={styles.infoBox}>Free Spins</Text>
          <View style={styles.PlayButton}>
          <PlayButton action={handleSpin}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'skyblue',
  },
  reelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: Constants.windowHeight * 0.85,
    backgroundColor: Constants.backgroundColor,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Constants.windowHeight * 0.15,
    backgroundColor: Constants.backgroundColor,
  },
  infoBox: {
    marginVertical: Constants.windowHeight * 0.01,
    backgroundColor: 'blue',
    fontSize: Constants.windowHeight * 0.05,
    color: 'white',
    // fontFamily: 'ARCADECLASSIC',
    textAlignVertical: 'center',
    height: Constants.windowHeight * 0.1,
    marginHorizontal: Constants.windowWidth * 0.01,
    flex:1
  },
  PlayButton: {
    marginHorizontal: Constants.windowWidth * 0.01,
    marginVertical: Constants.windowHeight * 0.01,
    flex:1
  },
});


export default App;
