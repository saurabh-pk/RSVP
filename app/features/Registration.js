import React, {Component} from 'react';
import {
    View,
    Button,
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import Header from '../components/Header';
import c from '../configs/color';
import fs from '../configs/FontSizes';
import FontAwesome
    from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons
    from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleDatetimePicker from '../components/simple-datetime-picker';
import SimplePicker
    from "../components/simple-picker";
import Entypo
    from "react-native-vector-icons/Entypo";
import ah from '../helper/AppHelper';
import api
    from "../helper/APIConnector";
const profession_options = [{label:'Select Profession'},{label:'Employed',value:'Employed'},{label:'Student',value:'Student'}];
export default class Home extends Component {
    constructor() {
        super();
        this.state={};
        this.registerGuest = this.registerGuest.bind(this);
    }

    registerGuest(){
        let {name,age,dob,profession,locality,guest_count=0,address} = this.state;
        if (ah.isNull(name)) {
            this.setState({
                errorStatus: true,
                errorMessage: "Please enter the guest name"
            });
        } else if (ah.isNull(age)) {
            this.setState({
                errorStatus: true,
                errorMessage: "Please enter the guest age"
            });
        } else if (ah.isNull(dob)) {
            this.setState({
                errorStatus: true,
                errorMessage: "Please select the guest DOB"
            });
        } else if (ah.isNull(profession)) {
            this.setState({
                errorStatus: true,
                errorMessage: "Please select the guest profession"
            });
        } else if (ah.isNull(locality)) {
            this.setState({
                errorStatus: true,
                errorMessage: "Please enter the guest locality"
            });
        } else if (ah.isNull(address)) {
            this.setState({
                errorStatus: true,
                errorMessage: "Please enter the guest address"
            });
        } else {
            this.setState({errorStatus: false, errorMessage: ""});
            fetch(api.registerGuest(), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },body: JSON.stringify({
                    name,
                    age,
                    dob,
                    profession,
                    locality,
                    guest_count,
                    address
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    let {status,data,msg="Something went wrong, please try again later!"} = responseData;
                    if(status){
                        ah.showToastMessage(msg);
                        this.setState({name:"",
                            age:"",
                            dob:"",
                            profession:"",
                            locality:"",
                            guest_count:"",
                            address:""})
                    } else {
                        this.setState({
                            errorStatus: true,
                            errorMessage: msg
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({avg_group_size:0,professional_cnt:0,student_cnt:0});
                });
        }
    }

    render() {
        let {
            errorStatus,
            errorMessage,
            name,
            dob,
            profession
        } = this.state;
        let errorView = errorStatus ? (
            <View style={styles.errorView}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        ) : (
            false
        );
        return (
            <View style={styles.container}>
                <Header
                    title={'RSVP'}
                    hideLeftBtn={false}
                    isGoBackBtn={false}
                    onLeftButtonPress={() => this.props.navigation.openDrawer()}
                />
                    <ScrollView style={{width: '100%'}} keyboardShouldPersistTaps="handled">
                        <View style={{flex:1}}>
                            {errorView}
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <FontAwesome name="user" size={fs.fs18} color={c.Primary} />
                                </View>
                                <TextInput
                                    ref="NameInput"
                                    onChangeText={name => this.setState({name})}
                                    placeholderTextColor={c.GraySolid}
                                    placeholder="Name"
                                    autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'next'}
                                    onSubmitEditing={event => {
                                        this.refs.AgeInput.focus();
                                    }}
                                    style={[styles.input, {color: c.GrayDarkest}]}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <MaterialCommunityIcons name="timer" size={fs.fs18} color={c.Primary} />
                                </View>
                                <TextInput
                                    keyboardType={'numeric'}
                                    ref="AgeInput"
                                    onChangeText={age => this.setState({age})}
                                    placeholderTextColor={c.GraySolid}
                                    placeholder="Age"
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'next'}
                                    style={[styles.input, {color: c.GrayDarkest}]}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <FontAwesome name="calendar" size={fs.fs18} color={c.Primary} />
                                </View>
                                <SimpleDatetimePicker
                                    inputStyle={[styles.input,{borderBottomWidth:1,borderBottomColor: c.GrayStrong}]}
                                    textStyle={{color: c.GrayDark,fontSize: fs.fs17,}}
                                    date={dob}
                                    mode={'date'}
                                    onValueChange={(dob)=>this.setState({dob})}
                                    placeholder={'DOB'}
                                    format={'DD/MM/YYYY'}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <FontAwesome name="user" size={fs.fs18} color={c.Primary} />
                                </View>
                                <SimplePicker
                                    selectedValue={profession}
                                    placeholder={'Profession'}
                                    placeholderTextColor={c.GraySolid}
                                    inputStyle={[styles.input,{height:40,borderBottomWidth:1,borderBottomColor: c.GrayStrong}]}
                                    textStyle={{color: c.GrayDark,fontSize: fs.fs17,}}
                                    onValueChange={(profession) => this.setState({profession})}
                                    options={profession_options}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Entypo name="location-pin" size={fs.fs18} color={c.Primary} />
                                </View>
                                <TextInput
                                    ref="LocalityInput"
                                    onChangeText={locality => this.setState({locality})}
                                    placeholderTextColor={c.GraySolid}
                                    placeholder="Locality"
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'next'}
                                    onSubmitEditing={event => {
                                        this.refs.GuestCountInput.focus();
                                    }}
                                    style={[styles.input, {color: c.GrayDarkest}]}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <FontAwesome name="users" size={fs.fs18} color={c.Primary} />
                                </View>
                                <TextInput
                                    keyboardType={'numeric'}
                                    ref="GuestCountInput"
                                    onChangeText={guest_count => this.setState({guest_count})}
                                    placeholderTextColor={c.GraySolid}
                                    placeholder="Number of Guests"
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'next'}
                                    onSubmitEditing={event => {
                                        this.refs.AddressInput.focus();
                                    }}
                                    style={[styles.input, {color: c.GrayDarkest}]}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <FontAwesome name="globe" size={fs.fs18} color={c.Primary} />
                                </View>
                                <TextInput
                                    ref="AddressInput"
                                    multiline={true}
                                    maxLength={50}
                                    onChangeText={address => this.setState({address})}
                                    placeholderTextColor={c.GraySolid}
                                    placeholder="Address"
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'next'}
                                    style={[styles.input, {color: c.GrayDarkest}]}
                                />
                            </View>
                            <View style={{marginTop: '5%', justifyContent: 'center'}}>
                            <TouchableOpacity
                                style={styles.button} onPress={this.registerGuest}>
                                <Text style={[styles.buttonText, {color: c.White}]}>
                                    {'REGISTER'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c.BGWhite,
    },
    errorView: {
        backgroundColor: c.PrimaryMoreLight,
        marginTop: 10,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: c.Black,
        fontSize: fs.fs12,
        alignSelf: 'center',
        textAlign: 'center',
    },
    input: {
        fontSize: fs.fs17,
        color: c.GrayDark,
        flex: 1,
        padding: 0,
        paddingHorizontal: 10,
        minHeight: 36,
    },
    inputWrap: {
        flexDirection: 'row',
        height: 40,
        marginHorizontal: 30,
        marginTop: 15
    },
    iconWrap: {
        paddingBottom: 2,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: c.Primary,
        height: 40,
        width: 'auto',
        paddingLeft: 45,
        paddingRight: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonText: {
        color: c.White,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: fs.fs16,
        fontWeight: '600',
    }
});