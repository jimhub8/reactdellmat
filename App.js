/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';

import Drawernav from './components/SideBar/Drawernav'
import { Header, Container, Left, Icon, Right } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <Container>
      <Drawernav />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3a455c',
    height: 90,
    borderBottomColor: '#757575',
    borderBottomWidth: .5
  },
  left: {
    flexDirection: 'row'
  },
  menu: {
    color: Colors.lighter,
    marginRight: 15,
  },
  amazon: {
    fontSize: 32,
    color: '#ffffff',
  }
});

export default App;
