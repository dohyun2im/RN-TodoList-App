import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TodoList from './src/pages/TodoList';
import Calendar from './src/pages/Calendar';
import { Provider } from 'react-redux';
import store from './src/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AddModal from './src/component/AddModal';
import SplashScreen from 'react-native-splash-screen';

const persistor = persistStore(store);
const Tab = createBottomTabNavigator();

function App() {
  React.useEffect(() => {
    setTimeout(()=>{
			SplashScreen.hide()
		}, 2000)
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'gray',
            }}
          >
            <Tab.Screen
              name='TodoList'
              component={TodoList}
              options={{
                title: 'Todo List',
                headerRight: () => <AddModal />,
                tabBarIcon: () => <FontAwesome5 name='list-alt' size={20} />,
              }}
            />
            <Tab.Screen
              name='Calender'
              component={Calendar}
              options={{
                title: 'Calendar',
                tabBarIcon: () => <FontAwesome5 name='calendar-alt' size={20} />,
                unmountOnBlur: true,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;