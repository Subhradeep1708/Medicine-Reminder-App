import CircularProgress from 'react-native-circular-progress-indicator';
import { View, Text } from 'react-native'
import React from 'react'

const CircularProgressBar = () => {
    let val = 75;
    return (
        <>
            <Text>CircularProgressBar</Text>
            <CircularProgress
                value={75}
                inActiveStrokeColor={'#2ecc71'}
                inActiveStrokeOpacity={0.2}
                progressValueColor={'#fff'}
                valueSuffix={'%'}
                radius={80}
                activeStrokeColor={'#2ecc71'}
                activeStrokeSecondaryColor={'#27ae60'}
                activeStrokeWidth={20}
                subtitle={`Loading... ${val}`}
                />
            
        </>
    )
}

export default CircularProgressBar