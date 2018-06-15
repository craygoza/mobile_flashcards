import { AsyncStorage } from 'react-native'
import React from 'react'
import { Notifications, Permissions } from 'expo'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

const dummyData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
                correctAnswer:'correct'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
                correctAnswer:'correct'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.',
                correctAnswer:'correct'
            }
        ]
    }
}


export function getDecks(){
console.log('getDecks()')
    return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export function deleteKey(){
    AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}

export function getDeck(deckId){
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then((data) => {
            return data[deckId]
        })
}

export function addCardToDeck(title, card) {
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(console.log(JSON.parse))
        .then((data) => {
            data = JSON.parse(data)

            data[title].questions.push(card)

            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))

            return data
        })
}

export function saveDeckTitle(title){

    const dataSave = createNewDeck(title)

    return  AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(console.log(JSON.parse))
        .then((data) => {
            console.log('data traida:' + data)

            if (data == null){
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({[title]: dataSave}))
            }
            else {
                AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                    [title]: dataSave,
                }))
            }

            return dataSave
        })
}

function createNewDeck(titleValue) {

    var obj = {
        title: titleValue,
        questions:[]
    };

    return obj
}

export function clearNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Do your daily test!',
        body: "👋 don't forget to perform your daily test!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Expo.Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(30)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}