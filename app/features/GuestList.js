import React, {Component} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Header from '../components/Header';
import c from '../configs/color';
import FontAwesome
    from "react-native-vector-icons/FontAwesome";
import api
    from "../helper/APIConnector";
export default class GuestList extends Component {
    constructor() {
        super();
        this.state={
            users:[{name:'Saurabh K', locality:'Badlapur East'}]
        };
    }

    componentDidMount() {
        this._unsubscribe = navigation.addListener('focus', () => {
            this.fetchGuestList();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    fetchGuestList() {
        fetch(api.getGuestList(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                let {status,data:users=[]} = responseData;
                if(status){
                    this.setState({users});
                } else {
                    this.setState({users:[]});
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({users:[]});
            });
    }

    renderItem(user_data){
        let {name,locality} = user_data;
        return (
            <TouchableOpacity style={styles.cardView}>
                <FontAwesome name='user-circle-o' color={c.Primary} size={30}/>
                <View style={{paddingLeft:10}}>
                    <Text>
                        {name}
                    </Text>
                    <Text>
                        {locality}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        let {users} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    title={'RSVP'}
                    hideLeftBtn={false}
                    isGoBackBtn={false}
                    onLeftButtonPress={() => this.props.navigation.openDrawer()}
                />
                <View style={{ flex: 1,padding:10}}>
                    <FlatList
                        data={users}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={(item,index) => ''+index}
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
    cardView:{
        width:'100%',
        padding:5,
        borderWidth:1,
        borderColor:c.PrimaryLight,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center'
    }
});