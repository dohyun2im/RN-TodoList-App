import * as React from 'react';
import { Alert, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useAppSelector } from '../store/hook';

function Calendar() {
  const todo = useAppSelector(state => state.todo.todoList);
  const markedDates = todo.reduce((acc, cur) => {
    acc[cur.date] = {
      marked: true,
      dotColor: cur.dotColor
    };
    return acc;
  }, {});

  const dayAlert = (d: any) => {
    const selected = todo.filter((t) => t.date === d.dateString);
    Alert.alert(
      selected[0].date,
      selected.map((s) => s.content).join('\n')
    );
  } 

  return (
    <View>
      <CalendarList
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={dayAlert}
      />
    </View>
  )
}

export default Calendar;
