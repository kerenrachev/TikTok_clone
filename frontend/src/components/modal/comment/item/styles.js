import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        padding: 20,
        flexDirection: 'row',
        flex: 1,
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 16
    },
    containerText:{
        marginHorizontal: 14
    },
    displayName:{
        color: 'gray',
        fontSize: 13,
        marginBottom: 2
    }
})

export default styles