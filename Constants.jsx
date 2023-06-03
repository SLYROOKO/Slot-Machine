import {Dimensions} from 'react-native';

const Constants = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  numRows: 3,
  numColumns: 5,
  backgroundColor: 'black',
  wildCardMutationChance: 0.1,
  reelRepeatCount: 50,
  minimumSpinCycleCount: 5,
  startingCredits: 500,
  reelSpinDurationDelay: 1000,
  reelSpinMinDuration: 8000,
  winningPaylinesHighlightDuration: 1500,
  //Paylines [row,col] https://www.slotsmate.com/blog/slot-machine-paylines-explained
  Paylines: [
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ], //middle row #1
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ], //Top Row #2
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
    ], //Bottom row #3
    [
      [0, 0],
      [1, 1],
      [2, 2],
      [1, 3],
      [0, 4],
    ], //V shape #4 top mid bot mid top
    [
      [2, 0],
      [1, 1],
      [0, 2],
      [1, 3],
      [2, 4],
    ], //reverse V #5  bot mid top mid bot
    [
      [1, 0],
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 4],
    ], //middle top alternating #6
    [
      [1, 0],
      [2, 1],
      [1, 2],
      [2, 3],
      [1, 4],
    ], //middle bot alternating #7
    [
      [0, 0],
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ], //top top middle bot bot #8
    [
      [2, 0],
      [2, 1],
      [1, 2],
      [0, 3],
      [0, 4],
    ], //bot bot middle top top #9
    [
      [1, 0],
      [2, 1],
      [1, 2],
      [0, 3],
      [1, 4],
    ], //middle bot middle top middle #10
    [
      [1, 0],
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
    ], //middle top middle bot middle #11
    [
      [0, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [0, 4],
    ], //top middle middle middle top #12
    [
      [2, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 4],
    ], //bot middle middle middle bot #13
    [
      [0, 0],
      [1, 1],
      [0, 2],
      [1, 3],
      [0, 4],
    ], //top middle alternating #14
    [
      [2, 0],
      [1, 1],
      [2, 2],
      [1, 3],
      [2, 4],
    ], //bot middle alternating #15
    [
      [1, 0],
      [1, 1],
      [0, 2],
      [1, 3],
      [1, 4],
    ], //middle middle top middle middle #16
    [
      [1, 0],
      [1, 1],
      [2, 2],
      [1, 3],
      [1, 4],
    ], //middle middle bot middle middle #17
    [
      [0, 0],
      [0, 1],
      [2, 2],
      [0, 3],
      [0, 4],
    ], //top top bot top top #18
    [
      [2, 0],
      [2, 1],
      [0, 2],
      [2, 3],
      [2, 4],
    ], //bot bot top bot bot #19
    [
      [0, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [0, 4],
    ], //top bot bot bot top #20
  ],
  Paytable: {
    1: {5: 10000, 4: 2000, 3: 200, 2: 10},
    2: {5: 750, 4: 100, 3: 25, 2: 2},
    3: {5: 750, 4: 100, 3: 25, 2: 2},
    4: {5: 400, 4: 100, 3: 15, 2: 0},
    5: {5: 250, 4: 75, 3: 10, 2: 0},
    6: {5: 250, 4: 50, 3: 10, 2: 0},
    7: {5: 125, 4: 50, 3: 10, 2: 0},
    8: {5: 100, 4: 50, 3: 5, 2: 0},
    9: {5: 100, 4: 25, 3: 5, 2: 0},
    10: {5: 100, 4: 25, 3: 5, 2: 0},
    11: {5: 100, 4: 25, 3: 5, 2: 0},
    12: {5: 100, 4: 25, 3: 5, 2: 0},
    13: {5: 100, 4: 20, 3: 5, 2: 2}, //multiplier is of total bet  so 1x for 1 line 20x for 20 lines//15 free spins loot for 3,4,5 of them //implement triple winnings during free spins
  },
};

export default Constants;
