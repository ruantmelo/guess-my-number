
import { StyleSheet, ImageBackground , SafeAreaView } from 'react-native';
import { StartGameScreen } from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { GameScreen } from './screens/GameScreen';
import { COLORS } from './constants/colors';
import { GameOverScreen } from './screens/GameOverScreen';
import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

 
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if(!fontsLoaded){
    return null;
  }

  function pickedNumberHandler(number){
    setUserNumber(number)
    setGameIsOver(false)
  }

  function gameOverHandler(guessRounds){
    setGameIsOver(true)
    setGuessRounds(guessRounds)
  }

  function startNewGameHandler(){
    setUserNumber(null)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />

  if(userNumber){
    screen = <GameScreen onGameOver={gameOverHandler} userNumber={userNumber} />
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} onStartNewGame={startNewGameHandler} roundsNumber={guessRounds}  />
  }

 

  return (
    <>
    <StatusBar style="light" />
    <LinearGradient onLayout={onLayoutRootView} colors={[COLORS.primary700, COLORS.accent500, ]} style={styles.rootScreen}>
      <ImageBackground imageStyle={styles.backgroundImage} style={styles.rootScreen} resizeMode='cover' source={require('./assets/images/background.png')}>
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
        
      </ImageBackground>
    </LinearGradient>
    </>
   
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});
