import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { View, Text, Image, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { getLikeById, updateLike } from '../../../../services/posts'
import {throttle} from 'throttle-debounce'
import { openCommentModal } from '../../../../redux/actions/modal'
/**
 * Function that renders a component meant to be overlapped on
 * top of the post with the post info like user's display name and avatar
 * and the post's description
 * 
 * @param {Object} user that created the post 
 * @param {Object} post object 
 */
export default function PostSingleOverlay({ user, post }) {

    const [currentLikesState, setCurrentLikesState] = useState({ state: false, counter: post.likesCount })
    const navigation = useNavigation()
    const currentUser = useSelector((state)=> state.auth.currentUser)
    const dispatch = useDispatch()
    const handleUpdateLike = () => {
        setCurrentLikesState({ state: !currentLikesState.state, counter: currentLikesState.counter + (currentLikesState.state ? -1 : 1) })
        updateLike(post.id, currentUser.uid, currentLikesState.state)
    }

    useEffect(()=>{
        getLikeById(post.id, currentUser.uid).then((res)=>{
            setCurrentLikesState({  ...currentLikesState ,state: res })
        })
    },[])

    return (
        
        <View style={styles.container}>
            <View>
                <Text style={styles.displayName}>{user.displayName}</Text>
                <Text style={styles.description}>{post.description}</Text>
            </View>
            <View style={styles.leftContainer}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('profileOther', { initialUserID: user?.uid })}
                >
                    <Image style={styles.avatar} source={{ uri: user.photoURL }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleUpdateLike()}
                >
                    <Ionicons color={currentLikesState.state ? "red" : "white"} size={40} name="heart" />
                    <Text style={styles.actionButtonText}>{currentLikesState.counter}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => dispatch(openCommentModal(true, post))}
                >
                    <Ionicons color={"white"} size={40} name="chatbubble" />
                    <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
