import CircularProgress from 'react-native-circular-progress-indicator';
import { View } from 'react-native'

const CircularProgressBar = () => {
    let val = 5;
    return (
        <View className="font-spaceSemiBold justify-center p-8 pb-12 ">
            <CircularProgress
                value={59}
                progressValueStyle={{
                    fontSize: 43,
                    fontFamily:'SpaceGrotesk-Regular'
                }}
                inActiveStrokeColor={'#e5ebe8'}
                inActiveStrokeOpacity={0.2}
                progressValueColor={'#fff'}
                valueSuffix={'%'}
                duration={4000}
                radius={99}
                activeStrokeColor={'#f1f1f1de'}
                // activeStrokeSecondaryColor={'#eaefec'}
                activeStrokeWidth={13}
                inActiveStrokeWidth={13}
                // subtitle={`Loading...`}
                title={`${val} of 10 doses`}
                titleFontSize={16}
                titleStyle={{
                    fontFamily: 'SpaceGrotesk-SemiBold'
                }}
                rotation={-90}
            />

        </View>
    )
}

export default CircularProgressBar