import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';
import c from '../../configs/color';
import fs  from '../../configs/FontSizes';
import ah from '../../helper/AppHelper';
import Pie from 'react-native-pie';
import api from '../../helper/APIConnector';
export default class AgeReport extends Component {
    constructor() {
        super();
        this.state={
            report_data:[
                {
                    label:'13-18',
                    value:35,
                    percentage: 35,
                    color: '#C70039',
                },
                {
                    label:'18-25',
                    value:45,
                    percentage: 45,
                    color: '#44CD40',
                },
                {
                    label:'25+',
                    value:20,
                    percentage: 20,
                    color: '#404FCD',
                }
            ]
        };
    }
    componentDidMount() {
        this._unsubscribe = navigation.addListener('focus', () => {
            this.fetchReportData();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    fetchReportData() {
        fetch(api.getAgeReportData(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                let {status,data:report_data=[]} = responseData;
                if(status){
                    this.setState({report_data});
                } else {
                    this.setState({report_data:[]});
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({report_data:[]});
            });
    }
    render() {
        let {report_data=[]}= this.state;
        return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {ah.isNull(report_data)?<View style={{width: '100%',flexDirection: 'row',justifyContent:'center',paddingVertical:10}}>
                            <Text style={{fontSize:fs.fs18,fontWeight:'bold',paddingVertical:5}}>
                                No Data Found
                            </Text>
                        </View>
                        :<View style={{flex:1,width: '100%',paddingVertical:10,flexDirection: 'column',alignItems: 'center'}}>
                            <View style={{width: 180,height:180}}>
                                <Pie
                                    radius={90}
                                    innerRadius={45}
                                    sections={report_data}
                                    dividerSize={2}
                                    strokeCap={'butt'}
                                />
                            </View>
                            <ScrollView style={{flex:1,width:'100%'}}>
                                <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
                                    {report_data.map(section=>{
                                        let {color,label,value=0} = section;
                                        return <View style={{width:'50%',flexDirection: 'row',alignItems:'center'}}>
                                            <Text
                                                numberOfLines={1}
                                                style={{color,flex:1,fontSize:fs.fs18,fontWeight:'bold',paddingVertical:5}}>
                                                {`Age Group ${label} `}
                                            </Text>
                                            <Text style={{color,fontSize:fs.fs18,fontWeight:'bold',paddingVertical:5}}>
                                                {`${value}`}
                                            </Text>
                                        </View>
                                    })}
                                </View>
                            </ScrollView>
                        </View>}
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