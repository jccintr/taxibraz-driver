import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React,{useEffect,useContext,useState} from 'react'
import { cores } from '../cores'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeightSpacer from '../components/reusable/HeightSpacer';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const Ganhos = () => {
  const {apiToken} = useContext(AuthContext);
  const [ganhos,setGanhos] = useState({});
  const [isLoading,setIsLoading] = useState(false);


  useEffect(()=>{
    const getGanhos = async () => {
      setIsLoading(true);            
      let response = await api.getGanhos(apiToken,new Date());
      
      if(response.ok){
        let jsonGanhos = await response.json();
        setGanhos(jsonGanhos)
        console.log(jsonGanhos);
      }
    
      setIsLoading(false);
  }
  getGanhos();
  },[])



  return (
    <View style={styles.container}>
      
      {isLoading?<ActivityIndicator size="large" color={cores.primary}/>:<>
     <View style={styles.painel}>
        <Text style={{color:cores.primary,fontSize:20,fontWeight:'bold'}}>Hoje</Text>
        <Text style={styles.valor}>R$ {ganhos.hoje?.valor.toFixed(2)}</Text>
        <HeightSpacer h={20}/>
        {ganhos.hoje?.corridas>0&&<View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <MaterialCommunityIcons name="map-marker-distance" size={24} color={cores.primary} />
            <Text style={{fontSize:16}}>{ganhos.hoje?.corridas} {ganhos.hoje?.corridas>1?'corridas finalizadas':'corrida finalizada'}</Text>
        </View>}
      </View> 
      <HeightSpacer h={20}/>  
      <View style={styles.painel}>
        <Text style={{color:cores.primary,fontSize:20,fontWeight:'bold'}}>Esta Semana</Text>
        <Text style={styles.valor}>R$ {ganhos.semana?.valor.toFixed(2)}</Text>
        <HeightSpacer h={20}/>
        {ganhos.semana?.corridas>0&&<View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <MaterialCommunityIcons name="map-marker-distance" size={24} color={cores.primary} />
            <Text style={{fontSize:16}}>{ganhos.semana?.corridas} {ganhos.semana?.corridas>1?'corridas finalizadas':'corrida finalizada'}</Text>
        </View>}
      </View> 
      <HeightSpacer h={20}/>  
      <View style={styles.painel}>
        <Text style={{color:cores.primary,fontSize:20,fontWeight:'bold'}}>Este Mês</Text>
        <Text style={styles.valor}>R$ {ganhos.mes?.valor.toFixed(2)}</Text>
        <HeightSpacer h={20}/>
        {ganhos.mes?.corridas>0&&<View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <MaterialCommunityIcons name="map-marker-distance" size={24} color={cores.primary} />
            <Text style={{fontSize:16}}>{ganhos.mes?.corridas} {ganhos.mes?.corridas>1?'corridas finalizadas':'corrida finalizada'}</Text>
        </View>}
      </View></>}    
      
    </View>
  )
}

export default Ganhos

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        alignItems:'center',
        justifyContent:'center'
      },
      painel:{
        width:'100%',
        backgroundColor:"#fff",
        justifyContent: 'space-between',
        alignItems:'flex-start',
        padding:20,
        borderRadius:5,
       
      },
      valor:{
        fontSize:30,
        fontWeight:'bold',
        color: '#000'
      },
      optionText:{
        fontSize:20
      }
})