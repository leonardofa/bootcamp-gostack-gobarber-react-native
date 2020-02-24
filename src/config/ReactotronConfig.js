import Reacttotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reacttotron.configure({ host: '192.168.0.13' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
