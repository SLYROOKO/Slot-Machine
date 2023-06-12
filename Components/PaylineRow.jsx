import {DataTable} from 'react-native-paper';
import {View, StyleSheet, Image} from 'react-native';

const PaylineRow = ({idx}) => {
  return (

      <DataTable.Row>
        <DataTable.Cell>{idx + 1}</DataTable.Cell>
        <Image
        source={{
          uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
        }} style={{flex:1, height:100}}></Image>
      </DataTable.Row>


  );
};

const styles = StyleSheet.create({});

export default PaylineRow;
