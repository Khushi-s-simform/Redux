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
import { store } from './RTK_Query/store/store';
import PostScreen from './RTK_Query/postScreen';

function App() {
  return (
    <SafeAreaProvider>
      {/* THUNK example */}
      {/*  <Provider store={counterStore}>
        <Layout />  
      </Provider> */}

      {/* Toolkit example */}
      <Provider store={store}>
        <PostScreen/>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
