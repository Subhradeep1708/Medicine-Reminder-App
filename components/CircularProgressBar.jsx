import CircularProgress from 'react-native-circular-progress-indicator';
import { View } from 'react-native';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../app/_layout'; // your ThemeContext
import { MEDICINE_CONSTANTS, THEME_COLORS } from '../constants/medicine';

/**
 * CircularProgressBar - Displays a circular progress indicator for medication adherence
 * @param {number} currentDoses - Number of doses taken (default: 7)
 * @param {number} totalDoses - Total number of doses required (default: 10)
 */
const CircularProgressBar = ({ 
    currentDoses = MEDICINE_CONSTANTS.PROGRESS.DEFAULT_CURRENT_DOSES, 
    totalDoses = MEDICINE_CONSTANTS.PROGRESS.DEFAULT_TOTAL_DOSES 
}) => {
    const { isDark } = useContext(ThemeContext); // correct name from RootLayout
    const progressPercentage = Math.round((currentDoses / totalDoses) * 100);

    return (
        <View className="font-spaceSemiBold justify-center p-8 pb-12">
            <CircularProgress
                value={progressPercentage}
                progressValueStyle={{
                    fontSize: MEDICINE_CONSTANTS.UI.FONT_SIZE.title,
                    fontFamily: 'SpaceGrotesk-SemiBold',
                    color: isDark ? THEME_COLORS.DARK.text : THEME_COLORS.LIGHT.text
                }}
                inActiveStrokeColor={isDark ? THEME_COLORS.DARK.inactive_stroke : THEME_COLORS.LIGHT.inactive_stroke}
                inActiveStrokeOpacity={0.2}
                valueSuffix={'%'}
                duration={MEDICINE_CONSTANTS.PROGRESS.ANIMATION_DURATION}
                radius={MEDICINE_CONSTANTS.PROGRESS.RADIUS}
                activeStrokeColor={isDark ? THEME_COLORS.DARK.active_stroke : THEME_COLORS.LIGHT.active_stroke}
                activeStrokeWidth={MEDICINE_CONSTANTS.PROGRESS.STROKE_WIDTH}
                inActiveStrokeWidth={MEDICINE_CONSTANTS.PROGRESS.STROKE_WIDTH}
                title={`${currentDoses} of ${totalDoses} doses`}
                titleFontSize={MEDICINE_CONSTANTS.UI.FONT_SIZE.subtitle}
                titleStyle={{
                    fontFamily: 'SpaceGrotesk-SemiBold',
                    color: isDark ? THEME_COLORS.DARK.text : THEME_COLORS.LIGHT.text
                }}
                rotation={-90}
            />
        </View>
    );
};

CircularProgressBar.propTypes = {
    currentDoses: PropTypes.number,
    totalDoses: PropTypes.number,
};

export default CircularProgressBar;
