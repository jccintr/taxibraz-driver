import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Preload from '../screens/Preload';
import Login from '../screens/Login';
import DrawerNavigator from './DrawerNavigator';
import RideDetail from '../screens/RideDetail';
import Ride from '../screens/Ride';
import RideFinished from '../screens/RideFinished';
import RideCancelled from '../screens/RideCancelled';
import RideHistoryDetail from '../screens/RideHistoryDetail';
import RideHistoryMap from '../screens/RideHistoryMap';
import RecoveryPassword from '../screens/RecoveryPassword';
import ResetPassword from '../screens/ResetPassword';




const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='preload'>
        <Stack.Screen name='preload' component={Preload} options={{headerShown:false}}/>
        <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='recoveryPassword' component={RecoveryPassword} options={{headerShown:false}}/>
        <Stack.Screen name='resetPassword' component={ResetPassword} options={{headerShown:false}}/>
        <Stack.Screen  name="homeDrawer" component={DrawerNavigator} options={{headerShown:false}}/>
        <Stack.Screen name='rideDetail' component={RideDetail} options={{title:"Detalhes da Corrida"}}/>
        <Stack.Screen name='ride' component={Ride} options={{title:"Corrida"}}/>
        <Stack.Screen name='rideFinished' component={RideFinished} options={{headerShown:false}}/>
        <Stack.Screen name='rideCancelled' component={RideCancelled} options={{headerShown:false}}/>
        <Stack.Screen name='rideHistoryDetail' component={RideHistoryDetail} options={{headerTitle:'Detalhes da Corrida'}}/>
        <Stack.Screen name='rideHistoryMap' component={RideHistoryMap} options={{headerTitle:'Mapa da Corrida'}}/>
    </Stack.Navigator>
  )
}

export default StackNavigator