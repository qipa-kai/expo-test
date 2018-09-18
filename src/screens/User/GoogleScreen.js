import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

export default class GoogleScreen extends React.Component {

    constructor(props) {
        super(props);
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
                  centerComponent={{ text: '设置谷歌验证码', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
              <View style={styles.account}>
                <Text style={styles.authTitle}>在 App Store 中搜索 Google Authenticator 下载应用，通过谷歌验证器扫一扫或者复制密钥添加到谷歌验证器</Text>
                <Text style={styles.authTitleYellow}>查看详细教程</Text>
                <View style={styles.img}>
                  <Image
                    style={{ width:120, height:120, marginBottom:30, marginTop:20,}}
                    source={require('../../../assets/qrcode.jpg')}
                  />
              </View>
                <Text style={styles.auth}>账户名称: cfergergfewqfwe    <Icon name='launch' size={15} color={colorSchema.MAIN_UI_ACTIVE_COLOR}/></Text>
                <Text style={styles.auth}>账户密钥: 2v3353GDFGFGrgtrh    <Icon name='launch' size={15} color={colorSchema.MAIN_UI_ACTIVE_COLOR}/></Text>
              </View>
              <View style={styles.info}>
                <View style={styles.formView}>
                  <Input
                    rightIcon={
                      <Button
                        title='获取验证码'
                        titleStyle={{
                            fontSize: 14,
                            color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                            backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
                        }}
                      />}
                      keyboardAppearance='dark'
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'请输入短信验证码'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                      rightComponent={{
                          title: '获取验证码',
                          color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          onPress: () => console.log('SIGN UP')
                      }}
                  />
                    <Input
                        keyboardAppearance='dark'
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        returnKeyType='next'
                        inputStyle={{
                            color: colorSchema.TEXT_HEADER_COLOR_1,
                            fontSize:15,
                        }}
                        placeholder={'请输入谷歌验证码'}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                            marginBottom:5,
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                    />
                    <Text style={styles.authTitle}>请勿随意删除谷歌验证器绑定的谷歌验证码</Text>
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title="验证并启用"
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
                    />
                </View>
            </View>
          </View>


        );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
        width: Dimensions.get('window').width,
    },
    account: {
      padding:10,
      marginBottom:20,
    },
    info: {
      backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
      paddingBottom:80,
      paddingTop:40,
      paddingLeft: 20,
      paddingRight: 20,
    },
    auth: {
        color: colorSchema.TEXT_HEADER_COLOR_1,
        fontSize: 12,
        paddingLeft:10,
        paddingRight:10,
        fontWeight: 'bold',

    },
    authTitle: {
        color: colorSchema.TEXT_HEADER_COLOR_1,
        fontSize: 12,
        lineHeight: 20,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20,
        fontWeight: 'bold',
    },
    authTitleYellow: {
        fontSize: 14,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        fontWeight: 'bold',
        color: colorSchema.MAIN_UI_ACTIVE_COLOR,
    },
    formView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
        marginBottom: 30,
    },
    img: {
      justifyContent: 'center',
      alignItems: 'center',
    },
});
