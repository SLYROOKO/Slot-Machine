import React from 'react';
import {View, Image} from 'react-native';
import TileImages from '../Images';
import Constants from '../Constants';

const Tile = (props: any) => {
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
        return TileImages.LootBox;
      case 11:
        return TileImages.Pachimari;
      case 12:
        return TileImages.WreckingBall;
      default:
        return TileImages.Wild;
    }
  };

  return (
    <View>
      <Image source={getTileImage()}></Image>
    </View>
  );
};

export default Tile;
