import React, { createContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from '../../screens/feed';
import ProfileScreen from '../../screens/profile';

const { Screen, Navigator } = createMaterialTopTabNavigator()

export const CurrentUserProfileItemInViewContext = createContext(null)


export default function FeedNavigation() {

    const [currentUserProfileItemInView, setCurrentUserProfileItemInView] = useState(null)

    return (
        <CurrentUserProfileItemInViewContext.Provider value={currentUserProfileItemInView}>
            <Navigator
                initialRouteName='feedList'
                tabBar={() => <></>}
            >
                <Screen
                    name="feedList"
                    component={FeedScreen}
                    initialParams={{ setCurrentUserProfileItemInView, profile: false }}
                />
                <Screen
                    name="feedProfile"
                    component={ProfileScreen}
                    initialParams={{ initialUserID: null }}
                />
            </Navigator>


        </CurrentUserProfileItemInViewContext.Provider>


    )
}
