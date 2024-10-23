import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import util from '../../util';
import Stars from '../Stars';
import NetworkImage from '../reusable/NetworkImage';
import HeightSpacer from '../reusable/HeightSpacer';
import { cores } from '../../cores';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const RideDetailPanel = ({ride}) => {
    
  return (
    <View style={styles.container}>
        <Text>{util.formataData(ride.data)}</Text>
        <HeightSpacer h={10}/>
        <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
            {ride.passenger.avatar==null?'':<NetworkImage source={ride.passenger.avatar} width={50} height={50} radius={40}/>}
            <View style={{gap:5}}>
                <Text style={{fontWeight:'bold'}}>{ride.passenger.name}</Text>
                <Stars stars={ride.passenger.rating} showNumber={true}/>
            </View>
        </View>
        <HeightSpacer h={10}/>
        <View style={{flexDirection:'row',gap:5}}>
            <MaterialCommunityIcons name="map-marker-radius" size={18} color={cores.startMarker} />
            <Text>{ride.origem.address}</Text>
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
            <FontAwesome6 name="arrow-down" size={18} color={cores.primary} />
         </View>
        <View style={{flexDirection:'row',gap:5}}>
        <MaterialCommunityIcons name="map-marker-radius" size={18} color={cores.finishMarker} />
            <Text>{ride.destino.address}</Text>
        </View>
        <HeightSpacer h={20}/>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderRadius:5,backgroundColor:'#e1e1e1',padding:5}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                <MaterialCommunityIcons name="map-marker-distance" size={18} color={cores.primary} />
                <Text style={{color:cores.primary,fontWeight:'bold',fontSize:14}}>{util.distancia(ride.distancia)}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                <Ionicons name="timer-outline" size={18} color={cores.primary} />
                <Text style={{color:cores.primary,fontWeight:'bold',fontSize:14}}>{util.duracao(ride.duracao)}</Text>
            </View>
            <Text style={{color:cores.primary,fontWeight:'bold',fontSize:14}}>{ride.pagamento.nome}</Text>
            <Text style={{color:cores.primary,fontWeight:'bold',fontSize:14}}>R$ {ride.valor.toFixed(2)}</Text>
        </View>
    </View>
  )
}

export default RideDetailPanel

const styles = StyleSheet.create({
    container:{
     borderTopWidth:1,
     paddingHorizontal: 10
    }
})