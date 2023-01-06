import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'
import { getUserById } from '../../../../services/user'

export default function CommentItem({ item }) {

    const [commentUser, setCommentUser] = useState(null)

    useEffect(() => {
        getUserById(item.creator).then(setCommentUser)
    }, [])

    return (

        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{ uri: commentUser?.photoURL }}
            />
            <View style={styles.containerText}>
                <Text style={styles.displayName}>{commentUser?.displayName}</Text>
                <Text>{item.comment}</Text>
                

            </View>


        </View>
    )
}
