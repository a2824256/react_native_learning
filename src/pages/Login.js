'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableHighlight, Image} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../components/NavBar';
import {logIn, register} from '../actions/user';

//图片地址
const PIC_URL = 'http://wemore.risplan.xyz/Public/wemore/pic.jpeg';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
        };
    }

    //
    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true) {
            this.toMain();
            return false;
        }
        if (nextProps.isRegister != this.props.isRegister && nextProps.isRegister === true) {
            this.toRegister();
            return false;
        }

        if (nextProps.status == 'doing') {
            //loggining
            return false;
        }
        if (nextProps.status == 'error' || nextProps.status == 'done') {
            return false;
        }

        return true;
    }

    toMain = () => {
        const {router} = this.props;
        router.toMain();
    }

    handleLogin = () => {
        if (!this.state.account || !this.state.password) {
            Alert.alert('账号或密码不能为空！！');
            return;
        }
        let opt = {
            'acc': this.state.account,
            'pwd': this.state.password,
        };
        this.props.dispatch(logIn(opt));
    }

    handleRegister = () => {
        this.props.dispatch(register());
    }

    toRegister = () => {
        const {router} = this.props;
        router.toRegister();
    }

    render() {
        var pic_url = PIC_URL;
        var title = '登录';
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
                <NavBar title={title}/>
                <Image
                    resizeMode={Image.resizeMode.stretch}
                    style={styles.thumbnail}
                    source={{uri: pic_url}}
                />
                <View style={{height: 1, backgroundColor: '#DCDCDC'}}/>
                <View style={{flex: 1}}>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.TextInput}
                            autoCapitalize='none'
                            placeholder='请输入手机/邮箱/账号'
                            textAlign='center'
                            onChangeText={(account) => this.setState({account})}
                            underlineColorAndroid='transparent'
                        />
                        <View style={{height: 2}}/>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.TextInput}
                            placeholder='密码'
                            autoCapitalize='none'
                            textAlign='center'
                            onChangeText={(password) => this.setState({password})}
                            underlineColorAndroid='transparent'
                        />
                        <TouchableHighlight onPress={this.handleLogin} underlayColor="#52ABFF" style={styles.login_button}>
                            <Text style={{color: '#fff'}}>登录</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.handleRegister} underlayColor="#52ABFF" style={styles.button}>
                            <Text style={{color: '#fff'}}>注册</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.Copyright}>
                    <View style={{flex: 4}}>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>copyright (c) 2017 by Alex Leung</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    pic: {
        padding: 100,
        backgroundColor: '#99ffcc',
    },
    content: {
        marginTop: 10,
        height: 150,
    },
    font: {
        padding: 10,
        fontSize: 15,
    },
    TextInput: {
        height: 40,
        backgroundColor: '#fff',
    },
    Copyright: {
        marginTop: 100,
        alignItems: 'center',
        // backgroundColor: '#4169E1'
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        borderColor: '#57B0FF',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#63B8FF'
    },
    login_button: {
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        borderColor: '#26c474',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#26c474'
    },
    thumbnail: {
        height: 220,
    },
    bottom: {
        padding: 10,
        height: 100,
    }
});

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        isRegister: store.userStore.isRegister,
        user: store.userStore.user,
        status: store.userStore.status,
    }
}

export default connect(select)(LoginPage);