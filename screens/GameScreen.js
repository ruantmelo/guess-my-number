import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { NumberContainer } from "../components/game/NumberContainer";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";

import { Ionicons } from '@expo/vector-icons'
import { GuessLogItem } from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
}

let minBoundary = 1
let maxBoundary = 100

export function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length)
        }
    })

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    function nextGuessHandler(direction){ // direction is either 'lower' or 'greater'
        
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
           
            Alert.alert("Don't lie!", 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}])
            return;
        }
        
        if (direction === 'lower') {
            maxBoundary = currentGuess 
        } else {
            minBoundary = currentGuess + 1
        }
        
        const newRoundNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRoundNumber)
        setGuessRounds(guessRounds => [newRoundNumber, ...guessRounds])
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>

            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}> 
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>

            <View style={styles.listContainer}>
                {/* {guessRounds.map((guess, index) => <Text key={guess}>{guess}</Text>)} */}
                <FlatList keyExtractor={item => item} data={guessRounds} renderItem={(itemData) => <GuessLogItem roundNumber={guessRounds.length - itemData.index} guess={itemData.item}/>} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12,
        paddingTop: 36,
    },

    instructionText: {
        marginBottom: 12,
    },

    buttonsContainer: {
        flexDirection: 'row',
    },

    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
    
})