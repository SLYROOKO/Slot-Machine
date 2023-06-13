import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from './Pages/GameScreen/GameScreen';
import InfoScreen from './Pages/InfoScreen/InfoScreen';
import SettingScreen from './Pages/SettingScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        {/* <Stack.Screen name="CreditBuyScreen" component={CreditBuyScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
