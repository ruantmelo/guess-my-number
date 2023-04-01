import {View, Text, Pressable, StyleSheet} from "react-native"
import { COLORS } from "../../constants/colors"


export function PrimaryButton({children, onPress}){

    return (
        <View style={styles.buttonOuterContainer}>
        <Pressable onPress={onPress} style={({pressed}) => pressed ? [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer} android_ripple={{color: COLORS.primary600}}>
          
                <Text style={styles.buttonText}>{children}</Text>
            
        </Pressable>
        </View>
      
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    
    buttonInnerContainer: {
        backgroundColor: COLORS.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
    },

    pressed: {
        opacity: 0.75,
    }
})