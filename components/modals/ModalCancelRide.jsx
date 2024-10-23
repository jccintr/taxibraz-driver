import { StyleSheet, Text,Modal,View} from 'react-native';
import React from 'react'
import { cores } from '../../cores';
import Botao from '../reusable/Botao';
import HeightSpacer from '../reusable/HeightSpacer';
import InputArea from '../InputArea';



const ModalCancelRide = ({visible,setVisible,motivoCancelamento,setMotivoCancelamento,onCancelar}) => {
  return (
    <Modal visible={visible} animationType="none" statusBarTranslucent={true} transparent={true} onRequestClose={()=>setVisible(false)}>
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <Text style={styles.title}>Cancelamento de Corrida</Text>
            <HeightSpacer h={10} />
            <Text style={styles.mensagem}>Informe o motivo do cancelamento no campo abaixo:</Text>
            <HeightSpacer h={10} />
            <InputArea placeholder={'Motivo do cancelamento'} value={motivoCancelamento} onChangeText={setMotivoCancelamento}  />
                <Botao backgroundColor={cores.primary} text={'CANCELAR CORRIDA'} borderRadius={10} width={'100%'} textColor={'#fff'} onPress={onCancelar}/>
                <HeightSpacer h={10} />
                <Botao backgroundColor={cores.white} text={'VOLTAR'} borderColor={cores.primary} borderWidth={2} borderRadius={10} width={'100%'} textColor={cores.primary} onPress={()=>setVisible(false)}/>
          
        </View>
    </View>
 </Modal>
  )
}

export default ModalCancelRide

const styles = StyleSheet.create({
    modalBackground:{
       flex:1,
       backgroundColor: 'rgba(0,0,0,0.5)',
       justifyContent: 'center',
       alignItems:'center',
    },
    modalContainer:{
        width: '90%',
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:15,
        elevation:20,
    },
    title:{
       fontSize: 16,
       color: cores.vermelho,
       fontWeight:'bold',
       width: '100%',
       textAlign: 'center',
    },
    mensagem:{
        width: '100%',
        textAlign: 'center',
        fontSize:14,
        
    }
})