import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Header, Input, Button } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

export default class SearchUserScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>

              <View style={styles.info}>
                <View style={styles.formView}>
                  <Input
                      keyboardAppearance='dark'
                      secureTextEntry={true}
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'请输入用户名称'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_1}
                      containerStyle={{
                          borderBottomColor: colorSchema.TEXT_HEADER_COLOR_1,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                  />

                </View>

                <View style={styles.buttonView}>
                    <Button
                        title="搜索"
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
      backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
      paddingBottom:80,
      paddingTop:40,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
    },
    formView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    buttonView: {

    },
});
