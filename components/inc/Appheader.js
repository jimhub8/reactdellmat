import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome'

import { DrawerActions } from '@react-navigation/native';
import { Icon, Header, Left, Right } from 'native-base';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class Appheader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Header style={styles.header}>
                <Left style={styles.left}>
                    <Icon name="menu" style={styles.menu} onPress={() => {
                        this.props.navigation.dispatch(DrawerActions.openDrawer())
                    }} />
                    <FAIcon name="apple" style={styles.amazon} />
                </Left>
                <Right>
                    <Icon name="cart" style={styles.menu} />
                </Right>
            </Header>
        );
    }
}


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

