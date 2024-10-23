import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons,FontAwesome,Octicons,MaterialCommunityIcons } from '@expo/vector-icons';
import {cores} from '../../cores';
import Stars from '../Stars';
import util from '../../util';
import NetworkImage from '../reusable/NetworkImage';
import HeightSpacer from '../reusable/HeightSpacer';
//import { RidesContext } from '../../context/RidesContext';
import { useNavigation } from '@react-navigation/native';

// const formataData = (d) => {

//     const data = new Date(d);
//     return data.toLocaleDateString() + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

// }

const RideCard = ({ride}) => {
 
  const navigation = useNavigation();
 // const {setRide} = useContext(RidesContext);

  const onRidePress = () => {
    

     navigation.navigate('rideDetail',{ride});
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onRidePress}>
      <Text>{util.formataData(ride.data)}</Text>
      <HeightSpacer h={5}/>
      <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
           {ride.passenger.avatar==null?'':<NetworkImage source={ride.passenger.avatar} width={50} height={50} radius={40}/>}
           <View style={{gap:5}}>
               <Text style={{fontWeight:'bold'}}>{ride.passenger.name}</Text>
               <Stars stars={ride.passenger.rating} showNumber={true}/>
           </View>
      </View>
     
      <HeightSpacer h={5}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderRadius:5,backgroundColor:'#e1e1e1',padding:5,borderRadius:5}}>
           <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
             <MaterialCommunityIcons name="map-marker-distance" size={18} color={cores.primary} />
             <Text style={{color:cores.primary,fontWeight:'bold',fontSize:14}}>{util.distancia(ride.distancia)}</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
             <Ionicons name="timer-outline" size={18} color={cores.primary} />
             <Text style={{color:cores.primary,fontWeight:'bold',fontSize:14}}>{util.duracao(ride.duracao)}</Text>
           </View>
           <Text style={{color:cores.primary,fontWeight:'bold',fontSize:14}}>R$ {ride.valor.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default RideCard

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    marginBottom:8,
    borderWidth:0.5,
    borderColor: "#d3d3d3",
    borderRadius:5,
    padding:10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width:0, height:3},
    shadowOpacity: 0.17,
    shadowRadius:3.05,
    elevation:3,
  }
})