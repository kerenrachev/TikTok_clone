import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'



export default function SearchUserItem({ item }) {
    const navigation = useNavigation()    
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('profileOther', { initialUserID: item?.uid })}
        >
            <Text style={styles.text}>{item.displayName}</Text>
            <Image style={styles.image} source={{ uri: item.photoURL }} />
        </TouchableOpacity>
    )
}
