import React, { useState, useEffect,useRef,useContext } from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { LocationContext } from '../context/LocationContext';
import { AuthContext } from '../context/AuthContext';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from './../constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RideBottomSheet from '../components/RideBottomSheet';
import { cores } from '../cores';
import { RidesContext } from '../context/RidesContext';
import { Octicons,MaterialCommunityIcons,Ionicons,FontAwesome } from '@expo/vector-icons';
import util from '../util';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalCancelRide from '../components/modals/ModalCancelRide';




const Ride = ({navigation}) => {
  const {apiToken} = useContext(AuthContext);
  const {activeRide,setActiveRide,rides,setRides} = useContext(RidesContext);
  const {location,setLocation} = useContext(LocationContext);
  const mapRef = useRef();
  const rideBottomSheetRef = useRef(); 
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingCancel,setIsLoadingCancel] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [motivoCancelamento,setMotivoCancelamento] = useState('');


  useEffect(()=>{

    if(activeRide.status>3){
      rideBottomSheetRef.current.snapToIndex(0);
    }

 },[activeRide]);


 useEffect(()=>{
  const interval = setInterval(()=>{
     uploadDriverPosition();
  },10000);
  return ()=>clearInterval(interval);

});

 const uploadDriverPosition = async () => {

    let pos = await Location.getCurrentPositionAsync({});
    setLocation(pos);
    console.log("Atualizou driver position from ride: " + 'lat: ' + pos.coords.latitude + ' lng: '+ pos.coords.longitude + ' ' + new Date());
    const response = await api.sendLocation(apiToken,pos.coords.latitude,pos.coords.longitude);
    

}


const onWay = async () => {

   setIsLoading(true);
   const response = await api.onWayRide(apiToken,activeRide._id);
   if(response.status===200){
     const jsonRide = await response.json();
     setActiveRide(jsonRide);
   }
   setIsLoading(false);

}

const arrived = async () => {

  setIsLoading(true);
  const response = await api.arrivedRide(apiToken,activeRide._id);
  if(response.status===200){
    const jsonRide = await response.json();
    setActiveRide(jsonRide);
  }
  setIsLoading(false);


}

const started = async () => {

  setIsLoading(true);
  let pos = await Location.getCurrentPositionAsync({});
  const response = await api.startRide(apiToken,activeRide._id,pos.coords.latitude,pos.coords.longitude);
  if(response.status===200){
    const jsonRide = await response.json();
    setActiveRide(jsonRide);
  }
  setIsLoading(false);


}

const finished = async () => {

  setIsLoading(true);
  let pos = await Location.getCurrentPositionAsync({});
  const response = await api.finishRide(apiToken,activeRide._id,pos.coords.latitude,pos.coords.longitude);
  if(response.status===200){
    const jsonRide = await response.json();
    await AsyncStorage.removeItem('activeRideId');
    setIsLoading(false);
    navigation.reset({routes:[{name:'rideFinished',params:{ride:jsonRide}}]});
  }
  setIsLoading(false);

  
}

const cancelRide = async () => {

  if (motivoCancelamento.trim().length===0){
     alert('Informe o motivo do cancelamento por favor');
     return;
  }

   setModalVisible(false);
   setIsLoadingCancel(true);
   const response = await api.cancelRide(apiToken,activeRide._id,motivoCancelamento);
   if(response.status===200){
      navigation.reset({routes:[{name:'rideCancelled'}]});
   }
   setIsLoadingCancel(false);
  }

  const showModalCancel = ()=> {
    setModalVisible(true)
  }

  



  return (
    <GestureHandlerRootView style={{flex:1}}>
         <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
         <View style={styles.painelInfo}>
              <View style={{flexDirection:'row',gap:5}}>
                <MaterialCommunityIcons name="map-marker-distance" size={14} color="white" />
                <Text style={styles.infoText}>{util.distancia(activeRide?.distancia)}</Text>
              </View>
              <View style={{flexDirection:'row',gap:5}}>
                <Ionicons name="timer-outline" size={14} color="white" />
                <Text style={styles.infoText}>{util.duracao(activeRide?.duracao)}</Text>
              </View>
               <Text style={styles.infoText}>R$ {activeRide?.valor.toFixed(2)}</Text>
               <Text style={styles.infoText}>{activeRide?.pagamento.nome}</Text>
          </View>

          {location&&<MapView 
              ref={mapRef}
              style={StyleSheet.absoluteFill}
              showsUserLocation={true}
              showsMyLocationButton={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
              //latitudeDelta: 0.0922,
              //longitudeDelta: 0.0421,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
              }}
          >
              <Marker title='De:' description={activeRide?.origem.address} coordinate={{latitude:activeRide?.origem.latitude,longitude:activeRide?.origem.longitude}} >
                  <MaterialCommunityIcons name="map-marker-radius" size={30} color={cores.startMarker} />
              </Marker>

              <Marker title='Para:' description={activeRide?.destino.address} coordinate={{latitude:activeRide?.destino.latitude,longitude:activeRide?.destino.longitude}}>
                 <MaterialCommunityIcons name="map-marker-radius" size={30} color={cores.finishMarker} />
              </Marker>

              <MapViewDirections
                  origin={{latitude:activeRide?.origem.latitude,longitude:activeRide?.origem.longitude}}
                  destination={{latitude:activeRide?.destino.latitude,longitude:activeRide?.destino.longitude}}
                  apikey={GOOGLE_MAPS_API_KEY}
                  strokeWidth={3}
                  strokeColor="black"
                  optimizeWaypoints={true}
                  onReady={result => {
                              
                    mapRef.current.fitToCoordinates(result.coordinates,{
                      edgePadding:{
                        right:30,
                        bottom:30,
                        left: 30,
                        top:100
                      },
                      animated: true
                    })
                  }}
          />

          </MapView>}
          <ModalCancelRide onCancelar={cancelRide} visible={modalVisible} setVisible={setModalVisible} motivoCancelamento={motivoCancelamento} setMotivoCancelamento={setMotivoCancelamento}/>
          <RideBottomSheet ref={rideBottomSheetRef} isLoading={isLoading} isLoadingCancel={isLoadingCancel} onWay={onWay} arrived={arrived} started={started} finished={finished} cancel={showModalCancel}/>

    </GestureHandlerRootView>
  )
}

export default Ride

const styles = StyleSheet.create({

  painelInfo:{
    position:'absolute',
    top: 10,
    left: 10,
    backgroundColor: cores.primary,
    zIndex:1,
    flexDirection:'row',
    gap:10,
    padding:5,
    borderRadius:5
  },
  infoText:{
    color:'white',
    fontSize: 10,
  }

})