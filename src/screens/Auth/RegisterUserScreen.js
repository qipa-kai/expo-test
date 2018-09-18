import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';

import currentLanguages from '../../config/currentLanguages';
import colorSchema from '../../theme/colorSchema';



export default class RegisterUserScreen extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            // api data from pre page
            country_code: navigation.getParam('country_code'),
            mobile: navigation.getParam('mobile'),
            // api data
            username: '',
            password: '',
            password_confirmation: '',
            invite_code: '',

            // validation
            isUsername: true,
            isPassword: true,
            isRePassword: true,

        };

        this.printLog = this.printLog.bind(this);
        this.sendRegisterFetch = this.sendRegisterFetch.bind(this);
    }

    sendRegisterFetch = async () => {
        fetch('http://52.65.228.235/api/v1/sign_up?' +
            'country_code=' + this.state.country_code +
            '&mobile=' + this.state.mobile +
            '&username=' + this.state.username +
            '&password=' + this.state.password +
            '&password_confirmation=' + this.state.password_confirmation +
            '&invite_code=' + this.state.invite_code,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: undefined
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.log('err:' + error);
            });
    };

    printLog(){
        console.log(this.state.country_code);
        console.log(this.state.mobile);
        console.log(this.state.username);
        console.log(this.state.password);
        console.log(this.state.password_confirmation);
        console.log(this.state.invite_code);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={{
                        icon: 'chevron-left',
                        color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                        onPress: () => { this.props.navigation.goBack() }
                    }}
                    placement="right"
                    centerComponent={{
                        text: currentLanguages.SIGN_UP_PAGE.LOGIN,
                        style: {
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: colorSchema.MAIN_UI_ACTIVE_COLOR
                        },
                        onPress: () => { this.props.navigation.navigate('Login') }
                    }}
                    rightComponent={{
                        icon: 'account-circle',
                        color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                        onPress: () => { this.props.navigation.navigate('Login') }
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

                <Text style={styles.authTitle}>{currentLanguages.SIGN_UP_PAGE.SIGN_UP}</Text>

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
                        placeholder={currentLanguages.SIGN_UP_PAGE.INPUT_USERNAME}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            marginTop: 20,
                            height: 45,
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isUsername ? '' : currentLanguages.SIGN_UP_PAGE.INVALID_USERNAME}
                        onChangeText={(username) => this.setState({username})}
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
                        placeholder={currentLanguages.SIGN_UP_PAGE.INPUT_PASSWORD}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isPassword ? '' : currentLanguages.SIGN_UP_PAGE.INVALID_PASSWORD}
                        onChangeText={(password) => this.setState({password})}
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
                        placeholder={currentLanguages.SIGN_UP_PAGE.REINPUT_PASSWORD}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isRePassword ? '' : currentLanguages.SIGN_UP_PAGE.INVALID_REPASSWORD}
                        onChangeText={(password_confirmation) => this.setState({password_confirmation})}
                    />
                </View>

                <View style={styles.formView}>
                    <Input
                        keyboardAppearance='dark'
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        returnKeyType='next'
                        inputStyle={{
                            marginLeft: 10,
                            color: colorSchema.TEXT_HEADER_COLOR_1
                        }}
                        placeholder={currentLanguages.SIGN_UP_PAGE.INPUT_INVITATION_CODE}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            marginTop: 20,
                            height: 45,
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        onChangeText={(invite_code) => this.setState({invite_code})}
                    />
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title={currentLanguages.SIGN_UP_PAGE.SIGN_UP}
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
                            this.sendRegisterFetch
                        }
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
    }
});
