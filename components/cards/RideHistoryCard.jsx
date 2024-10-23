import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import util from '../../util';
import { cores } from '../../cores';
import HeightSpacer from '../reusable/HeightSpacer';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RideHistoryCard = ({ride}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('rideHistoryDetail',{rideId:ride._id})} style={styles.container}>
       <Text style={{fontWeight:'bold'}}>{util.formataData(ride.data)}</Text>
       <HeightSpacer h={10}/>
       <View style={{flexDirection:'row',gap:5}}>
          <MaterialCommunityIcons name="map-marker-radius" size={18} color={cores.startMarker} />
          <Text>{ride.origem.address}</Text>
       </View>
       <View style={{width:'100%',alignItems:'center',marginBottom:5,marginTop:5}}>
        <FontAwesome6 name="arrow-down" size={18} color={cores.primary} />
       </View>
       <View style={{flexDirection:'row',gap:5}}>
       <MaterialCommunityIcons name="map-marker-radius" size={18} color={cores.finishMarker} />
          <Text>{ride.destino.address}</Text>
       </View>
       <HeightSpacer h={10}/>
       {ride.status===5?<Text style={{color:cores.startMarker,fontWeight:'bold'}}>Corrida finalizada</Text>:
       <Text style={{color:cores.vermelho,fontWeight:'bold'}}>Corrida cancelada pelo motorista</Text>}
    
    </TouchableOpacity>
  )
}

export default RideHistoryCard

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        justifyContent: 'space-between',
        alignItems:'flex-start',
        padding:10,
        borderRadius:10,
        marginBottom: 10,
       
     }
})