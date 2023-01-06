import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerInput:{
        padding: 20,
        flexDirection: 'row'
    },
    avatar: {
       height: 32,
       width: 32,
       borderRadius: 16
    },
    input:{
        backgroundColor: 'lightgray',
        flex: 1,
        borderRadius: 4,
        marginHorizontal: 10,
        paddingHorizontal: 10
    }
})

export default styles