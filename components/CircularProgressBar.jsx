import CircularProgress from 'react-native-circular-progress-indicator';
import { View } from 'react-native'

const CircularProgressBar = () => {
    let val = 75;
    return (
        <View className="font-spaceSemiBold p-8 pb-12 ">
            <CircularProgress
                value={13}
                inActiveStrokeColor={'#fbfdfc'}
                inActiveStrokeOpacity={0.3}
                progressValueColor={'#fff'}
                valueSuffix={'%'}
                radius={98}
                activeStrokeColor={'#ffffff'}
                activeStrokeSecondaryColor={'#eaefec'}
                activeStrokeWidth={10}
                subtitle={`Loading...`}
                titleStyle={{
                    fontSize: 5,
                }}
                rotation={-90}
            />

        </View>
    )
}

export default CircularProgressBar