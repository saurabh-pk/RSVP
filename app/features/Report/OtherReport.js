import React, {Component} from 'react';
import {
    View,
    Button,
    SafeAreaView,
    StyleSheet,
    Text
} from 'react-native';
import Header from '../../components/Header';
import c from '../../configs/color';
import fs  from '../../configs/FontSizes';
import ah from '../../helper/AppHelper';
import api
    from "../../helper/APIConnector";
const w = ah.getDeviceWidth();
export default class OtherReport extends Component {
    constructor() {
        super();
        this.state = {
            avg_group_size:0,professional_cnt:0,student_cnt:0
        };
        this._unsubscribe="";
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchReportData();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    fetchReportData() {
        fetch(api.getOtherReportData(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                let {status,data} = responseData;
                if(status){
                    let {avg_group_size=0,professional_cnt=0,student_cnt=0} = data;
                    this.setState({avg_group_size,professional_cnt,student_cnt});
                } else {
                    this.setState({avg_group_size:0,professional_cnt:0,student_cnt:0});
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({avg_group_size:0,professional_cnt:0,student_cnt:0});
            });
    }
    render() {
        let {avg_group_size=0,professional_cnt=0,student_cnt=0} = this.state;
        return (
                <View style={{ flex: 1, alignItems: 'center',paddingTop:20 }}>
                    <View style={{width:'90%',padding:10,borderBottomWidth:2,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize: fs.fs22}}>
                            Average Group Size
                        </Text>
                        <Text style={{fontSize: fs.fs28}}>{avg_group_size}</Text>
                    </View>
                    <View style={{width:'90%',padding:10,borderBottomWidth:2,alignItems:'center',justifyContent:'flex-start'}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'50%',padding:10,alignItems:'center',justifyContent:'center',borderRightWidth:2}}>
                                <Text style={{fontSize: fs.fs22}}>
                                    Professionals
                                </Text>
                                <Text style={{fontSize: fs.fs28}}>{professional_cnt}</Text>
                            </View>
                            <View style={{width:'50%',padding:10,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: fs.fs22}}>
                                    Students
                                </Text>
                                <Text style={{fontSize: fs.fs28}}>{student_cnt}</Text>
                            </View>
                        </View>
                    </View>
                </View>
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