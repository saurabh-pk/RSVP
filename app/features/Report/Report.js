import React, {Component} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import Header from '../../components/Header';
import c from '../../configs/color';
import { TabView, TabBar } from 'react-native-tab-view';
import AgeReport
    from "./AgeReport";
import LocalityReport
    from "./LocalityReport";
import OtherReport
    from "./OtherReport";
import ah from '../../helper/AppHelper';
const w = ah.getDeviceWidth();
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            index:0,
            routes: [
                {key: 'age', title: 'Age'},
                {key: 'locality', title: 'Locality'},
                {key: 'other', title: 'Other'},
            ]
        };
    }

    renderScene = ({route}) => {
        switch (route.key) {
            case 'age':
                return <AgeReport navigation={this.props.navigation}/>;
            case 'locality':
                return <LocalityReport navigation={this.props.navigation}/>;
            case 'other':
                return <OtherReport navigation={this.props.navigation}/>;
            default:
                return null;
        }
    };

    renderTabBar = props => (
        <TabBar
            {...props}
            inactiveColor={c.Black}
            activeColor={c.Black}
            scrollEnabled={true}
            labelStyle={{textAlign:'center'}}
            indicatorStyle={{ backgroundColor: c.Primary }}
            style={{ backgroundColor: c.White}}
        />
    );

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    title={'RSVP'}
                    hideLeftBtn={false}
                    isGoBackBtn={false}
                    onLeftButtonPress={() => this.props.navigation.openDrawer()}
                />
                <View style={{ flex: 1 }}>
                    <TabView
                        initialLayout={{ width: w }}
                        navigationState={this.state}
                        renderTabBar={this.renderTabBar}
                        renderScene={this.renderScene}
                        onIndexChange={index => {
                            this.setState({index});
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c.BGWhite,
    },
});