import React, {
    useState,
    useMemo,
    useEffect,
} from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Feather
    from 'react-native-vector-icons/Feather';
import fs
    from '../../configs/FontSizes';
import c
    from '../../configs/color';

export default function SimpleDatetimePicker({
                                                 date,
                                                 mode,
                                                 onValueChange,
                                                 placeholder,
                                                 inputStyle,
                                                 textStyle,
                                                 format,
                                                 showArrow
                                             }) {
    const [show, setShow] = useState(false);
    const [_mode] = useState(mode);
    const [_date, _setDate] = useState(date);
    const [_userUpdate, _setUserUpdate] = useState(false);
    let formattedDate = () => {
        return _date
            ? moment.parseZone(_date).local().format(format || 'DD/MM/YYYY HH:mm')
            : '';
    }

    useEffect(()=>{
        if(!_userUpdate) {
            _setDate(date);
        }
    });

    function showNow() {
        setShow(true);
    }

    function showDate() {
        showNow();
    }

    function handleSetDate(value) {
        let newDate = new Date(value);
        _setDate(newDate);
    }

    function onChange(event, value) {
        value = value || date;
        _setUserUpdate(true);
        handleSetDate(value);
    }

    function handleSubmit() {
        onValueChange(_date);
        setShow(false);
    }

    return (
        <View style={[inputStyle,{justifyContent:'center'}]}>
            <TouchableOpacity onPress={showDate} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={[textStyle]} OK={!!date}>
                    {formattedDate() || placeholder}
                </Text>
                {showArrow?<Feather name="chevron-down" size={fs.fs18} color={c.Black}/>:false}
            </TouchableOpacity>
            <Modal animationType="slide" visible={show} transparent>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        textAlign: 'center',
                        backgroundColor: '#00000080',
                    }}>
                    <View style={{backgroundColor: '#fff'}}>
                        <DateTimePicker
                            mode={_mode}
                            is24Hour
                            value={_date || new Date()}
                            onChange={onChange}
                            display="default"
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity style={{margin: 20}} onPress={() => setShow(false)}>
                                <Text style={{fontSize: 24}}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{margin: 20}} onPress={handleSubmit}>
                                <Text style={{fontSize: 24}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
