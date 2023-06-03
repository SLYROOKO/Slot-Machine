import Reactotron from 'reactotron-react-native';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

export default reactotron;


//@react-native-async-storage/async-storage"
// "reactotron-react-native": "^5.0.3",
//     "reactotron-redux": "^3.1.3"