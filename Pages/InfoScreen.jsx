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
import PayoutRow from '../Components/PayoutRow';
import PaylineRow from '../Components/PaylineRow';
import Constants from '../Global/Constants';

const InfoScreen = ({navigation}) => {
  const infoButton = (
    <Pressable
      style={styles.infoButton}
      onPress={() => navigation.navigate('GameScreen')}>
      <Entypo name="info" size={24} color="black" />
    </Pressable>
  );

  const payoutGrids = [
    [[0, 0, 0, 0, 0][(1, 1, 1, 1, 1)][(0, 0, 0, 0, 0)]],
    [[1, 1, 1, 1, 1][(0, 0, 0, 0, 0)][(0, 0, 0, 0, 0)]],
  ];

  return (
    <SafeAreaView>
      {infoButton}
      <ScrollView>
        <View style={styles.scrollView}>
          <Text style={styles.headers}>Paylines</Text>
          <DataTable style={{marginBottom: 20}}>
            {payoutGrids.map((grid, idx) => {
              return <PaylineRow idx={idx} key={idx} />;
            })}
          </DataTable>
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
