import React from 'react'
import { Text, View } from 'react-native'

const Header = ({text}) => {
    return (
        <View style={{marginTop : 35, backgroundColor: "#6200ee", borderRadius : 2}}>
            <Text style={{textAlign : 'center', fontSize: 25, padding :10, color : "white"}}>{text}</Text>
        </View>
    )
}

export default Header
