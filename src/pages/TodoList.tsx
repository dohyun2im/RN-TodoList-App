import * as React from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { setTodo } from '../slices/todolist';
import { useAppDispatch, useAppSelector } from '../store/hook';

function TodoList() {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.todo.todoList);
  const sortedTodo = [...todo].sort((a: any, b: any)=> new Date(b.date).valueOf() - new Date(a.date).valueOf());
  
  const handleCheckBoxOnPress = (f:boolean, id: any): void => {
    const updatedTodos = sortedTodo.map((t: any) =>
      Number(t.id) === Number(id) ? { ...t, checked: !t.checked } : t
    );
    dispatch(setTodo(updatedTodos));
  };

  const handleTrash = (value:number) => {
    const deleteTodo = todo.filter((t) => t.id !== value);
    dispatch(setTodo(deleteTodo));
  };

  return (
    <ScrollView style={styles.container}>
      {sortedTodo.map((t: any, idx: number) => (
        <View style={styles.border} key={idx}>
          <View style={styles.date}>
            <View style={styles.checkBox}>       
              <BouncyCheckbox
                size={25}
                isChecked={t.checked ? true : false}
                onPress={() => handleCheckBoxOnPress(false, t.id)}
              />
              <Text style={[styles.items, t.checked && styles.check]}>
                {t.date}
              </Text>
            </View>
            <Pressable style={styles.trashBtn} onPress={() => handleTrash(t.id)}>
              <FontAwesome5 style={styles.plus} name='trash-alt' size={20} />
            </Pressable>
          </View>
          <View>
            <Text style={[styles.content, t.checked && styles.check]}>
              {t.content}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  check: {
    color: 'orange',
    fontWeight: 'bold',
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    fontWeight: 'bold',
    marginLeft: 40,
    padding: 10,
  },
  border: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  items: {
    fontWeight: '600'
  },
  trashBtn: {
    color: 'black',
    alignSelf: 'flex-end',
  },
  plus: {
    marginBottom: 3,
  },
})

export default TodoList;