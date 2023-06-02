import { SafeAreaView, View, StyleSheet } from 'react-native';
import Reel from './Components/Reel';
import Constants from './Constants';
import { useRef } from 'react';
import BottomBar from './Components/BottomBar';

function App() {
  const reelController1 = useRef();
  const reelController2 = useRef();
  const reelController3 = useRef();
  const reelController4 = useRef();
  const reelController5 = useRef();
  const reelState1=useRef([]);
  const reelState2=useRef([]);
  const reelState3=useRef([]);
  const reelState4=useRef([]);
  const reelState5=useRef([]);

  const handleSpin = () => {
    reelController1.current.handleReelSpin();
    reelController2.current.handleReelSpin();
    reelController3.current.handleReelSpin();
    reelController4.current.handleReelSpin();
    reelController5.current.handleReelSpin();
    setTimeout(() => {
      handlePayout();
  }, Constants.reelSpinDurationDelay*5+Constants.reelSpinMinDuration);
  };

  const addCredits = useRef();
  const paylineState = useRef(1);

  const handlePayout = () => {
    let totalPayout=0;
    let reelState=[reelState1.current, reelState2.current, reelState3.current, reelState4.current, reelState5.current];
    if (paylineState.current>=1) {
      totalPayout+=calculatePayout(reelState, 0, 1);
    }
    if (paylineState.current>=5) {  
      totalPayout+=calculatePayout(reelState, 1, 5);
    }
    if (paylineState.current>=9) {
      totalPayout+=calculatePayout(reelState, 5, 9);
    }
    if (paylineState.current>=15) {
      totalPayout+=calculatePayout(reelState, 9, 15);
    }
    if (paylineState.current>=20) {
      totalPayout+=calculatePayout(reelState, 15, 20);
    }
    totalPayout+=calculateLootBoxPayout(reelState);
    addCredits.current.addCredits(totalPayout);
    //play sounds based on payout
    //totalpayout>5*paylines played play smallwin sound
    //totalpayout>10*paylines played play bigwin sound
    //5 in a row play 5inarow sound
    //jackpot play jackpot sound
    //free spins won play free spins sound
  }

  const calculatePayout = (reelState, payLineStart, payLineEnd) => {
    let payout=0;
    
    for(let i =payLineStart;i<payLineEnd;i++) {//loop throught each payline
      let count = 0;
      //get the first tile of the payline
      let firstTile = reelState[Constants.Paylines[i][0][1]][Constants.Paylines[i][0][0]];
      // while the next tile in the playline is the same as the first tile
      if (firstTile!=13) {
        let paylineIndex=0;
        while (reelState[Constants.Paylines[i][paylineIndex][1]][Constants.Paylines[i][paylineIndex][0]]==firstTile) {
          count+=1
          paylineIndex+=1
        }
      }
      
      if (count>5) {
        Error("Can't have more than 5 of the same tile in a payline");
      }
      if (count>1) {
        payout+=Constants.Paytable[firstTile][count];
      }
    }

    return payout;
  }

  const calculateLootBoxPayout = (reelState) => {
    let payout=0;
    let count = 0;
    for (let i=0;i<reelState.length;i++) {
      for (let j=0;j<reelState[i].length;j++) {
        if (reelState[i][j]==13) {
          count+=1;
        }
      }
    }
    if (count>1) {
      payout+=Constants.Paytable[13][count]*paylineState.current;
    }
    if (count>2){
      //set freespins +=15
    }
    return payout;
  }


  const ReelContainer = (
    <View style={styles.reelContainer}>
      <Reel reelIndex={0} ref={reelController1} getReelState={reelState1}/>
      <Reel reelIndex={1} ref={reelController2} getReelState={reelState2}/>
      <Reel reelIndex={2} ref={reelController3} getReelState={reelState3}/>
      <Reel reelIndex={3} ref={reelController4} getReelState={reelState4}/>
      <Reel reelIndex={4} ref={reelController5} getReelState={reelState5}/>
    </View>
  );
 
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {ReelContainer}
        <BottomBar spinreel={handleSpin} ref={addCredits} getPaylineState={paylineState}/>
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

});


export default App;
