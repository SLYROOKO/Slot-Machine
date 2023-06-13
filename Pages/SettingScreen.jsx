import {SafeAreaView, StyleSheet, Text, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const SettingScreen = ({navigation}) => {
  const settingsButton = (
    <Pressable
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
      onPress={() => navigation.goBack('GameScreen')}>
      <Ionicons name="settings-outline" size={24} color="black" />
    </Pressable>
  );

  return (
    <SafeAreaView>
      {settingsButton}
      <Text>SettingScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingScreen;
