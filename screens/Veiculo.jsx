import { StyleSheet,ToastAndroid,SafeAreaView,View,Text } from 'react-native';
import React, {useState,useContext} from 'react';
import InputField from '../components/InputField';
import Botao from '../components/reusable/Botao';
import { cores } from '../cores';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const Veiculo = () => {
  const [isLoading,setIsLoading] = useState(false);
  const {apiToken,loggedUser,setLoggedUser} = useContext(AuthContext)
  const [veiculo, setVeiculo] = useState({
    modelo: loggedUser?.veiculo.modelo,
    cor: loggedUser?.veiculo.cor,
    placa: loggedUser?.veiculo.placa
  });

  const updateVeiculo = async () => {

    if(veiculo.modelo.trim().length === 0 || veiculo.cor.trim().length === 0 || veiculo.placa.trim().length === 0){
        alert("Por favor, informe o modelo, cor e placa do veículo.");
        return;
    }
    setIsLoading(true);
    const response = await api.updateVeiculo(apiToken,veiculo);
  
    if (response.status !== 200){
      ToastAndroid.show('Falha ao atualizar veículo.', ToastAndroid.LONG);
      setIsLoading(false);
      return;
    }
  
    const jsonUser = await response.json();
    setLoggedUser(jsonUser);
    setIsLoading(false);
    ToastAndroid.show('Veículo atualizado com sucesso !', ToastAndroid.LONG);
  
  
  }



  return (
    <SafeAreaView style={styles.container}>
        <InputField 
            label={'Modelo:'} 
            placeholder={'Informe o modelo do veículo'} 
            value={veiculo.modelo} 
            onChangeText={t=>setVeiculo({ ...veiculo, modelo: t })} 
            password={false} 
            keyboard={'default'}
         />
          <InputField 
            label={'Cor:'} 
            placeholder={'Informe a cor predominante do veículo'} 
            value={veiculo.cor} 
            onChangeText={t=>setVeiculo({ ...veiculo, cor: t })} 
            password={false} 
            keyboard={'default'}
         />
          <InputField 
            label={'Placa:'} 
            placeholder={'Informe a placa do veículo'} 
            value={veiculo.placa} 
            onChangeText={t=>setVeiculo({ ...veiculo, placa: t })} 
            password={false} 
            keyboard={'default'}
         />
          <View style={styles.botao}>
               <Botao 
                onPress={()=>updateVeiculo()} 
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

export default Veiculo

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