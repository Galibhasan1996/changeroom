import React from 'react';
import RootNavigation from './src/navigator/rootNavigator/RootNavigation';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  return (
    <>
      <GestureHandlerRootView>
        <RootNavigation />
        <Toast />
      </GestureHandlerRootView>
    </>
  );
};

export default App;
