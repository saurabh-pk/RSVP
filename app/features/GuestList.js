import React, {Component} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Header from '../components/Header';
import c from '../configs/color';
import FontAwesome
    from "react-native-vector-icons/FontAwesome";
import api
    from "../helper/APIConnector";
import fs
    from "../configs/FontSizes";
import ah from '../helper/AppHelper';
export default class GuestList extends Component {
    constructor() {
        super();
        this.state={
            users:[{name:'Saurabh K', locality:'Badlapur East'}],
            main_users:[{name:'Saurabh K', locality:'Badlapur East'}]
        };
        this._unsubscribe="";
        this.fetchGuestList = this.fetchGuestList.bind(this);
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchGuestList();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    fetchGuestList() {
        this.setState({refreshing:true});
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
                    this.setState({users,main_users:users});
                } else {
                    this.setState({users:[],main_users:[]});
                }
                this.setState({refreshing:false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({refreshing:false});
                this.setState({users:[],main_users:[]});
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

    filterList(keywords){
        keywords = keywords.toLowerCase();
        let {main_users = []} = this.state;
        if(!ah.isNull(keywords)) {
            let users = main_users.filter(v => {
                let {name = "", locality = ""} = v;
                name = name.toLowerCase();
                locality = locality.toLowerCase();
                return name.indexOf(keywords) !== -1 || locality.indexOf(keywords) !== -1;
            });
            this.setState({users});
        } else {
            this.setState({users:main_users});
        }

    }

    render() {
        let {users,refreshing=false} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    title={'RSVP'}
                    hideLeftBtn={false}
                    isGoBackBtn={false}
                    onLeftButtonPress={() => this.props.navigation.openDrawer()}
                />
                <View style={{ flex: 1,padding:10}}>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <FontAwesome name="search" size={fs.fs18} color={c.Primary} />
                        </View>
                        <TextInput
                            ref="NameInput"
                            onChangeText={name => this.filterList(name)}
                            placeholderTextColor={c.GraySolid}
                            placeholder="Search"
                            style={[styles.input, {color: c.GrayDarkest}]}
                        />
                    </View>
                    <FlatList
                        data={users}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={(item,index) => ''+index}
                        onRefresh={this.fetchGuestList}
                        refreshing={refreshing}
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
        alignItems:'center',
        marginTop:5
    },
    input: {
        fontSize: fs.fs17,
        color: c.GrayDark,
        flex: 1,
        padding: 0,
        paddingHorizontal: 10,
        minHeight: 36,
        borderWidth:0
    },
    inputWrap: {
        flexDirection: 'row',
        height: 40,
        marginTop: 15,
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius: 5
    },
    iconWrap: {
        paddingBottom: 2,
        justifyContent: 'center',
    },
});