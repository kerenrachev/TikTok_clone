import { Video } from 'expo-av'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { useUser } from '../../../hooks/useUser'
import PostSingleOverlay from './overlay'
import styles from './styles'
import { getUserById } from '../../../services/user'

/**
 * This component is responsible for displaying a post and play the 
 * media associated with it.
 * 
 * The ref is forwarded to this component so that the parent component
 * can manage the play status of the video.
 */
export const PostSingle = forwardRef(({ item }, parentRef) => {
    const ref = useRef(null);
    //const user = useUser(item.creator)
    const [user, setUser] = useState(null)
    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop
    }))

    useEffect(() => {
        getUserById(item.creator).then(setUser)
        return () => unload();
    }, [item])

    /**
     * Plays the video in the component if the ref
     * of the video is not null.
     * 
     * @returns {void} 
     */
    const play = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already playing return
        const status = await ref.current.getStatusAsync();
        if (status?.isPlaying) {
            return;
        }
        try {
            await ref.current.playAsync();
        } catch (e) {
            console.log(e)
        }
    }


    /**
     * Stops the video in the component if the ref
     * of the video is not null.
     * 
     * @returns {void} 
     */
    const stop = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already stopped return
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) {
            return;
        }
        try {
            await ref.current.stopAsync();
        } catch (e) {
            console.log(e)
        }
    }


    /**
     * Unloads the video in the component if the ref
     * of the video is not null.
     * 
     * This will make sure unnecessary video instances are
     * not in memory at all times 
     * 
     * @returns {void} 
     */
    const unload = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already stopped return
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e)
        }
    }
    if(user === null) return <></>
    return (
        <>
            <PostSingleOverlay user={user} post={item} />
            <Video
                ref={ref}
                style={styles.container}
                resizeMode="cover"
                shouldPlay={false}
                isLooping
                usePoster
                posterSource={{ uri: item.media[1] }}
                posterStyle={{ resizeMode: 'cover', height: '100%' }}
                source={{ uri: item.media[0] }} />
        </>
    )
})

export default PostSingle