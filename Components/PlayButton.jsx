import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Constants from '../Constants';
import { useState } from 'react';

const PlayButton = (props) => {
    const [buttonDisable,setButtonDisable]=useState(false);

    const handleButtonPress = () => {
        setButtonDisable(true);
        props.action();
        setTimeout(() => {
            setButtonDisable(false);
        }, Constants.reelSpinDurationDelay*5+Constants.reelSpinMinDuration);
    }

    const styles = StyleSheet.create({

          PlayButtonText: {
            fontSize: Constants.windowHeight * 0.05,
            color: 'white',
            // fontFamily: 'ARCADECLASSIC',
            textAlignVertical: 'center',
            textAlign: 'center'}
    });
    
    return(
    buttonDisable?
        <TouchableOpacity
        style={  {backgroundColor:'red'} }>
        <Text style={styles.PlayButtonText}>
            SPINNING
            </Text>
        </TouchableOpacity>
    :
        <TouchableOpacity
        style={ {backgroundColor:'green'} } 
        disabled={buttonDisable}
        onPress={() => {handleButtonPress()}}>
        <Text style={styles.PlayButtonText}>
            PLAY
        </Text>
    </TouchableOpacity>)
};


export default PlayButton;
