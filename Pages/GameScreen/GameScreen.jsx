import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import Constants from '../../Global/Constants';
import {useRef} from 'react';
import BottomBar from './BottomBar';
import Reel from './Reel';
import {Entypo} from '@expo/vector-icons';
import AppColors from '../../Global/AppColors';
import Background from './Background';

const GameScreen = ({navigation}) => {
  const reelControllers = [];
  const reelStates = [];
  for (let i = 0; i < Constants.numColumns; i++) {
    reelStates.push(useRef([]));
  }
  const winningPaylines = useRef([]);

  const handleSpin = freeSpin => {
    //Make Changes for FreeSpin here TBD// visual effects// background change?
    reelControllers.forEach(reelController => {
      reelController.handleReelSpin();
    });
    setTimeout(() => {
      handlePayout(freeSpin);
    }, Constants.reelSpinDurationDelay * 5 + Constants.reelSpinMinDuration);
  };

  const bottomBarRef = useRef();
  const backgroundRef = useRef();
  const paylineState = useRef(0);

  const handlePayout = freeSpin => {
    winningPaylines.current = [];
    let totalPayout = 0;
    let reelState = [
      reelStates[0].current,
      reelStates[1].current,
      reelStates[2].current,
      reelStates[3].current,
      reelStates[4].current,
    ];
    if (paylineState.current >= 1) {
      totalPayout += calculatePayout(reelState, 0, 1);
    }
    if (paylineState.current >= 5) {
      totalPayout += calculatePayout(reelState, 1, 5);
    }
    if (paylineState.current >= 9) {
      totalPayout += calculatePayout(reelState, 5, 9);
    }
    if (paylineState.current >= 15) {
      totalPayout += calculatePayout(reelState, 9, 15);
    }
    if (paylineState.current >= 20) {
      totalPayout += calculatePayout(reelState, 15, 20);
    }
    totalPayout += calculateLootBoxPayout(reelState);

    if (freeSpin) {
      totalPayout *= 3;
    }
    bottomBarRef.current.addCredits(totalPayout);
    highlightWinningPaylines(0);

    //play sounds based on payout
    //totalpayout>5*paylines played play smallwin sound
    //totalpayout>10*paylines played play bigwin sound
    //5 in a row play 5inarow sound
    //jackpot play jackpot sound
    //free spins won play free spins sound
  };

  const calculatePayout = (reelState, payLineStart, payLineEnd) => {
    let payout = 0;

    for (let i = payLineStart; i < payLineEnd; i++) {
      //loop throught each payline
      let count = 0;
      //get the first tile of the payline
      let firstTile =
        reelState[Constants.Paylines[i][0][1]][Constants.Paylines[i][0][0]];
      // while the next tile in the playline is the same as the first tile
      if (firstTile != 13) {
        let paylineIndex = 0;
        while (
          paylineIndex < 5 &&
          reelState[Constants.Paylines[i][paylineIndex][1]][
            Constants.Paylines[i][paylineIndex][0]
          ] == firstTile
        ) {
          count += 1;
          paylineIndex += 1;
        }
      }

      if (count > 5) {
        Error("Can't have more than 5 of the same tile in a payline");
      }
      if (count > 1) {
        let winnings = Constants.Paytable[firstTile][count];
        payout += winnings;
        if (winnings > 0) {
          winningPaylines.current.push(Constants.Paylines[i]);
        }
      }
    }

    return payout;
  };

  const calculateLootBoxPayout = reelState => {
    let payout = 0;
    let count = 0;
    let lootBoxIndexes = [];
    for (let i = 0; i < reelState.length; i++) {
      for (let j = 0; j < reelState[i].length; j++) {
        if (reelState[i][j] == 13) {
          count += 1;
          lootBoxIndexes.push([j, i]);
        }
      }
    }

    if (count > 1) {
      payout += Constants.Paytable[13][count] * paylineState.current;
      winningPaylines.current.push(lootBoxIndexes);
    }
    if (count > 4) {
      bottomBarRef.current.addFreeSpins(30);
      return payout;
    }
    if (count > 3) {
      bottomBarRef.current.addFreeSpins(15);
      return payout;
    }
    if (count > 2) {
      bottomBarRef.current.addFreeSpins(5);
      return payout;
    }

    return payout;
  };

  const highlightWinningPaylines = winningLineIndex => {
    if (!winningPaylines.current.length) {
      bottomBarRef.current.setPlayButtonDisable(false);
      if (bottomBarRef.current.getFreeSpins() > 0) {
        handleFreeSpin();
      } else {
        handleAutoSpin();
      }
      return;
    }

    if (winningLineIndex > 0) {
      reelControllers.forEach(reelController => {
        reelController.setWinningLines([0, 0, 0]);
      });
    }

    if (winningLineIndex > winningPaylines.current.length - 1) {
      reelControllers.forEach(reelController => {
        reelController.setWinningLines([1, 1, 1]);
      });
      bottomBarRef.current.setPlayButtonDisable(false);
      if (bottomBarRef.current.getFreeSpins() > 0) {
        handleFreeSpin();
      } else {
        handleAutoSpin();
      }
      return;
    }

    let temp = Array(5)
      .fill(0)
      .map(() => Array(3).fill(0));

    for (let i = 0; i < winningPaylines.current[winningLineIndex].length; i++) {
      temp[winningPaylines.current[winningLineIndex][i][1]][
        winningPaylines.current[winningLineIndex][i][0]
      ] = 1;
    }

    reelControllers.forEach((reelController, index) => {
      reelController.setWinningLines(temp[index]);
    });

    setTimeout(() => {
      highlightWinningPaylines(winningLineIndex + 1);
    }, Constants.winningPaylinesHighlightDuration);
  };

  const handleAutoSpin = () => {
    backgroundRef.current.setBackground(false);
    bottomBarRef.current.stopFreePlayMusic();
    if (bottomBarRef.current.getAutoSpinState()) {
      bottomBarRef.current.spinController(false);
    }
  };

  const handleFreeSpin = () => {
    if (bottomBarRef.current.getFreeSpins() > 0) {
      backgroundRef.current.setBackground(true);
      bottomBarRef.current.spinController(true);
    }
  };

  const ReelContainer = [];
  for (let i = 0; i < Constants.numColumns; i++) {
    ReelContainer.push(
      <Reel
        key={i}
        reelIndex={i}
        ref={ref => (reelControllers[i] = ref)}
        reelState={reelStates[i]}
      />,
    );
  }

  const infoButton = (
    <Pressable
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
      onPress={() => navigation.navigate('InfoScreen')}>
      <Entypo name="info" size={24} color="black" />
    </Pressable>
  );

  return (
    <SafeAreaView>
      {infoButton}
      <View style={styles.container}>
        <Background ref={backgroundRef} />
        <View style={styles.reelContainer}>{ReelContainer}</View>
        <BottomBar
          spinreel={handleSpin}
          ref={bottomBarRef}
          getPaylineState={paylineState}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: AppColors.Primary,
    height: Constants.windowHeight - StatusBar.currentHeight,
  },
  reelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: Constants.reelContainerHeight,
  },
});

export default GameScreen;
