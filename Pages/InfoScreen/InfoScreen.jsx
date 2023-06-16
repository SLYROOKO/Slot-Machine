import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {DataTable} from 'react-native-paper';
import PayoutRow from './PayoutRow';
import PaylineRow from './PaylineRow';
import Constants from '../../Global/Constants';

const InfoScreen = ({navigation}) => {
  const infoButton = (
    <Pressable
      style={styles.infoButton}
      onPress={() => navigation.goBack('GameScreen')}>
      <Entypo name="info" size={24} color="black" />
    </Pressable>
  );

  const paylineRows = [];
  for (let i = 0; i < 20; i++) {
    paylineRows.push(<PaylineRow idx={i} key={i} />);
  }

  return (
    <SafeAreaView>
      {infoButton}
      <ScrollView>
        <View style={styles.scrollView}>
          <Text style={styles.headers}>Paylines</Text>
          <DataTable style={{marginBottom: 20}}>{paylineRows}</DataTable>
          <Text style={styles.headers}>Payouts</Text>
          <DataTable.Header>
            <DataTable.Title>Tile</DataTable.Title>
            <DataTable.Title>5x</DataTable.Title>
            <DataTable.Title>4x</DataTable.Title>
            <DataTable.Title>3x</DataTable.Title>
            <DataTable.Title>2x</DataTable.Title>
          </DataTable.Header>
          <DataTable>
            {Object.keys(Constants.Paytable).map((tilekey, idx) => {
              return <PayoutRow idx={idx} obj={tilekey} key={idx} />;
            })}
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoButton: {
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
  },
  headers: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default InfoScreen;
