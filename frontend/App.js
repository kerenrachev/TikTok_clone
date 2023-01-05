import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers'
import AuthScreen from './src/screens/auth';
import Route from './src/navigation/main';
import { QueryClient, QueryClientProvider } from 'react-query';

const store = createStore(rootReducer, applyMiddleware(thunk))

if (firebase.apps.length == 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyCrCO9DHXdXlb105VX0DR_xR2hiGDbrTSc",
    authDomain: "tiktokclone-b9404.firebaseapp.com",
    projectId: "tiktokclone-b9404",
    storageBucket: "tiktokclone-b9404.appspot.com",
    messagingSenderId: "497545975013",
    appId: "1:497545975013:web:ac23cce95526eb7ef1f00c",
    measurementId: "G-T4Y8LKD9Q6"
  })
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {refetchInterval: false, staleTime: Infinity}}
})

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Route />

      </QueryClientProvider>


    </Provider>

  );
}

