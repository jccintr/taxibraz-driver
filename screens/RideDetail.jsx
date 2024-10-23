import React, { useState,useRef,useContext } from 'react';
import { StyleSheet, View,SafeAreaView,StatusBar,ToastAndroid } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { LocationContext } from '../context/LocationContext';
import { AuthContext } from '../context/AuthContext';
import { RidesContext } from '../context/RidesContext';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from './../constants';
import { Octicons,FontAwesome } from '@expo/vector-icons';
import { cores } from '../cores';
import RideDetailPanel from '../components/panels/RideDetailPanel';
import Botao from '../components/reusable/Botao';
//import HeightSpacer from '../components/reusable/HeightSpacer';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const RideDetail = ({route,navigation}) => {
  const [isLoading,setIsLoading] = useState(false);
  const {apiToken} = useContext(AuthContext);
  const {setActiveRide} = useContext(RidesContext)
  const mapRef = useRef();
  const {location} = useContext(LocationContext);
  const {ride} = route.params;
  
  
  const acceptRide = async () => {

     setIsLoading(true);
     const response  = await api.acceptRide(apiToken,ride._id)
     
     if(response.status!==200){
        setIsLoading(false);
         ToastAndroid.show('Esta corrida não está mais disponível.', ToastAndroid.LONG);
         navigation.reset({routes:[{name:'homeDrawer'}]});
        return;
     }
     setIsLoading(false);
     const jsonRide = await response.json();
     console.log('accept ride activeRideId',jsonRide._id)
     await AsyncStorage.setItem('activeRideId', jsonRide._id);
     setActiveRide(jsonRide);
     //navigation.navigate('ride');
     navigation.reset({routes:[{name:'ride'}]});

     
  }
  



  return (

    <SafeAreaView style={{flex:1}}>
       <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
       <View style={{flex:1}}>
          <MapView 
                  ref={mapRef}
                  style={styles.map}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                  latitude: location?.coords.latitude,
                  longitude: location?.coords.longitude,
                 // latitudeDelta: 0.0922,
                 // longitudeDelta: 0.0421,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.01,
                  }}
              >

             <Marker title='De:' description={ride.origem.address} coordinate={{latitude:ride.origem.latitude,longitude:ride.origem.longitude}}>
                  <MaterialCommunityIcons name="map-marker-radius" size={30} color={cores.startMarker} />
             </Marker>
             <Marker title ='Para:' description={ride.destino.address} coordinate={{latitude:ride.destino.latitude,longitude:ride.destino.longitude}}>
                 <MaterialCommunityIcons name="map-marker-radius" size={30} color={cores.finishMarker} />
            </Marker>
             <MapViewDirections
                origin={{latitude:ride.origem.latitude,longitude:ride.origem.longitude}}
                destination={{latitude:ride.destino.latitude,longitude:ride.destino.longitude}}
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
                
          </MapView>

         
            <RideDetailPanel ride={ride}/>
         
              
          <View style={{width:'100%',paddingHorizontal: 10,position:'absolute',bottom:20}}>
              <Botao 
                onPress={acceptRide} 
                text={'ACEITAR'} 
                textSize={16} 
                textColor={cores.white} 
                width={'100%'} 
                backgroundColor={cores.primary} 
                borderWidth={0} 
                borderRadius={10} 
                isLoading={isLoading}
             />
             
            
          </View>
         
       </View>

    </SafeAreaView>
    
  )
}

export default RideDetail

const styles = StyleSheet.create({

  map:{
    width:'100%',
    height:'60%',
  }
})