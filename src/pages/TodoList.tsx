import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ListItem from '../component/ListItem';
import { useAppSelector } from '../store/hook';

function TodoList() {
  const todo = useAppSelector(state => state.todo.todoList);
  const sortedTodo = [...todo].sort((a: any, b: any)=> new Date(b.date).valueOf() - new Date(a.date).valueOf());

  return (
    <ScrollView style={styles.container}>
      {sortedTodo.map((t: any) => (
        <ListItem
          key={t.id}
          id={t.id}
          content={t.content}
          stage={t.stage}
          date={t.date}
        />
      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
})

export default TodoList;