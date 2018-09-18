import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

export default class EmailScreen extends React.Component {

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
                  centerComponent={{ text: '绑定邮箱', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'请输入邮箱地址'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                  />
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
                        placeholder={'请输入验证码'}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                            marginBottom:25,
                        }}
                        errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                    />
                    <Text style={styles.authTitle}>绑定邮箱将用于密码找回和资金安全认证等操作，是您账户重要的安全保障</Text>
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title="确定"
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
});
