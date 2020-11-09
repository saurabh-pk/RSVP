import React, {
    useState,
    useMemo,
    useEffect,
} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import fs
    from '../../configs/FontSizes';
import c
    from '../../configs/color';
import Feather
    from 'react-native-vector-icons/Feather';

export default function SimpleDatetimePicker({
                                                 date,
                                                 mode,
                                                 onValueChange,
                                                 placeholder,
                                                 inputStyle,
                                                 textStyle,
                                                 format,
                                                 showArrow,
                                                 minimumDate,
                                                 maximumDate
                                             }) {
    const [show, setShow] = useState(false);
    const [_mode, setMode] = useState(mode);
    const [_date, _setDate] = useState(date);
    const [_userUpdate, _setUserUpdate] = useState(false);
    let formattedDate = () => {
        return _date
            ? moment.parseZone(_date).local().format(format || 'DD/MM/YYYY HH:mm')
            : '';
    }

    function showNow(showMode) {
        setMode(showMode);
        setShow(true);
    }
    useEffect(()=>{
        if(!_userUpdate) {
            _setDate(date);
        }
    });
    function showDate() {
        if (_mode === 'date' || _mode === 'datetime') {
            showNow('date');
        } else if(_mode === 'time'){
            showNow('time');
        }
    }

    function showTime() {
        showNow('time');
    }

    function handleSetDate(value) {
        const newDate = new Date(_date);
        newDate.setFullYear(value.getFullYear());
        newDate.setMonth(value.getMonth());
        newDate.setDate(value.getDate());
        onValueChange(newDate);
        _setDate(newDate);
        (mode === 'datetime')?showTime():false;
    }

    function handleSetTime(value) {
        const newDate = new Date(_date);
        newDate.setHours(value.getHours());
        newDate.setMinutes(value.getMinutes());
        onValueChange(newDate);
        _setDate(newDate);
        setMode(mode);
    }

    function onChange(event, value) {
        if(value) {
            value = value || date;
            setShow(false);
            _setUserUpdate(true);
            if (_mode === 'date' || _mode === 'datetime') {
                handleSetDate(value);
            } else if (_mode === 'time') {
                handleSetTime(value);
            }
        }else{
            setShow(false);
        }
    }

    return (
        <View style={[inputStyle,{justifyContent:'center'}]}>
            <TouchableOpacity onPress={showDate} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={[textStyle]} ok={!!date}>
                    {formattedDate() || placeholder}
                </Text>
                {showArrow?<Feather name="chevron-down" size={fs.fs18} color={c.Black}/>:false}
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    mode={_mode}
                    is24Hour
                    value={date || new Date()}
                    onChange={onChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    display="default"
                />
            )}
        </View>
    );
}
