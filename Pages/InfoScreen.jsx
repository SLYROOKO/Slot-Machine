import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import {Entypo} from '@expo/vector-icons';

const InfoScreen = ({navigation}) => {
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
      onPress={() => navigation.navigate('GameScreen')}>
      <Entypo name="info" size={24} color="black" />
    </Pressable>
  );

  return (
    <SafeAreaView>
      {infoButton}
      <ScrollView>
        <Text>InfoScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default InfoScreen;
