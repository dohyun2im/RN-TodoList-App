import React from "react";
import { TextInput, Text, View, StyleSheet, Keyboard } from "react-native";
import DismissKeyboardView from "./DissmissKeyboardView";

interface Props {
  text: string;
  onChange: (t:any) => void;
}

function TodoInput({text, onChange}:Props) {
  const handlePressOutside = () => {
    Keyboard.dismiss();
  }
  return (
    <DismissKeyboardView onPress={handlePressOutside}>
        <View style={styles.input}>
            <Text>
                Todo :
                {'  '}
            </Text>

            <TextInput
                style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={onChange}
                placeholder='Write Todo .'
                clearButtonMode='while-editing'
                value={text}
                keyboardType='default'
                editable={true}
                returnKeyType='done'
            />                      
        </View>
    </DismissKeyboardView>
  )
}
const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        marginTop: 50
    },
    textInput: {
      padding: 5,
      minWidth: 160,
      borderBottomWidth: StyleSheet.hairlineWidth
    }
});

export default TodoInput;