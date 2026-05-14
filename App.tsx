import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Counter1 from './Redux_Basic/Counter1';
import { Provider } from 'react-redux';
/* import counterStore from './Redux_Basic/store/counterStore';
import Layout from './Redux_Basic/Layout'; */

import { store } from './Thunk/store/store';
import PostsScreen from './Thunk/screens/postScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
       {/* <SafeAreaView edges={['top' , 'bottom']}>  */}

     {/*  <Provider store={counterStore}>
  
        <Layout />  
      </Provider> */}

      {/* THUNK example */}

      <Provider store={store}>
    {/*   <PostsScreen /> */}
      </Provider>
      
{/*       </SafeAreaView>  */}
    </SafeAreaProvider>
  );
}



export default App;
