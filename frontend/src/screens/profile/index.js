import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './styles'
import ProfileNavBar from '../../components/profile/navBar'
import ProfileHeader from '../../components/profile/header'
import ProfilePostList from '../../components/profile/postList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CurrentUserProfileItemInViewContext } from '../../navigation/feed'
import { useUser } from '../../hooks/useUser'
import { getPostsByUserId } from '../../services/posts'
import { getUserById } from '../../services/user'


export default function ProfileScreen({route}) {

    const {initialUserID} = route.params
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    let providerUserId = null

    if(initialUserID == null){
        providerUserId = useContext(CurrentUserProfileItemInViewContext)
    }
    else {
        providerUserId = initialUserID
    }
    
    useEffect(()=>{
        getUserById(providerUserId).then((userRes)=>{
            if(userRes === undefined) return;
            setUser(userRes)
            getPostsByUserId(userRes.uid).then(setUserPosts)
        })
        
    },[providerUserId])

    if(user === undefined || user === null) return <Text>NO USER IN CONTEXT!!</Text>
    return (
        <View style={styles.container}>
            <ProfileNavBar user={user} />
            <ScrollView>
                <ProfileHeader user={user} />
                <ProfilePostList posts={userPosts} />
            </ScrollView>
        </View>
    )
}
