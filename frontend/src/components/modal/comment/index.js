import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { addComment, clearCommentListener, commentListener } from '../../../services/posts'
import CommentItem from './item'
export default function CommentModal({ post }) {

    const currentUser = useSelector(state => state.auth.currentUser)

    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])

    const handleCommentSent = () => {
        if (comment.length == 0) return
        addComment(post.id, currentUser.uid, comment)
        setComment('')
    }

    useEffect(() => {
        commentListener(post.id, setCommentList)

        return () => clearCommentListener()
    }, [])

    const renderItem = ({ item }) => {
        return (<CommentItem item={item} />)
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>

                    <View>
                        <View style={styles.containerInput}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: currentUser.photoURL }}
                            />
                            <TextInput
                                style={styles.input}
                                value={comment}
                                onChangeText={setComment}
                            />
                            <TouchableOpacity
                                onPress={() => handleCommentSent()}
                            >
                                <Ionicons name="arrow-up-circle" size={34} color={'crimson'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <FlatList
                            data={commentList}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}

                        />

                    </View>


                </>



            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>

    )
}
