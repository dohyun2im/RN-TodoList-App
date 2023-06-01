import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import BouncyCheckboxGroup, { ICheckboxButton } from 'react-native-bouncy-checkbox-group';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { setTodo } from '../slices/todolist';
import { useAppDispatch, useAppSelector } from '../store/hook';

interface Props {
    id: number;
    content: string;
    stage: number;
    date: string;
}

export default function ListItem({id, content, stage, date}:Props) {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.todo.todoList);
  const sortedTodo = [...todo]
    .sort((a: any, b: any)=> new Date(b.date).valueOf() - new Date(a.date).valueOf());
  const oneRef = React.useRef<any>();
  const twoRef = React.useRef<any>();
  const threeRef = React.useRef<any>();

  React.useEffect(() => {
    if (stage === 1) oneRef.current?.onPress();
    if (stage === 2) twoRef.current?.onPress();
    if (stage === 3) threeRef.current?.onPress();
  },[])

  const staticData = [
    {
        id: '1',
        text: 'To-do',
        textStyle: stage === 1 ? styles.todo : styles.text,
        style: styles.vertical,
        unfillColor: 'white',
        fillColor: 'gray',
        size: 20,
        ref: oneRef,
      },
      {
        id: '2',
        text: 'In progress',
        textStyle: stage === 2 ? styles.progress : styles.text,
        style: styles.vertical,
        unfillColor: 'white',
        fillColor: 'lightblue',
        size: 20,
        ref: twoRef,
      },
      {
        id: '3',
        unfillColor: 'white',
        text: 'complete',
        textStyle: stage === 3 ? styles.complete : styles.text,
        style: styles.vertical,
        fillColor: 'lightgreen',
        size: 20,
        ref: threeRef
      },
  ];

  const handleStageOnPress = (changeStage:number): void => {    

    const updatedTodos = sortedTodo.map((t: any) =>
      Number(t.id) === Number(id) ? { ...t, stage: changeStage } : t
    );
    
    dispatch(setTodo(updatedTodos));
  };

  const handleTrash = () => {
    const deleteTodo = todo.filter((t) => t.id !== id);
    dispatch(setTodo(deleteTodo));
  };

  return (
    <View style={styles.border} key={id}>
        <View style={styles.date}>
            <Text style={styles.items}>
                {date}
            </Text>
            <Pressable style={styles.trashBtn} onPress={handleTrash}>
                <FontAwesome5 style={styles.plus} name='trash-alt' size={20} />
            </Pressable>
        </View>
        <View style={styles.stageCheckBox}>       
            <BouncyCheckboxGroup
                data={staticData}
                style={styles.checkGroup}
                onChange={(selectedItem: ICheckboxButton) => {
                    handleStageOnPress(Number(selectedItem.id));
                }}
            />
        </View>
        <View style={styles.content}>  
            <View style={styles.arrow}>
                {stage === 1 && <FontAwesome5 color='#b9ffb9' name='seedling' size={18} />}
                {stage === 2 && <FontAwesome5 color='lightgreen' name='spa' size={15} />}
                {stage === 3 && <FontAwesome5 style={{marginLeft: 2}} color='green' name='tree' size={18} />}
            </View>
            <Text>
                {content}
        </Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  vertical: {
    marginTop: 5
  },
  text: {
    textDecorationLine: 'none'
  },
  checkGroup: {
    flexDirection: 'column'
  },
  todo: {
    textDecorationLine: 'none',
    color: 'gray',
    fontWeight: 'bold',
  },
  progress: {
    textDecorationLine: 'none',
    color: 'lightblue',
    fontWeight: 'bold',
  },
  complete: {
    textDecorationLine: 'none',
    color: 'lightgreen',
    fontWeight: 'bold',
  },
  content: {
    fontWeight: 'bold',
    paddingVertical: 8,
    flexDirection: 'row',
  },
  arrow: {
    marginLeft: 2,
    marginRight: 15,
  },
  stageCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  border: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 10,
  },
  items: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  trashBtn: {
    color: 'black',
    alignSelf: 'flex-end',
  },
  plus: {
    marginBottom: 3,
  },
})