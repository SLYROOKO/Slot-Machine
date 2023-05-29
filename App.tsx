import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Reel from './Components/Reel';
import Constants from './Constants';
import {createRef} from 'react';

function App(): JSX.Element {
  // const spinner = useRef<any>();
  const ReelPointers: any[] = new Array(Constants.numColumns);
  const ReelContainer: JSX.Element[] = new Array(Constants.numColumns);

  for (let i = 0; i < Constants.numColumns; i++) {
    ReelPointers[i] = createRef();
    ReelContainer[i] = (
      <Reel
        key={i}
        ref={ReelPointers[i]}
        //@ts-ignore
        index={i}
      />
    );
  }
  console.log(ReelPointers, ReelContainer);
  const handleSpin = () => {
    console.log(ReelPointers, ReelContainer);
    console.log('handleSpin');
    // ReelPointers.forEach(reel => {
    //   reel.current.handleReelSpin();
    // });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.reelContainer}>{ReelContainer}</View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoBox}>Credits</Text>
          <Text style={styles.infoBox}>Lines</Text>
          <Text style={styles.infoBox}>Free Spins</Text>

          <TouchableOpacity
            style={styles.playButton}
            onPress={() => handleSpin()}>
            <Text style={styles.playButtonText}>PLAY</Text>
          </TouchableOpacity>
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
    flex: 1,
    marginHorizontal: Constants.windowWidth * 0.01,
  },
  playButton: {
    height: Constants.windowHeight * 0.1,
    backgroundColor: 'green',
    flex: 1,
    marginHorizontal: Constants.windowWidth * 0.01,
    marginVertical: Constants.windowHeight * 0.01,
  },
  playButtonText: {
    fontSize: Constants.windowHeight * 0.06,
    color: 'white',
    // fontFamily: 'ARCADECLASSIC',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;
