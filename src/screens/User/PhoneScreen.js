import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Header, Input, Button } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

export default class PhoneScreen extends React.Component {

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
                  centerComponent={{ text: '修改手机号码', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
                  <Text style={styles.title}>当前手机号码:                                        </Text>
                  <Text style={styles.phone}>+86 136****8679</Text>
                  <Text style={styles.description}>设置手机号码将用于密码找回和资金安全认证等操作，是您账户重要的安全保障</Text>
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title="原手机号验证"
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
                            marginTop: 20,
                        }}
                    />
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR, paddingTop:20,}}>原手机号收不到验证码</Text>
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
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
    },
    title: {
      color: colorSchema.DARK_BACKGROUND_COLOR,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    phone: {
      color: colorSchema.TEXT_HEADER_COLOR_1,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    description: {
      color: colorSchema.TEXT_HEADER_COLOR_1,
      fontSize: 12,
      lineHeight: 20,
      fontWeight: 'bold',
      marginBottom: 20,
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
