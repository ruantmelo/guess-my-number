import { useState } from "react"
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native"
import { Card } from "../components/ui/Card"
import { InstructionText } from "../components/ui/InstructionText"
import { PrimaryButton } from "../components/ui/PrimaryButton"
import { Title } from "../components/ui/Title"
import { COLORS } from "../constants/colors"

export function  StartGameScreen({onPickedNumber}) {
    const {height, width} = useWindowDimensions()
    const [enteredNumber, setEnteredNumber] = useState('')

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText.replace(/[^0-9]/g, ''))
    }

    function resetInputHandler(){
        setEnteredNumber('')
    }

    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber)

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return
        }

        onPickedNumber(chosenNumber)
    }

    const marginTopDistance = height < 420 ? 30 : 100

    return (
        <ScrollView>
            <KeyboardAvoidingView style={styles.screen} behavior={"position"}>
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>
                        <TextInput onChangeText={numberInputHandler} value={enteredNumber} maxLength={2} autoCorrect={false} autoCapitalize="none" keyboardType="number-pad" style={styles.numberInput} />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler} >Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
      
    )
}



const styles = StyleSheet.create({
    screen:{
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: "center",
    },
   
    numberInput:{
        height: 50,
        width: 50,
        textAlign: "center",
        fontSize: 32,
        borderBottomColor: COLORS.accent500,
        borderBottomWidth: 2,
        color: COLORS.accent500,
        marginVertical: 8,
        fontWeight: "bold",
       
    },

    buttonsContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
    },

    buttonContainer:{
        flex: 1,
    }
})