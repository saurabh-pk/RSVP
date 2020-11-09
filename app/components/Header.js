import React, {useState} from 'react';
import {Text, TouchableHighlight, View, Keyboard} from 'react-native';
import AppHelper from '../helper/AppHelper';
import c from '../configs/color';
import Feather from 'react-native-vector-icons/Feather';
import fs from '../configs/FontSizes';
import ah from '../helper/AppHelper';

export default function Header({
                                          title,
                                          hideLeftBtn,
                                          isGoBackBtn,
                                          onLeftButtonPress
                                      }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: AppHelper.getToolBarBarHeight(),
                backgroundColor: c.Primary,
                paddingTop: 0,
                zIndex: 9,
            }}>
            {hideLeftBtn ? (
                <View
                    style={{
                        minWidth: 60,
                        height: '100%',
                        paddingHorizontal: 15,
                        marginRight: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />
            ) : isGoBackBtn ? (
                <View
                    style={{
                        justifyContent: 'center',
                        minWidth: 60,
                        flexDirection:'row'
                    }}>
                    <TouchableHighlight
                        onPress={() => {
                            Keyboard.dismiss();
                            onLeftButtonPress && onLeftButtonPress();
                        }}
                        underlayColor={'#00000014'}
                        activeOpacity={0.3}
                        delayPressOut={500}
                        style={{
                            height: '100%',
                            marginRight: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Feather name="chevron-left" size={fs.fs28} color={c.White} />
                    </TouchableHighlight>
                    <View style={{
                        minWidth: 40,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}/>
                </View>
            ) : (
                <View
                    style={{
                        justifyContent: 'center',
                        minWidth: 60,
                        flexDirection:'row'
                    }}>
                    <TouchableHighlight
                        onPress={() => {
                            Keyboard.dismiss();
                            onLeftButtonPress && onLeftButtonPress();
                        }}
                        underlayColor={'#00000014'}
                        activeOpacity={0.3}
                        delayPressOut={500}
                        style={{
                            minWidth: 60,
                            height: '100%',
                            paddingHorizontal: 15,
                            marginRight: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Feather name="menu" size={fs.fs28} color={c.White} />
                    </TouchableHighlight>
                    <View style={{
                        minWidth: 40,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}/>
                </View>
            )}
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        fontSize: fs.fs18,
                        color: c.White,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {title}
                </Text>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    minWidth: 60,
                    flexDirection:'row'
                }}>
            </View>
        </View>
    );
}
