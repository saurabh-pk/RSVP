import React from "react";
import {
    Dimensions,
    Keyboard,
    Platform,
    ToastAndroid,
    Alert,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class AppHelper {

    static getDeviceHeight() {
        return  deviceHeight;
    }

    static getDeviceWidth() {
        return  deviceWidth;
    }

    static getToolBarBarHeight(){
        return 45;
    }

    static getFooterBarHeight(){
        return 55;
    }

    static dismissKeyboard() {
        try {
            Keyboard.dismiss();
        } catch (e) {
        }
    }

    static getDeviceType() {
        return (Platform.OS === 'ios' || Platform.OS == 'ios')?'IOS':'ANDROID';
    }

    static showToastMessage(message = "Something went wrong, please try again later!") {
        const isAndroid = Platform.OS === 'ios' ? false : true;
        if (isAndroid) {
            ToastAndroid.show(message, ToastAndroid.CENTER, ToastAndroid.LONG);
        } else {
            Alert.alert(message, "", {cancelable: false});
        }
    }

    static showConfirmation(title="Confirmation required",message,okText="OK",onOK,cancelText="Cancel",onCancel) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: cancelText,
                    onPress: () => {onCancel && onCancel()},
                    style: 'cancel'
                },
                {
                    text: okText,
                    onPress: () => {onOK && onOK()}
                },
            ],
            {cancelable: false},
        );
    }

    static formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

    static getCamelCase(str) {
        return str.replace(/\s(.)|^(.)/g, function($1) { return $1.toUpperCase(); });
    }

    static isNull = function (val) {
        if ((val == [] || val == null || val == "" || val == undefined || typeof val == 'undefined' || val == 'undefined') && typeof val != 'boolean' && typeof val != 'number') {
            return true;
        } else {
            if (typeof val == 'number' && isNaN(val)) {
                return true;
            }
            val = JSON.parse(JSON.stringify(val));
            return (typeof val == 'object') ? !Object.keys(val).length : false;
        }
    };

    static getUnrefJSON = (json)=>{return JSON.parse(JSON.stringify(json));}

    static numberWithComma = function (num=0) {
        let num_parts = String(num).split('.');
        let x = num_parts[0];
        let lastThree = x.substring(x.length-3);
        let otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != ''){
            lastThree = ',' + lastThree;
        }
        num_parts[0] = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return num_parts.join('.');
    };
}

export default AppHelper;