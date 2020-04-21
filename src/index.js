/* eslint-disable no-console */
import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import '~/config/ReactotronConfig';

import { store, persistor } from '~/store';

import App from '~/App';

class Index extends Component {
  constructor(props) {
    super(props);
    OneSignal.init('baef2452-4d0f-44d3-89d1-e4372331c38e');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  UNSAFE_componentWillMount() {
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
    OneSignal.removeEventListener('ids');
  }

  onReceived = data => {
    console.log(data);
  };

  onOpened = notification => {
    console.log(notification);
  };

  onIds = id => {
    console.log(id);
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
