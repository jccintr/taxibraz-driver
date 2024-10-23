import { StyleSheet, Text, View } from 'react-native'
import React, {useMemo,forwardRef,useCallback,useContext, useEffect,useState} from 'react';
import BottomSheet  from '@gorhom/bottom-sheet';
import { cores } from '../cores';
import { RidesContext } from '../context/RidesContext';
import HeightSpacer from './reusable/HeightSpacer';
import TalkButton from './TalkButton';
import PassengerCard from './cards/PassengerCard';
import Botao from '../components/reusable/Botao';
//import { useBottomSheet } from '@gorhom/bottom-sheet';



const RideBottomSheet = forwardRef((props,ref) => {
    const {activeRide} = useContext(RidesContext);
    const snapPoints = useMemo(() => ['30%','40%'], []);
    

  return (
    <BottomSheet style={styles.container} ref={ref} index={1} snapPoints={snapPoints} backgroundStyle={{opacity:.9}} handleIndicatorStyle={{backgroundColor: 'gray'}}>    
        <Text style={{fontSize:18, color: '#000',width:'100%',textAlign:'center'}}>{activeRide.events[activeRide.events.length-1].descricao}</Text>
        <HeightSpacer h={20}/>
        {activeRide.driver&&<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <PassengerCard passenger={activeRide.passenger}/>
          <TalkButton telefone={activeRide.passenger.telefone} />
        </View>}
        <HeightSpacer h={20}/>
        {activeRide.status===1&&<Botao 
            onPress={props.onWay} 
            text={'A CAMINHO DO PONTO DE EMBARQUE'} 
            textSize={16} 
            textColor={cores.white} 
            width={'100%'} 
            backgroundColor={cores.primary} 
            borderWidth={0} 
            borderRadius={10} 
            isLoading={props.isLoading}
         />}
         {activeRide.status===2&&<Botao 
            onPress={props.arrived} 
            text={'MOTORISTA CHEGOU'} 
            textSize={16} 
            textColor={cores.white} 
            width={'100%'} 
            backgroundColor={cores.primary} 
            borderWidth={0} 
            borderRadius={10} 
            isLoading={props.isLoading}
         />}
         {activeRide.status===3&&<Botao 
            onPress={props.started} 
            text={'INICIAR CORRIDA'} 
            textSize={16} 
            textColor={cores.white} 
            width={'100%'} 
            backgroundColor={cores.primary} 
            borderWidth={0} 
            borderRadius={10} 
            isLoading={props.isLoading}
         />}
          {activeRide.status===4&&<Botao 
            onPress={props.finished} 
            text={'FINALIZAR CORRIDA'} 
            textSize={16} 
            textColor={cores.white} 
            width={'100%'} 
            backgroundColor={cores.primary} 
            borderWidth={0} 
            borderRadius={10} 
            isLoading={props.isLoading}
         />}
         {activeRide.status>0&&activeRide.status<4&&<View>
            <HeightSpacer h={10}/>
            <Botao 
                onPress={props.cancel} 
                text={'CANCELAR A CORRIDA'} 
                textSize={16} 
                textColor={cores.primary} 
                width={'100%'} 
                backgroundColor={cores.white} 
                borderWidth={2} 
                borderRadius={10} 
                borderColor={cores.primary}
                isLoading={props.isLoadingCancel}
            />
         </View>}
     </BottomSheet>
  )
});

export default RideBottomSheet

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        backgroundColor: cores.whiteSmoke,
      }
})