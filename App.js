import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import * as Location from 'expo-location';
//import Preload from './screens/Preload';
//import Home from './screens/Home';
//import Login from './screens/Login';
import { LocationContext } from './context/LocationContext';
import { AuthContext } from './context/AuthContext';
import { RidesContext } from './context/RidesContext';


//const Stack = createNativeStackNavigator();
import StackNavigator from './navigation/StackNavigator';


export default function App() {
  const [location, setLocation] = useState(null);
  const [loggedUser,setLoggedUser] = useState(null);
  const [apiToken,setApiToken] = useState(null);
  const [expoPushToken,setExpoPushToken] = useState(null);
  const [rides,setRides] = useState([]);
  const [activeRide,setActiveRide] = useState(null);
 

 

  return (
    <AuthContext.Provider value={{loggedUser,setLoggedUser,apiToken,setApiToken,expoPushToken,setExpoPushToken}}>
      <LocationContext.Provider value={{location,setLocation}}>
        <RidesContext.Provider value={{rides,setRides,activeRide,setActiveRide}}>
          
               <NavigationContainer>
                      <StackNavigator/>
               </NavigationContainer>
           
        </RidesContext.Provider>
      </LocationContext.Provider>
    </AuthContext.Provider>
  );
}
