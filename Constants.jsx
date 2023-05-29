import {Dimensions} from 'react-native';

const Constants = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  numRows: 3,
  numColumns: 5,
  backgroundColor: 'black',
  wildCardMutationChance: 0.1,
  reelRepeatCount: 50,
  minimumSpinCycleCount: 3,
  reelSpinDurationDelay: 1000,
  reelSpinMinDuration: 8000,
};

export default Constants;
