import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {Feather} from '@expo/vector-icons'
import { Avatar } from 'react-native-paper'
import { buttonStyles } from '../../../styles'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { changeFollowingState, getIsFollowing } from '../../../services/user'
import { signout } from '../../../redux/actions/auth'

export default function ProfileHeader({ user }) {

    const dispatch = useDispatch()
    const currentLoggedInUser = useSelector((state) => state.auth.currentUser)
    const navigation = useNavigation()


    const [followingCount, setFollowingCount] = useState(0)
    const [followersCount, setFollowersCount ] = useState(0)
    const [isFollowing, setIsFollowing ] = useState(false)

    useEffect(()=>{
        getIsFollowing(currentLoggedInUser.uid, user.uid).then(setIsFollowing)
    },[])

    const handleChangeFollowingState = () =>{
        changeFollowingState(user.uid, isFollowing).then(setIsFollowing)
    }

    const handleLogOut = () => {
        dispatch(signout())
    }


    const renderFollowButton = () => {
        
        if (isFollowing) {
            return (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={buttonStyles.grayOutlinedButton}
                    >
                        <Text style={buttonStyles.grayOutlinedButtonText}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={buttonStyles.grayOutlinedIconButton}
                        onPress={()=>handleChangeFollowingState()}
                    >
                        <Feather name='user-check' size={20}/>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity
                    style={buttonStyles.filledButton}
                    onPress={()=>handleChangeFollowingState()}
                >
                    <Text style={buttonStyles.filledButtonText}>Follow</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Avatar.Icon size={80} icon={"account"} />
            <Text style={styles.emailText}>{user.email}</Text>
            <View style={styles.counterContainer}>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user.followingCount}</Text>
                    <Text style={styles.counterLabelText}>Following</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user.followersCount}</Text>
                    <Text style={styles.counterLabelText}>Followers</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user.likesCount}</Text>
                    <Text style={styles.counterLabelText}>Likes</Text>
                </View>
            </View>

            {currentLoggedInUser.uid === user.uid ?
               <>
               
               <TouchableOpacity
                    style={buttonStyles.grayOutlinedButton}
                    onPress={() => navigation.navigate('editProfile')}
                >
                    
                    <Text>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={buttonStyles.grayOutlinedButton}
                    onPress={() => handleLogOut()}
                >
                    
                    <Text>Logout (temp)</Text>
                </TouchableOpacity>
               </>
                : renderFollowButton()}

        </View>
    )
}
