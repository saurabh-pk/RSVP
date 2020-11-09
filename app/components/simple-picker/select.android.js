import React, {
    useState,
    useMemo,
    useEffect,
} from 'react';
import {Picker} from '@react-native-community/picker';
import {View} from 'react-native';
export default function SimplePicker({
                                         selectedValue,
                                         options,
                                         onValueChange,
                                         placeholder,
                                         inputStyle,
                                         textStyle,
                                         enabled
                                     }) {
    const [_selectedValue,setSelectedValue] = useState(selectedValue);
    useEffect(()=>{
        if(_selectedValue !== selectedValue) {
            setSelectedValue(selectedValue);
        }
    });
    function onChange(value){
        setSelectedValue(value);
        onValueChange(value)
    }
    return (
        <View style={inputStyle}>
            <Picker
                selectedValue={_selectedValue}
                mode={'dropdown'}
                style={inputStyle}
                onValueChange={onChange}
                enabled={enabled}>
                {options.map((o,i)=>{return <Picker.Item key={i+''} label={o.label} value={o.value} />})}
            </Picker>
        </View>
    );
}
