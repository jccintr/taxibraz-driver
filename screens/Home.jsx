import React, { useState, useEffect,useContext } from 'react';
import { StatusBar, Text, StyleSheet,Pressable } from 'react-native';
import * as Location from 'expo-location';
import { LocationContext } from '../context/LocationContext';
import { AuthContext } from '../context/AuthContext';
import { RidesContext } from '../context/RidesContext';
import api from '../api/api';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { Octicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RidesBottomSheet from '../components/RidesBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { cores } from '../cores';
import { mapSilver } from '../mapStyles';


const Home = ({navigation}) => {
    const {location,setLocation} = useContext(LocationContext);
    const {loggedUser,apiToken} = useContext(AuthContext);
    const {setRides,activeRide,rides} = useContext(RidesContext);
    const [isOnline,setIsOnline] = useState(loggedUser?.online);

   
    useEffect(() => {
       if(activeRide){
        navigation.reset({routes:[{name:'ride'}]});
       }
    }, [location]);

   
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let position = await Location.getCurrentPositionAsync({});
          setLocation(position);
        })();
      }, []);

  useEffect(() => {
    (async () => {
    
      const response = await api.getRides(apiToken);
      
      if (response.status===200){
        const jsonRides = await response.json();
        
        setRides(jsonRides);
      }

    })();
  }, []);


useEffect(()=>{

  const interval = setInterval(()=>{
      uploadDriverPosition();
  },10000);
  return ()=>clearInterval(interval);

});
   
  const uploadDriverPosition = async () => {

    if(isOnline){

      let pos = await Location.getCurrentPositionAsync({});
      setLocation(pos);
      console.log("Atualizou driver position from home: " + 'lat: ' + pos.coords.latitude + ' lng: '+ pos.coords.longitude + ' ' + new Date());
      const response = await api.sendLocation(apiToken,pos.coords.latitude,pos.coords.longitude);
      if (response.status===200){
        const jsonRides = await response.json();
        setRides(jsonRides);
      }

    }
   

  }

 

  const updateDriverStatus = async (status) => {

    setIsOnline(status);
    
    let response = await api.updateStatus(apiToken,status);
    

  }

 

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
      <Pressable onPress={()=>updateDriverStatus(!isOnline)} style={styles.painelStatus}>
            <Octicons name="dot-fill" size={24} color={isOnline?'green':'darkred'}/>
           <Text style={{fontSize:14,fontWeight:'bold'}}>{isOnline?'Online':'Offline'}</Text>
        </Pressable>
      {location&&<MapView 
                customMapStyle={mapSilver}
                style={StyleSheet.absoluteFill}
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
              {rides.map((ride)=><Marker key={ride._id} title={ride.passenger.name} description={ride.origem.address} coordinate={{latitude:ride.origem.latitude,longitude:ride.origem.longitude}}>
                  <FontAwesome name="user" size={22} color={cores.primary} />
               </Marker>
               
              )}

             
            </MapView>}
            <RidesBottomSheet/>
       </GestureHandlerRootView>
  )

}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'flex-start'
    },
    painelStatus:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#fafafa',
      position: 'absolute',
      top:10,
      zIndex:1,
      borderRadius: 25,
      borderWidth:1,
      paddingHorizontal: 15,
      paddingVertical:5,
      gap:5,
      
    }
})