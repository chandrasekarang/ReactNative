import React from 'react';
import {StyleSheet, View} from 'react-native';

const BlueBoxComponent = ({color}) => (
    <View style={styles.blueView}>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
        <View style={[styles.blueBoxes,{backgroundColor:color}]}></View>
    </View>
);

const styles = StyleSheet.create({
    blueView:{
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    blueBoxes: {        
        height: 100,
        width: 100,
        margin: 2,
        flexGrow: 1
    }
});

export default BlueBoxComponent;

