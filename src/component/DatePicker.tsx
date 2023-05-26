import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
    date: Date;
    onChange: (e:any, s:any) => void;
    formatDate: (d:any) => string;
}

function DatePicker({date, onChange, formatDate}:Props) {
  const [show, setShow] = useState(false);

  const showPicker = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
        <View style={styles.date}>
            <Text>
                Date : {formatDate(date)}
                {'  '}
            </Text>
            {!show &&
                <Pressable style={styles.addBtn} onPress={showPicker}>
                    <Text>Select</Text>
                </Pressable>
            }
            {show &&
                <Pressable style={styles.closeBtn} onPress={handleClose}>
                    <Text>
                        Close
                    </Text>
                </Pressable>
            }
        </View>
        <View>
            {show &&
                <DateTimePicker
                    value={date}
                    mode='date'
                    display='spinner'
                    onChange={onChange}
                />
            }
        </View>
    </>
  )
}
const styles = StyleSheet.create({
    addBtn: {
        color: 'black',
        borderWidth: 2.5,
        borderColor: '#eee', 
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    closeBtn: {
        color: 'black',
        borderWidth: 2.5,
        borderColor: 'orange', 
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 30
    },
});

export default DatePicker;