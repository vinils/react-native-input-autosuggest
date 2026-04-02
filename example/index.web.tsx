import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root') || document.createElement('div');

  if (!rootTag.parentElement) {
    document.body.appendChild(rootTag);
  }

  AppRegistry.runApplication(appName, {
    rootTag,
  });
}
