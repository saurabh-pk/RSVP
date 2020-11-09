import React, {Component} from 'react';
import {
    View,
    Button,
    SafeAreaView,
    StyleSheet,
    Text
} from 'react-native';
import Header from '../components/Header';
import c from '../configs/color';
import fs  from '../configs/FontSizes';
import ah from '../helper/AppHelper';
const w = ah.getDeviceWidth();
export default class Home extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    title={'RSVP'}
                    hideLeftBtn={false}
                    isGoBackBtn={false}
                    onLeftButtonPress={() => this.props.navigation.openDrawer()}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{width:w*0.6,height:w*0.6,borderRadius:w*0.3,backgroundColor: c.PrimaryMoreLight,alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width:w*0.5,height:w*0.5,borderRadius:w*0.3,backgroundColor: c.PrimaryLight,alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{width:w*0.4,height:w*0.4,borderRadius:w*0.3,backgroundColor: c.Primary,alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.centerText}>
                                    Welcome
                                </Text>
                                <Text style={styles.centerText}>
                                    To
                                </Text>
                                <Text style={styles.centerText}>
                                    RSVP
                                </Text>
                            </View>
                        </View>
                    </View>
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
    centerText:{
        fontSize:fs.fs28,color:c.White
    }
});