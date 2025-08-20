import CircularProgress from 'react-native-circular-progress-indicator';
import { View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../app/_layout'; // your ThemeContext

const CircularProgressBar = () => {
    const { isDark } = useContext(ThemeContext); // correct name from RootLayout
    let val = 7;

    return (
        <View className="font-spaceSemiBold justify-center p-8 pb-12">
            <CircularProgress
                value={70}
                progressValueStyle={{
                    fontSize: 43,
                    fontFamily: 'SpaceGrotesk-SemiBold',
                    color: isDark ? '#fff' : '#000' // dynamic text color
                }}
                inActiveStrokeColor={isDark ? '#555555' : '#e5ebe8'}
                inActiveStrokeOpacity={0.2}
                valueSuffix={'%'}
                duration={4000}
                radius={99}
                activeStrokeColor={isDark ? '#bb86fc' : '#f1f1f1de'}
                activeStrokeWidth={13}
                inActiveStrokeWidth={13}
                title={`${val} of 10 doses`}
                titleFontSize={16}
                titleStyle={{
                    fontFamily: 'SpaceGrotesk-SemiBold',
                    color: isDark ? '#fff' : '#000' // dynamic title color
                }}
                rotation={-90}
            />
        </View>
    );
};

export default CircularProgressBar;
