import {DataTable} from 'react-native-paper';
import {StyleSheet, Image} from 'react-native';
import {PaylineImages} from '../Global/Images';

const PaylineRow = ({idx}) => {
  const getPaylineImage = (idx) => {
    switch (idx + 1) {
      case 1:
        return PaylineImages[1];
      case 2:
        return PaylineImages[2];
      case 3:
        return PaylineImages[3];
      case 4:
        return PaylineImages[4];
      case 5:
        return PaylineImages[5];
      case 6:
        return PaylineImages[6];
      case 7:
        return PaylineImages[7];
      case 8:
        return PaylineImages[8];
      case 9:
        return PaylineImages[9];
      case 10:
        return PaylineImages[10];
      case 11:
        return PaylineImages[11];
      case 12:
        return PaylineImages[12];
      case 13:
        return PaylineImages[13];
      case 14:
        return PaylineImages[14];
      case 15:
        return PaylineImages[15];
      case 16:
        return PaylineImages[16];
      case 17:
        return PaylineImages[17];
      case 18:
        return PaylineImages[18];
      case 19:
        return PaylineImages[19];
      case 20:
        return PaylineImages[20];

    }
  };

  return (
    <DataTable.Row>
      <DataTable.Cell>{idx + 1}</DataTable.Cell>
      <Image source={getPaylineImage(idx)} style={{flex:1,height:200, resizeMode:'contain'}}s></Image>
    </DataTable.Row>
  );
};

const styles = StyleSheet.create({});

export default PaylineRow;
