import firebase from 'firebase'
import { getUserById } from './user';

/**
 * Returns all the posts in the database.
 * 
 * @returns {Promise<[<Object>]>} post list if successful.
 */
export const getFeed = () => new Promise((resolve, reject) => {
    let posts = []
    firebase
        .firestore()
        .collection('post')
        .get()
        .then((res) => {
            let posts = res.docs.map((value) => {
                const id = value.id;

                const data = value.data();
                return { id, ...data }
            })
            resolve(posts)
        })
})

export const getPostsByUserId = (uid = firebase.auth().currentUser.uid) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('post')
        .where('creator', '==', uid)
        .orderBy('creation', 'desc')
        .onSnapshot((snapshot) => {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data }
            })
            resolve(posts)

        })
})

export const getLikeById = (postId, uid) => new Promise((resolve, reject) => {

    firebase.firestore()
        .collection('post')
        .doc(postId)
        .collection('likes')
        .doc(uid)
        .get()
        .then((res) => {
            resolve(res.exists)
        })
})

export const updateLike = (postId, uid, currentLikesState) => new Promise((resolve, reject) => {
    if(currentLikesState){
        firebase.firestore()
        .collection('post')
        .doc(postId)
        .collection('likes')
        .doc(uid)
        .delete()
    }
    else{
        firebase.firestore()
        .collection('post')
        .doc(postId)
        .collection('likes')
        .doc(uid)
        .set({})
    }
   
})