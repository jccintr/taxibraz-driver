import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NetworkImage from '../reusable/NetworkImage'
import Stars from '../Stars'


const PassengerCard = ({passenger}) => {
    return (
        <View style={styles.container}>
    
            <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
                  {passenger.avatar==null?'':<NetworkImage source={passenger.avatar} width={50} height={50} radius={40}/>}
                  <View style={{gap:5}}>
                      <Text style={{fontWeight:'bold'}}>{passenger.name}</Text>
                      <Stars stars={passenger.rating} showNumber={true}/>
                  </View>
            </View>
           
        </View>
      )
    }

export default PassengerCard

const styles = StyleSheet.create({
    container:{
       flexDirection:'row',
       justifyContent: 'space-between',
       alignItems:'center'
    }
})