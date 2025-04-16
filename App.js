import React, { useEffect } from 'react';
import RootNavigation from './src/navigator/rootNavigator/RootNavigation';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';
import { styleConsole } from './src/util/helper/Helper';

const App = () => {

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Ads SDK initialized
        // styleConsole("🚀 ~ App.js:15 ~ useEffect ~ adapterStatuses:", "adapterStatuses", adapterStatuses)
      });
  }, []);



  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <Toast />
      </GestureHandlerRootView>
    </>
  );
};

export default App;
