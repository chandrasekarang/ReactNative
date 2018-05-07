import React from 'react';
import {StyleSheet, View} from 'react-native';

const BoxComponent = ({color}) => (
    <View style={[styles.boxes,{backgroundColor:color}]}></View>
);

const styles = StyleSheet.create({
    boxes: {        
        height: 125
    }
});

export default BoxComponent;

