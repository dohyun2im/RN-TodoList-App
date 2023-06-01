import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import ListItem from '../component/ListItem';
import { useAppSelector } from '../store/hook';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function TodoList() {
  const todo = useAppSelector(state => state.todo.todoList);
  const sortedTodo = [...todo]
    .sort((a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  const todoStage = todo.filter((t) => t.stage === 1)?.length;
  const progressStage = todo.filter((t) => t.stage === 2)?.length;
  const completeStage = todo.filter((t) => t.stage === 3)?.length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.treeWrapper}>
        <View style={styles.tree}>
          <FontAwesome5 color='#b9ffb9' name='seedling' size={18} />
          <Text style={styles.text}> x{todoStage}</Text>
        </View>
        <View style={styles.tree}>
          <FontAwesome5 color='lightgreen' name='spa' size={15} />
          <Text style={styles.text}> x{progressStage}</Text>
        </View>
        <View style={styles.tree}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 color='green' name='tree' size={18} />
          </View>
          <Text style={styles.text}> x{completeStage}</Text>
        </View>
      </View>
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
  iconWrapper: {
    marginTop: -2
  },
  tree: {
    flexDirection: 'row'
  },
  treeWrapper: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  text: {
    marginRight: 10,
  }
})

export default TodoList;