import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import Modal from "react-native-modal";
import { setTodo } from '../slices/todolist';
import { useAppDispatch, useAppSelector } from '../store/hook';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from "./DatePicker";
import TodoInput from "./TodoInput";

const debounce = <F extends (...args: any[]) => any>(f: F, w: number): any => {
  let timeout: any = null;
  const debounced = (...args: Parameters<F>):any => {
    if (timeout !== null) {
      clearInterval(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => f(...args), w);
  }
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
}

function AddModal() {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.todo.todoList);
  const sortedTodo = [...todo].sort((a: any, b: any)=> b.id - a.id);
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [showDate, setShowDate] = useState(false);

  const showPicker = () => {
    setShowDate(true);
  };

  const handleClose = () => {
    setShowDate(false);
  };

  const onChangeText = (text:any) => {
    if (showDate) handleClose
    setText(text);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onChangeDate = (event:any, selectedDate:any) => {
    setDate(selectedDate);
    debounce(handleClose, 3000)();
  };

  const formatDate = (date:Date):string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (): void => {
    const selectedDate = formatDate(date);
    const value = {
      id: todo?.length > 0 ? sortedTodo[0].id + 1 : 0 , 
      date: selectedDate,
      dotColor: 'orange',
      content: text,
      stage: 0,
    };

    dispatch(setTodo([...todo, value]));
    setDate(new Date());
    setText('');
    setModalVisible(false);
  };

  const handleTrash = () => {
    Alert.alert('Delete All', 'Do you agree ? ', [
      {
        text: 'Yes',
        onPress: () => dispatch(setTodo([]))
      },
      {
        text: 'No',
      }
    ])
  };


  return (
    <View>
      <View style={styles.btnGroup}>
        <Pressable style={styles.addBtn} onPress={toggleModal}>
          <Text>Add</Text>
          <FontAwesome5 style={styles.plus} name='plus' size={10} />
        </Pressable>

        <Pressable style={styles.trashBtn} onPress={handleTrash}>
          <Text>ALL</Text>
          <FontAwesome5 style={styles.plus} name='trash-alt' size={20} />
        </Pressable>
      </View>

      <Modal style={styles.modal} isVisible={isModalVisible} backdropColor='white'>
        <View style={styles.modalView}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>
              Add To do . 
            </Text>
          </View>

          <DatePicker
            show={showDate}
            date={date}
            onChange={onChangeDate} 
            formatDate={formatDate}
            handleClose={handleClose}
            showPicker={showPicker}
          />
          <TodoInput text={text} onChange={onChangeText} />

          <View style={styles.btnGroup}>
            <Pressable style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Submit</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={toggleModal}>
              <Text style={styles.btnText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').height / 3,
    margin: 30,
  },
  btnGroup: {
    flexDirection: 'row',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  btn: {
    color: 'black',
    borderWidth: 4,
    borderColor: '#eee', 
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },  
  addBtn: {
    color: 'black',
    borderWidth: 3,
    borderColor: '#eee', 
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  trashBtn: {
    color: 'black',
    marginLeft: 5,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  plus: {
      marginLeft: 3
  },
  modalView: {
      flex: 1,
      borderWidth: 2,
      borderColor: '#eee', 
      borderRadius: 5, 
      backgroundColor: 'white', 
      justifyContent: 'space-between',
      alignItems: 'center',
      
  },
  header: {
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: 20,
  },
  headerWrapper: {
    borderBottomColor: '#eee',
    borderBottomWidth: 3,
  }
});

export default AddModal;