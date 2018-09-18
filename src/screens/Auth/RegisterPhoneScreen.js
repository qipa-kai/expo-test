import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';

import PhoneInput from '../../components/PhoneInput/index';
import Verification from '../../components/VerificationCode/index';

import currentLanguages from '../../config/currentLanguages';
import colorSchema from '../../theme/colorSchema';

export default class RegisterPhoneScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input_validation_code: null,
            input_sms_code: "",
            validation_code: null,
            sms_code: null,
            isUserPhone: true,
            isValidationCode: true,
            isSmsCode: true,
            isSentSMS: false,

            isPhoneValid: "",
            getPhoneNumberLineType: "",

            // api data
            country_code: "",
            mobile: ""
        };

        this.sendVerificationCodeFetch = this.sendVerificationCodeFetch.bind(this);
        this.updatePhoneNumberInfo = this.updatePhoneNumberInfo.bind(this);
        this.printLog = this.printLog.bind(this);
        this.navToSignUp = this.navToSignUp.bind(this);
    }

    updatePhoneNumberInfo() {
        this.setState({
            isPhoneValid: this.phone.isValidNumber(),
            getPhoneNumberLineType: this.phone.getNumberType(),
            country_code: this.phone.getUnFormattedDialCode(),
            mobile: this.phone.getUnFormattedValue()
        });
    }

    sendVerificationCodeFetch = async () => {
        fetch('http://52.65.228.235/api/v1/sms/send?country_code=' + this.state.country_code + '&mobile=' + this.state.mobile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: undefined
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.state.sms_code = responseJson.data.code;
            })
            .catch((error) => {
                console.log('err:' + error);
            });
    };

    _checkValidationCode = () => {
      if (this.state.validation_code.toLowerCase() !== this.state.input_validation_code.toLowerCase()) {
        this.state.isValidationCode = false;
        this.forceUpdate();
      }
      else {
        this.state.isValidationCode = true;
        this.forceUpdate();
      }
    };
    _checkSmsCode = () => {
      if (this.state.sms_code !== this.state.input_sms_code) {
        this.state.isSmsCode = false;
        this.forceUpdate();
      }
      else {
        this.state.isSmsCode = true;
        this.forceUpdate();
      }
    }

    navToSignUp = () => {

      if(this.state.isSmsCode && this.state.isValidationCode) {
        this.props.navigation.navigate('UserRegister', {
            country_code: this.state.country_code,
            mobile: this.state.mobile,
        });
      }

    }

    printLog(){
        console.log(this.state.mobile);
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

                <Text style={styles.authTitle}>SIGN UP</Text>

                <View style={styles.formView}>
                    <PhoneInput
                        ref={ref => {
                            this.phone = ref;
                        }}
                        initialCountry={'au'}
                        onChangePhoneNumber={this.updatePhoneNumberInfo}
                    />
                </View>

                <View style={styles.formView}>
                    <Input
                        keyboardAppearance='dark'
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        returnKeyType='next'
                        value={this.state.input_validation_code}
                        onChangeText={(input_validation_code) => this.setState({input_validation_code})}
                        inputStyle={{
                            marginLeft: 10,
                            color: colorSchema.TEXT_HEADER_COLOR_1
                        }}
                        placeholder={currentLanguages.SIGN_UP_PAGE.VALIDATION_CODE}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            marginTop: 20,
                            height: 45,
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isValidationCode ? '' : currentLanguages.SIGN_UP_PAGE.INCORRECT_VALIDATION_CODE}
                        rightIcon={
                            <Verification
                                type={'number'}
                                getValue={(value)=>{console.log(value);this.state.validation_code=value;}}
                            />
                        }
                    />

                </View>

                <View style={styles.formView}>
                    <Input
                        keyboardAppearance='dark'
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        keyboardType='numeric'
                        returnKeyType='next'
                        value={this.state.input_sms_code}
                        onChangeText={(input_sms_code) => this.setState({input_sms_code})}
                        inputStyle={{
                            marginLeft: 10,
                            color: colorSchema.TEXT_HEADER_COLOR_1
                        }}
                        placeholder={currentLanguages.SIGN_UP_PAGE.INPUT_SMS_CODE}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            marginTop: 20,
                            height: 45,
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isSmsCode ? '' : currentLanguages.SIGN_UP_PAGE.INCORRECT_SMS_CODE}
                        rightIcon={
                            <Button
                                title={currentLanguages.SIGN_UP_PAGE.SEND_CODE}
                                clear
                                titleStyle={{
                                    color: colorSchema.MAIN_UI_ACTIVE_COLOR
                                }}
                                containerStyle={{
                                    height: 45
                                }}
                                disabled={this.state.isSentSMS}
                                onPress={
                                    this.sendVerificationCodeFetch
                                }
                            />
                        }
                    />
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title={currentLanguages.SIGN_UP_PAGE.NEXT}
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
                        onPress={()=>{this._checkValidationCode();this._checkSmsCode();this.navToSignUp();}}
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
