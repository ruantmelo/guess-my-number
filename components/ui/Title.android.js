import { StyleSheet, Text, Platform } from "react-native";

export function Title({children}){
    return <Text style={styles.title}>{children}</Text>
}

export const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
       
        color: "#ddb52f",
        textAlign: "center",
        borderWidth: 2,
        borderColor: "#ddb52f",
        padding: 12,
        maxWidth: '80%',
        width: 300,
    }
})