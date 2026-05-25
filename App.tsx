import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
/* import Counter1 from './Redux_Basic/Counter1'; */
/* import counterStore from './Redux_Basic/store/counterStore';
import Layout from './Redux_Basic/Layout'; */
/* import { store } from './Thunk/store/store'; */
/* import PostsScreen from './Thunk/screens/postScreen'; */
/* import AuthScreen from './Toolkit/AuthScreen'; */
/* import { store } from './Toolkit/store/store'; */
/* import AppNavigator from './Toolkit/navigateLayout'; */
/* import { store } from './RTK_Query/store/store'; */
/* import PostScreen from './RTK_Query/postScreen';
import AddPostScreen from './RTK_Query/AddPost';*/
/* import TabNavigator from './RTK_Query/TabNavigator'; */
/* import HomeScreen from './RTK_Query2/screens/HomeScreen'; */

import { store } from './Saga/store/store';
/* import AuthScreen from './Saga/screens/authScreen'; */
import SagaLayout from './Saga/screens/LayoutScreen';

function App() {
  return (
    <SafeAreaProvider>
      {/* THUNK example */}
      {/*  <Provider store={counterStore}>
        <Layout />  
      </Provider> */}

      {/* Toolkit example */}
      <Provider store={store}>

        <SagaLayout />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
