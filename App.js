import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
    View,
    Button,
    SafeAreaView,
    StatusBar
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './app/features/Home';
import Registration from './app/features/Registration';
import GuestList
    from "./app/features/GuestList";
import Report
    from "./app/features/Report/Report";
const App: () => React$Node = () => {
    const Drawer = createDrawerNavigator();
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView style={{flex:1}}>
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="Registration" component={Registration} />
                        <Drawer.Screen name="Guest List" component={GuestList} />
                        <Drawer.Screen name="Report" component={Report} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </>
    );
};

export default App;
