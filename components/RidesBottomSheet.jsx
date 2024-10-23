import { StyleSheet, Text, View } from 'react-native'
import React, {useMemo,forwardRef,useCallback,useContext} from 'react';
import BottomSheet  from '@gorhom/bottom-sheet';
import { BottomSheetFlatList  } from '@gorhom/bottom-sheet';
import { RidesContext } from '../context/RidesContext';
import RideCard from './cards/RideCard';
import HeightSpacer from './reusable/HeightSpacer';
import { cores } from '../cores';

const RidesBottomSheet = forwardRef((props,ref) => {
    const {rides} = useContext(RidesContext);

    const snapPoints = useMemo(() => ['10%','90%'], []);
    //const renderBackdrop = useCallback((props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, []);




  return (
    <BottomSheet style={styles.container} ref={ref} index={0} snapPoints={snapPoints} backgroundStyle={{opacity:.9}} handleIndicatorStyle={{backgroundColor: 'gray'}}>    
  
       
          <Text style={{fontSize:18, color: '#000',width:'100%',textAlign:'center'}}>Corridas Solicitadas ({rides.length})</Text>
          <HeightSpacer h={20}/>
          <BottomSheetFlatList
              
              showsVerticalScrollIndicator={false}
              data={rides}
              keyExtractor={(item)=>item._id}
              renderItem={({item})=><RideCard ride={item}/>}
                           
            />
       
    
  </BottomSheet>
  )
});

export default RidesBottomSheet

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    backgroundColor: cores.whiteSmoke,
  }
})