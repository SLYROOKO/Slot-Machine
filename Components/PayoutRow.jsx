import {DataTable} from 'react-native-paper';
import {StyleSheet, Image} from 'react-native';
import {TileImages} from '../Global/Images';
import Constants from '../Global/Constants';

const PayoutRow = ({idx, obj}) => {
  const getTileImage = () => {
    switch (Number(obj)) {
      case 1:
        return TileImages.Pachimari;
      case 2:
        return TileImages.Sombra;
      case 3:
        return TileImages.WhiteLogo;
      case 4:
        return TileImages.Dva;
      case 5:
        return TileImages.Genji;
      case 6:
        return TileImages.Lucio;
      case 7:
        return TileImages.Mcree;
      case 8:
        return TileImages.Mercy;
      case 9:
        return TileImages.Reinhardt;
      case 10:
        return TileImages.Ana;
      case 11:
        return TileImages.Widow;
      case 12:
        return TileImages.WreckingBall;
      default:
        return TileImages.LootBox;
    }
  };

  return (
    <DataTable.Row>
      <Image style={styles.image} source={getTileImage()}></Image>
      <DataTable.Cell style={styles.cell}>
        {Constants.Paytable[obj][5]}
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        {Constants.Paytable[obj][4]}
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        {Constants.Paytable[obj][3]}
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        {Constants.Paytable[obj][2]}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

const styles = StyleSheet.create({
  imageCell: {},
  imageCellText: {
    fontSize: 20,
    textAlignVertical: 'top',
  },
  image: {
    resizeMode: 'contain',
  },
  cell: {justifyContent: 'center'},
});

export default PayoutRow;
