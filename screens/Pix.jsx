import { StyleSheet,ToastAndroid,SafeAreaView,View } from 'react-native';
import React, {useState,useContext} from 'react';
import InputField from '../components/InputField';
import Botao from '../components/reusable/Botao';
import { cores } from '../cores';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';


const Pix = () => {
    const [isLoading,setIsLoading] = useState(false);
    const {apiToken,loggedUser,setLoggedUser} = useContext(AuthContext)
    const [pix, setPix] = useState({favorecido:loggedUser?.pix.favorecido,chave:loggedUser?.pix.chave});




    const updatePix = async () => {

        if(pix.favorecido.trim().length === 0 || pix.chave.trim().length === 0){
            alert("Por favor, informe o favorecido e a chave pix.");
            return;
        }
        setIsLoading(true);
        const response = await api.updatePix(apiToken,pix);
      
        if (response.status !== 200){
          ToastAndroid.show('Falha ao atualizar pix.', ToastAndroid.LONG);
          setIsLoading(false);
          return;
        }
      
        const jsonUser = await response.json();
        setLoggedUser(jsonUser);
        setIsLoading(false);
        ToastAndroid.show('Pix atualizado com sucesso !', ToastAndroid.LONG);
      
      
      }
      





  return (
     <SafeAreaView style={styles.container}>
     <InputField 
            label={'Favorecido:'} 
            placeholder={'Informe o favorecido do pix'} 
            value={pix.favorecido} 
            onChangeText={t=>setPix({ ...pix, favorecido: t })} 
            password={false} 
            keyboard={'default'}
         />
    <InputField 
            label={'Chave Pix:'} 
            placeholder={'Informe a chave pix'} 
            value={pix.chave} 
            onChangeText={t=>setPix({ ...pix, chave: t })} 
            password={false} 
            keyboard={'default'}
         />
    <View style={styles.botao}>
        <Botao 
                onPress={()=>updatePix()} 
                text={'SALVAR ALTERAÇÕES'} 
                textSize={16} 
                textColor={cores.white} 
                width={'100%'} 
                backgroundColor={cores.primary} 
                borderWidth={0} 
                borderRadius={10} 
                isLoading={isLoading}
            />

    </View>
   
    </SafeAreaView>
  )
}

export default Pix

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 20,
        paddingHorizontal: 20,
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor: '#fff'
      },
    botao:{
        width:'100%',
        position:'absolute',
        bottom:20,
    }
})