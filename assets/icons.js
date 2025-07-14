import { Ionicons } from "@expo/vector-icons";

export const icons = {
    index: (props) => <Ionicons name='home-outline' size={24} color={props.color} {...props} />,
    calendar: (props) => <Ionicons name='calendar-outline' size={24} color={props.color} {...props} />,
    hello: (props) => <Ionicons name='heart-outline' size={24} color={props.color} {...props} />,
}