const functions = require("firebase-functions");


const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()
exports.newUser = functions.auth.user().onCreate((user) => {

    return db.collection("user")
        .doc(user.uid)
        .create({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            followingCount: 0,
            followersCount: 0,
            likesCount: 0
        })
})


exports.likeCreate = functions.firestore.document('post/{id}/{type}/{uid}').onCreate((_, context) => {
    let updateObj = {}
    if (context.params.type == 'comments') {
        updateObj = {
            commentsCount: admin.firestore.FieldValue.increment(1)
        }
    }
    if (context.params.type == 'likes') {
        updateObj = {
            likesCount: admin.firestore.FieldValue.increment(1)
        }
    }
    return db
        .collection("post")
        .doc(context.params.id)
        .update(updateObj)
})

exports.likeDelete = functions.firestore.document('post/{id}/{type}/{uid}').onDelete((_, context) => {
    let updateObj = {}
    if (context.params.type == 'comments') {
        updateObj = {
            commentsCount: admin.firestore.FieldValue.increment(-1)
        }
    }
    if (context.params.type == 'likes') {
        updateObj = {
            likesCount: admin.firestore.FieldValue.increment(-1)
        }
    }
    return db
        .collection("post")
        .doc(context.params.id)
        .update(updateObj)
})


exports.followCreated = functions.firestore.document('user/{id}/following/{uid}').onCreate((_, context) => {

    return db
        .collection("user")
        .doc(context.params.id)
        .update({
            followingCount: admin.firestore.FieldValue.increment(1)
        })
        .then(() => {
            db
                .collection("user")
                .doc(context.params.uid)
                .update({
                    followersCount: admin.firestore.FieldValue.increment(1)
                })
        })
})

exports.followDeleted = functions.firestore.document('user/{id}/following/{uid}').onDelete((_, context) => {

    return db
        .collection("user")
        .doc(context.params.id)
        .update({
            followingCount: admin.firestore.FieldValue.increment(-1)
        }).then(() => {
            db
                .collection("user")
                .doc(context.params.uid)
                .update({
                    followersCount: admin.firestore.FieldValue.increment(-1)
                })
        })
})
