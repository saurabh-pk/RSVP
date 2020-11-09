import React from 'react';
import {View} from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
import c from '../../configs/colors';

export default function SimplePicker({
                                         selectedValue,
                                         options=[],
                                         onValueChange,
                                         placeholder,
                                         placeholderTextColor=c.Black,
                                         inputStyle={width:'100%',height:'100%'},
                                         textStyle={flex:1},
                                         enabled=true
                                     }) {

    return (
        <View
            style={[inputStyle, {borderBottomWidth:0, justifyContent: 'center'}]}>
            <Dropdown
                data={options}
                value={selectedValue}
                onChangeText={(value)=>onValueChange(value)}
                // rippleCentered={true}
                dropdownOffset={{top:0}}
                containerStyle={{height:40}}
                disabled={!enabled}
                rippleInsets={{top:0}}
                itemPadding={5}/>
        </View>
    );
}
