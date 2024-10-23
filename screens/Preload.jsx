import { StyleSheet,StatusBar,SafeAreaView,ActivityIndicator,Platform  } from 'react-native';
import React,{useContext,useState,useEffect} from 'react'
//import logo from '../assets/logo-500x270.png';
import logo from '../assets/logo-brazdriver-480x230.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { cores } from '../cores';
import AssetImage from '../components/reusable/AssetImage';
import HeightSpacer from '../components/reusable/HeightSpacer';
import { RidesContext } from '../context/RidesContext';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const Preload = ({navigation}) => {
  const {setLoggedUser,setApiToken,setExpoPushToken} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const {setActiveRide} = useContext(RidesContext)

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);


  useEffect(()=>{
    const checkToken = async () => {
      //await AsyncStorage.removeItem('activeRideId');
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        console.log('token=>',token);

        //não tem token de acesso, manda para a tela de login
        if (!token) {
          navigation.reset({routes:[{name:'login'}]});
          return;
        }
        
        //verifica se o token é válido
        let response = await api.validateToken(token);
        console.log('response validate token status =>',response.status);

        if(!response.ok){ // token inválido, manda para a tela de login
          navigation.reset({routes:[{name:'login'}]});
          return;
        }

        setApiToken(token);
        let jsonUser = await response.json(); 
        setLoggedUser(jsonUser);

        //verifica se tem corrida ativa
        const activeRideId = await AsyncStorage.getItem('activeRideId');
        console.log('activeRideId =>',activeRideId)

        if(activeRideId){

          const response2 = await api.restoreRide(token,activeRideId);
          console.log('response2 status =>',response2.status);
          if (response2.ok){

            const jsonRide = await response2.json();
             console.log('activeRide =>',jsonRide);
            setActiveRide(jsonRide);
            navigation.reset({routes:[{name:'homeDrawer'}]});
            return;

          } else {

            setActiveRide(null);
            await AsyncStorage.removeItem('activeRideId');
          }
          
        } 
       
       
        navigation.reset({routes:[{name:'homeDrawer'}]});
        
    }
    checkToken();
}, []);
  
  return (
    <SafeAreaView style={styles.container}>
         <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
         <AssetImage radius={0} height={100} width={209} source={logo} mode={'contain'}/>
         <HeightSpacer h={20} />
         {isLoading&&<ActivityIndicator size="large" color={cores.primary}/>}
    </SafeAreaView>
  )
}

export default Preload

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff'
  },

  
})