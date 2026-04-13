/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import appJson from './app.json';

const appName = appJson.name;
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