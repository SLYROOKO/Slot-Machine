import { View, Image, StyleSheet } from 'react-native';
import TileImages from '../Images';

const Tile = (props) => {
  const getTileImage = () => {
    switch (props.tileType) {
      case 1:
        return TileImages.Ana;
      case 2:
        return TileImages.Dva;
      case 3:
        return TileImages.Genji;
      case 4:
        return TileImages.Lucio;
      case 5:
        return TileImages.Mcree;
      case 6:
        return TileImages.Mercy;
      case 7:
        return TileImages.Reinhardt;
      case 8:
        return TileImages.Sombra;
      case 9:
        return TileImages.Widow;
      case 10:
        return TileImages.Pachimari;
      case 11:
        return TileImages.WreckingBall;
      default:
        return TileImages.LootBox;
        
    }
  };
  
  const styles = StyleSheet.create({
    tile: {
      backgroundColor: 'black',
    },
    image: {
      width: props.width,
      height: props.height,
      resizeMode: 'stretch',
    },
  });

  return (
    <View style={styles.tile}>
      <Image style={styles.image} source={getTileImage()}></Image>
    </View>
  );
};

export default Tile;
