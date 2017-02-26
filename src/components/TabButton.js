'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/main';


//单粒按钮
class TabButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this._press = this._press.bind(this);
    }

    _press(o) {
        this.props.actions.changePage(o);
        this.props.actions.changeSideBar('normal');
    }


    render() {
        if (this.props.page == this.props.thisPage) {
            return (
                <View style={styles.row_box}>
                    <TouchableHighlight style={styles.touch_high} onPress={()=>{this._press(this.props.thisPage)}}
                                        underlayColor="#008000">
                        <Text style={styles.high_text}>{this.props.name}</Text>
                    </TouchableHighlight>
                </View>
            )
        } else {
            return (
                <View style={styles.row_box}>
                    <TouchableHighlight style={styles.touch_high} onPress={()=>{this._press(this.props.thisPage)}}
                                        underlayColor="#008000">
                        <Text style={styles.text}>{this.props.name}</Text>
                    </TouchableHighlight>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    row_box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },
    text: {
        color: '#cacabc'
    },
    high_text: {
        textDecorationLine: 'underline',
        color: '#f6fdff',
    },
    touch_high: {
        marginTop: 20,
    },
})

function select(store) {
    return {
        page: store.mainStore.status,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(select, mapDispatchToProps)(TabButton);