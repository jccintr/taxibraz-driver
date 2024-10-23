import { StyleSheet, Text, View,Linking,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../cores'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TalkButton = ({telefone}) => {
  const mensagem = 'Olá, você solicitou uma corrida no Taxi Braz';


  const onButtonPress = () => {
    Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
  }


  return (
    <TouchableOpacity style={styles.container} onPress={onButtonPress}>
      <FontAwesome name="whatsapp" size={30} color={cores.whats} />
      <Text style={{fontSize:10,color:cores.whats}}>Converse com o passageiro</Text>
    </TouchableOpacity>
  )
}

export default TalkButton

const styles = StyleSheet.create({
    container:{
      alignItems:'center',
      justifyContent:'center',
      borderRadius:100,
  },
  
})