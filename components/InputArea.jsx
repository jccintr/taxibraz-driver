import React from 'react'
import { StyleSheet, KeyboardAvoidingView,TextInput} from 'react-native';
import { cores } from '../cores';


const InputArea = ({placeholder, value,onChangeText}) => {
  return (
    <KeyboardAvoidingView style={styles.inputArea} behavior='height'>
            <TextInput style={styles.input}
                multiline
                numberOfLines={3}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={'#a1a1a1'}
            />
    </KeyboardAvoidingView>
  )
}

export default InputArea

const styles = StyleSheet.create({
    inputArea: {
        backgroundColor: '#f1f4f9',
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
    },
     input: {
      flex: 1,
      fontSize: 14,
      paddingHorizontal: 4,
      color: '#000',
      marginLeft: 10,
      color: cores.azulEscuro,
      height: 94,
      textAlignVertical: 'top',
      justifyContent: 'flex-start',
     
    },
})