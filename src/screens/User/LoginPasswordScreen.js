import React from 'react';
import {Dimensions, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import lanEN from '../../theme/languages/lanEN';

import colorSchema from '../../theme/colorSchema';

const ACCESS_TOKEN = 'access_token';
const MOBILE = 'mobile';

export default class LoginPasswordScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oldpassword: null,
            password: null,
            repassword: null,
            isOldPassword: true,
            isPassword: true,
            isRepassword: true,
            isSamePassword: true,
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        const mob = await AsyncStorage.getItem(MOBILE);
        if (token && mob) {
            this.setState({ accessToken: token });
            this.setState({ mobile: mob });
            console.log('user token: ' + token);
            console.log('user mobile: ' + mob);
        } else {
            this.setState({ accessToken: false });
        }
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
                  centerComponent={{ text: lanEN.SETTING_PAGE.SET_LOGIN_PASSWORD, style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
              <View style={styles.info}>
                <View style={styles.formView}>
                  <Input
                      keyboardAppearance='dark'
                      secureTextEntry={true}
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      value={this.state.oldpassword}
                      onChangeText={(oldpassword) => this.setState({oldpassword})}
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={lanEN.SETTING_PAGE.INPUT_PREVIOUS_PASSWORD}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                      errorMessage={this.state.isOldPassword ? '' : lanEN.SETTING_PAGE.INCORRECT_OLD_PASSWORD}
                  />

                  <Input
                      keyboardAppearance='dark'
                      secureTextEntry={true}
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      value={this.state.password}
                      onChangeText={(password) => this.setState({password})}
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={lanEN.SETTING_PAGE.SET_PASSWORD}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                      errorMessage={this.state.isPassword ? '' : lanEN.SETTING_PAGE.INCORRECT_PASSWORD_FORMAT}
                  />
                    <Input
                        keyboardAppearance='dark'
                        secureTextEntry={true}
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        returnKeyType='next'
                        value={this.state.repassword}
                        onChangeText={(repassword) => this.setState({repassword})}
                        inputStyle={{
                            color: colorSchema.TEXT_HEADER_COLOR_1,
                            fontSize:15,
                        }}
                        placeholder={lanEN.SETTING_PAGE.CONFIRM_PASSWORD}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                            marginBottom:25,
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                        errorMessage={this.state.isRepassword ? '' : lanEN.SETTING_PAGE.INCORRECT_PASSWORD_REINPUT}
                    />
                    <Text style={styles.authTitle}>设置登陆密码将用于数字资产的提款，保护您的数字资产不被他人轻易盗用</Text>
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title={lanEN.SETTING_PAGE.EDIT}
                        disabled={false}
                        titleStyle={{
                            fontSize: 20,
                            color: colorSchema.DARK_UI_BACKGROUND_COLOR,
                        }}
                        buttonStyle={{
                            backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 5,
                            height: 40,
                        }}
                        containerStyle={{
                        }}
                        onPress={()=>{this._checkPassword();this._checkRepassword();this._savePassword();}}
                    />
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR, paddingTop:20,}}>忘记密码</Text>
                </View>
            </View>
          </View>


        );
    }


 _checkPassword = () => {
   //校验密码：至少8-20个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
   var patrn=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
   if (!patrn.exec(this.state.password) || this.state.password == null) {
     this.state.isPassword = false;
     this.forceUpdate();
   }
   else {
     this.state.isPassword = true;
     this.forceUpdate();
   }
 };

 _checkRepassword = () => {
   if ((this.state.repassword != this.state.password) || this.state.repassword == null) {
     this.state.isRepassword = false;
     this.forceUpdate();
   }
   else {
     this.state.isRepassword = true;
     this.forceUpdate();
   }
 };

 _savePassword = () => {
   if (this.state.isPassword && this.state.isRepassword) {
     console.log("old:"+this.state.oldpassword);
     console.log("new:"+this.state.password);
     fetch('http://52.65.228.235/api/v1/users/reset_password?action_type=modify&old_password=' + this.state.oldpassword + '&new_password=' + this.state.password + '&new_password_confirmation=' + this.state.repassword, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'X-Auth-Token': this.state.accessToken,
             'X-Auth-Mobile': this.state.mobile,
         },
         body: undefined
     })
         .then((response) => response.json())
         .then((responseJson) => {
             if(responseJson.result) {
               console.log("all correct");
               this.props.navigation.navigate('Main');
             }
             else{
               this.state.isOldPassword = false;
               this.forceUpdate();
             }
             console.log(responseJson);

         })
         .catch((error) => {
             console.log('err:' + error);
         });

     this.forceUpdate();
   }
   else {
     console.log("something is wrong");
     this.forceUpdate();
   }
 };





}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
        width: Dimensions.get('window').width,
    },
    info: {
      backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
      paddingBottom:80,
      paddingTop:40,
      marginTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    authTitle: {
        color: colorSchema.TEXT_HEADER_COLOR_1,
        fontSize: 12,
        lineHeight: 20,
        padding:10,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    formView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
        marginBottom: 30,
    },
    buttonView: {

    },
});
