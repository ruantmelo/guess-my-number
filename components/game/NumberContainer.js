import { StyleSheet, Text, View, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

export function NumberContainer({children}){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: COLORS.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        margin: deviceWidth < 380 ? 12 : 24,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: COLORS.accent500,
        fontSize: deviceWidth < 380 ? 28 : 26,
        fontFamily: "open-sans-bold",
    },
})