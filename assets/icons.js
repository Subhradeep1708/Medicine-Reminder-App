import { Ionicons } from "@expo/vector-icons";

export const icons = {
    index: (props) => <Ionicons name='home-outline' size={24} color={props.color} {...props} />,
    calendar: (props) => <Ionicons name='calendar-outline' size={24} color={props.color} {...props} />,
    profile: (props) => <Ionicons name='person-circle-outline' size={24} color={props.color} {...props} />,
    allMeds: (props) => <Ionicons name='medical-outline' size={24} color={props.color} {...props} />,
}