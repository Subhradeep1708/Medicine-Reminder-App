import CircularProgress from 'react-native-circular-progress-indicator';
import { View } from 'react-native'

const CircularProgressBar = () => {
    let val = 5;
    return (
        <View className="font-spaceSemiBold p-8 pb-12 ">
            <CircularProgress
                value={73}
                progressValueStyle={{
                    fontSize: 28,}}
                inActiveStrokeColor={'#e5ebe8'}
                inActiveStrokeOpacity={0.2}
                progressValueColor={'#fff'}
                valueSuffix={'%'}
                duration={2000}
                radius={98}
                activeStrokeColor={'#f1f1f1de'}
                // activeStrokeSecondaryColor={'#eaefec'}
                activeStrokeWidth={10}
                // subtitle={`Loading...`}
                title={`${val} of 10 doses`}
                titleFontSize={15}
                titleStyle={{
                    // fontSize: 20,
                }}
                rotation={-90}
            />

        </View>
    )
}

export default CircularProgressBar