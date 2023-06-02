import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Constants from '../Constants';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Sound from 'react-native-sound';
import SpinPlay from '../assets/sounds/SpinPlay.mp3';

const BottomBar = forwardRef((props,ref) => {
    const [buttonDisable,setButtonDisable]=useState(false);
    const [credits,setCredits]=useState(1000);
    const Paylines=[1,5,9,15,20];
    const [lineIndex,setLineIndex]=useState(4);
    const [freeSpins,setFreeSpins]=useState(0);


    Sound.setCategory('Playback');
    var SpinPlaySound = new Sound(SpinPlay, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
    });

    useEffect(() => {
        SpinPlaySound.setVolume(0.2);
        return () => {
            SpinPlaySound.release();
        }
    }, []);

    useImperativeHandle(ref, () => ({
        addCredits: (amount) => {
            setCredits(credits+amount);
        }
    }));

    const handleButtonPress = () => {
        setCredits(credits-Paylines[lineIndex]);
        props.getPaylineState.current=Paylines[lineIndex];
        SpinPlaySound.play();
        setButtonDisable(true);
        //disable changing paylines
        props.spinreel();
        setTimeout(() => {
            setButtonDisable(false);
        }, Constants.reelSpinDurationDelay*5+Constants.reelSpinMinDuration);
    }

    const styles = StyleSheet.create({
        PlayButtonText: {
            fontSize: Constants.windowHeight * 0.06,
            color: 'white',
            // fontFamily: 'ARCADECLASSIC',
            textAlignVertical: 'center',
            textAlign: 'center'},
        infoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: Constants.windowHeight * 0.15,
            backgroundColor: Constants.backgroundColor,
            },
        infoBox: {
            marginVertical: Constants.windowHeight * 0.01,
            backgroundColor: 'blue',
            fontSize: Constants.windowHeight * 0.05,
            color: 'white',
            // fontFamily: 'ARCADECLASSIC',
            textAlignVertical: 'center',
            textAlign: 'center',
            height: Constants.windowHeight * 0.1,
            marginHorizontal: Constants.windowWidth * 0.01,
            flex:1,
            },
    });
    
    return(
        <View style={styles.infoContainer}>
            <Text style={styles.infoBox}>Credits {credits}</Text>
            <Text style={styles.infoBox}>Lines {Paylines[lineIndex]}</Text>
            <Text style={styles.infoBox}>Free Spins {freeSpins} </Text>
            {buttonDisable || credits<Paylines[lineIndex]?
            <TouchableOpacity
                style={{marginHorizontal: Constants.windowWidth * 0.01,
                marginVertical: Constants.windowHeight * 0.01,
                flex:1,height: Constants.windowHeight * 0.1,backgroundColor:'gray'} }>
                <Text style={styles.PlayButtonText}>
                    SPIN
                </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
                style={{marginHorizontal: Constants.windowWidth * 0.01,
                    marginVertical: Constants.windowHeight * 0.01,
                    flex:1,height: Constants.windowHeight * 0.1,backgroundColor:'green'} } 
                disabled={buttonDisable}
                onPress={() => {handleButtonPress()}}>
                <Text style={styles.PlayButtonText}>
                    SPIN
                </Text>
            </TouchableOpacity>}
         </View>   

    );

});

export default BottomBar;