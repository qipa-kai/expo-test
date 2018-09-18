import React from 'react';
import {Dimensions, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';

import currentLanguages from '../../config/currentLanguages';
import colorSchema from '../../theme/colorSchema';

const ACCESS_TOKEN = 'access_token';
const MOBILE = 'mobile';
const FUND_PASSWORD = 'fund_password';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // api data
            login: '',
            password: '',

            isUserPhone: true,
            isPassword: true,

        };

        this.printLog = this.printLog.bind(this);
        this.sendLoginFetch = this.sendLoginFetch.bind(this);
    }

    sendLoginFetch = async () => {
        fetch('http://52.65.228.235/api/v1/sign_in?login=' + this.state.login + '&password=' + this.state.password, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: undefined
        })
            .then((response) => response.json())
            .then((responseJson) => {
                AsyncStorage.setItem(ACCESS_TOKEN, responseJson.data.access_token);
                AsyncStorage.setItem(MOBILE, responseJson.data.mobile);
                AsyncStorage.setItem(FUND_PASSWORD, responseJson.data.has_paypassword);
                this.props.navigation.navigate('Main')
            })
            .catch((error) => {
                console.log('err:' + error);
            });
    };

    printLog() {
        console.log(this.state.password);
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={{
                        icon: 'chevron-left',
                        color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                        onPress: () => { this.props.navigation.navigate('Trade') }
                    }}
                    placement="right"
                    centerComponent={{
                        text: currentLanguages.SIGN_UP_PAGE.SIGN_UP,
                        style: {
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: colorSchema.MAIN_UI_ACTIVE_COLOR
                        },
                        onPress: () => { this.props.navigation.navigate('Register') }
                    }}
                    rightComponent={{
                        icon: 'add',
                        color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                        onPress: () => { this.props.navigation.navigate('Register') }
                    }}
                    outerContainerStyles={{
                        backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
                        height: 100,
                        borderBottomWidth: 0
                    }}
                    innerContainerStyles={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                />

                <Text style={styles.authTitle}>{currentLanguages.LOGIN_PAGE.LOGIN}</Text>

                <View style={styles.formView}>
                    <Input
                        keyboardAppearance='dark'
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        keyboardType='numeric'
                        returnKeyType='next'
                        inputStyle={{
                            marginLeft: 10,
                            color: colorSchema.TEXT_HEADER_COLOR_1
                        }}
                        placeholder={currentLanguages.LOGIN_PAGE.INPUT_USERNAME_OR_PHONE}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            marginTop: 20,
                            height: 45,
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isUserPhone ? '' : currentLanguages.LOGIN_PAGE.INVALID_USERNAME_OR_PHONE}
                        onChangeText={(login) => this.setState({login})}
                    />
                </View>

                <View style={styles.formView}>
                    <Input
                        keyboardAppearance='dark'
                        secureTextEntry={true}
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        returnKeyType='next'
                        inputStyle={{
                            marginLeft: 10,
                            color: colorSchema.TEXT_HEADER_COLOR_1
                        }}
                        placeholder={currentLanguages.LOGIN_PAGE.INPUT_YOUR_PASSWORD}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isPassword ? '' : currentLanguages.LOGIN_PAGE.INVALID_PASSWORD}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title={currentLanguages.LOGIN_PAGE.LOGIN}
                        disabled={false}
                        titleStyle={{
                            fontWeight: '700',
                            color: colorSchema.DARK_UI_BACKGROUND_COLOR,
                        }}
                        buttonStyle={{
                            backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        containerStyle={{
                            marginTop: 20,
                            height: 45
                        }}
                        onPress={
                            this.sendLoginFetch
                        }
                    />

                    <Button
                        title={currentLanguages.LOGIN_PAGE.FORGOT_PASSWORD}
                        clear
                        titleStyle={{
                            color: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        containerStyle={{
                            marginTop: 20,
                            height: 45
                        }}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
        width: Dimensions.get('window').width,
    },
    authTitle: {
        color: colorSchema.TEXT_HEADER_COLOR_1,
        fontSize: 40,
        padding: 20,
        fontWeight: 'bold',
    },
    formView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
        padding: 20,
    },
});
