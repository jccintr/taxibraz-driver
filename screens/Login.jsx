import { StyleSheet,SafeAreaView,StatusBar,Text,TouchableOpacity } from 'react-native';
import { cores } from '../cores';
//import logo from '../assets/logo-500x270.png';
import logo from '../assets/logo-brazdriver-480x230.png';
import AssetImage from '../components/reusable/AssetImage';
import Botao from '../components/reusable/Botao';
import HeightSpacer from '../components/reusable/HeightSpacer';
import { useState, useContext } from 'react';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const {setLoggedUser,setApiToken,expoPushToken} = useContext(AuthContext);


const login = async () => {

  if(email.trim().length === 0 || password.trim().length === 0){
    alert("Informe todos os campos por favor.");
    return;
  }

  setIsLoading(true);

  let response = await api.login(email, password);
 
  if(response.status!==200){
    alert('Email e ou senha inválidos.')
    setPassword('');
    setIsLoading(false);
    return;
  }
   const jsonUser = await response.json();
   if (jsonUser.token) await AsyncStorage.setItem('token', jsonUser.token);
   let ret = await api.storePushToken(jsonUser.token,expoPushToken);
   
   setApiToken(jsonUser.token);
   setLoggedUser(jsonUser);
   setIsLoading(false);
   navigation.reset({routes:[{name:'homeDrawer'}]}); 

}

  return (
    <SafeAreaView style={styles.container}>
         <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
         <AssetImage radius={0} height={100} width={209} source={logo} mode={'contain'}/>
         <HeightSpacer h={10}/>
         <Text style={{fontWeight:'bold', fontSize:20,color:cores.primary}}>Driver App</Text>
         <HeightSpacer h={40}/>
         <InputField 
            label={'Email:'} 
            placeholder={'Informe o seu Email'} 
            value={email} 
            onChangeText={t=>setEmail(t)} 
            password={false} 
            keyboard={'email-address'}
         />
         <InputField 
            label={'Senha:'} 
            placeholder={'Informe a sua Senha'} 
            value={password} 
            onChangeText={t=>setPassword(t)} 
            password={true} 
            keyboard={'default'}
         />
         <Botao 
            onPress={()=>login()} 
            text={'ENTRAR'} 
            textSize={16} 
            textColor={cores.white} 
            width={'100%'} 
            backgroundColor={cores.primary} 
            borderWidth={0} 
            borderRadius={10} 
            isLoading={isLoading}
         />
         <HeightSpacer h={10}/>
         <TouchableOpacity onPress={()=>navigation.navigate('recoveryPassword')}>
              <Text style={{color:cores.primary,fontWeight:'bold'}}>Esqueceu a sua senha ?</Text>
         </TouchableOpacity>
        
        
    </SafeAreaView>
     
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff'
  },

  
})