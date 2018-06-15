import React from 'react';
import {StatusBar, StyleSheet, Text, Platform, View} from 'react-native';
import {fuccia, lightgray, white} from "./utils/colors";
import { Constants } from 'expo'
import FlashCardsMain from "./components/FlashCardsMain";
import AddDeck from "./components/AddDeck";
import { createStackNavigator } from 'react-navigation';
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import QuizView from "./components/QuizView";
import DecisionButton from "./components/DecisionButton";
import * as StorageAPI from "./utils/StorageAPI";

function FlashCardsStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Home = ({ navigation }) => (
    <View style={styles.MainContainer} >
        <View style={styles.DeckListContainer}>
            <FlashCardsMain navigation={navigation} />
        </View>
        <View style={styles.CreateDeckContainer}>
            <DecisionButton type={'correct'}  onPress={() => navigation.navigate('AddDeck')}>
                <Text style={styles.nextButtonText}>Create New Deck</Text>
            </DecisionButton>
        </View>
    </View>
);

const MainNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Flashcards',
            headerTintColor: fuccia,
            headerStyle: {
                backgroundColor: white,
            }
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: 'Add New Deck',
            headerTintColor: fuccia,
            headerStyle: {
                backgroundColor: white,
            }
        }
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            title: 'Deck Information',
            headerTintColor: fuccia,
            headerStyle: {
                backgroundColor: white,
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add New Card',
            headerTintColor: fuccia,
            headerStyle: {
                backgroundColor: white,
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: fuccia,
            headerStyle: {
                backgroundColor: white,
            }
        }
    }
})

class App extends React.Component {
   componentDidMount(){
       StorageAPI.setNotification()
   }

  render() {
    return (
      <View style={{flex: 1 }}>
        <FlashCardsStatusBar backgroundColor={fuccia} barStyle="light-content" />
        <MainNavigator/>
      </View>
    );
  }
}
export default App

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DeckListContainer: {
        flex:5,
        backgroundColor: lightgray,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:2,
        borderRadius:10
    },
    CreateDeckContainer: {
        flex:1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerBtn: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    nextButtonText: {
        fontSize: 18,
        color: 'white',
    }
});
