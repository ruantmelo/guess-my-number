import { StyleSheet, View, Dimensions } from "react-native"
import { COLORS } from "../../constants/colors"

export function Card({children}){
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
   card: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginHorizontal: 24,
        borderRadius: 8,
        marginTop: deviceWidth < 380 ? 18 : 36,
        backgroundColor: COLORS.primary700 ,

        elevation: 4, // Android
        
        shadowColor: 'black', // iOS
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
   }
})