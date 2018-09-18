import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

export default class SearchAdScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>

              <View style={styles.info}>
                <View style={styles.formView}>
                  <Input
                    rightIcon={
                      <View style={styles.right}>
                      <Button
                        title='BTC'
                        titleStyle={{
                            fontSize: 15,
                            paddingRight: 0,
                            color: colorSchema.TEXT_HEADER_COLOR_1,
                            backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
                        }}
                      />
                      <Icon
                        name='arrow-drop-down'
                        color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                        size={35}
                      />
                    </View>}
                      keyboardAppearance='dark'
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'选择币种'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_1}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                  />
                  <Input
                    rightIcon={
                      <View style={styles.right}>
                      <Button
                        title='中国'
                        titleStyle={{
                            fontSize: 15,
                            paddingRight: 0,
                            color: colorSchema.TEXT_HEADER_COLOR_1,
                            backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
                        }}
                      />
                      <Icon
                        name='arrow-drop-down'
                        color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                        size={35}
                      />
                    </View>}
                      keyboardAppearance='dark'
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'所 在 地'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_1}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                  />
                  <Input
                    rightIcon={
                      <View style={styles.right}>
                      <Button
                        title='选择付款方式'
                        titleStyle={{
                            fontSize: 15,
                            paddingRight: 0,
                            color: colorSchema.TEXT_HEADER_COLOR_1,
                            backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
                        }}
                      />
                      <Icon
                        name='arrow-drop-down'
                        color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                        size={35}
                      />
                    </View>}
                      keyboardAppearance='dark'
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'付款方式'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_1}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                  />
                  <Input
                    rightIcon={
                      <View style={styles.right}>
                      <Button
                        title='人民币'
                        titleStyle={{
                            fontSize: 15,
                            paddingRight: 0,
                            color: colorSchema.TEXT_HEADER_COLOR_1,
                            backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
                        }}
                      />
                      <Icon
                        name='arrow-drop-down'
                        color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                        size={35}
                      />
                    </View>}
                      keyboardAppearance='dark'
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'货币类型'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_1}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                          marginBottom:15,
                      }}
                      errorStyle={{ color: colorSchema.INPUT_FIELD_TIPS_COLOR }}
                  />
                  <Input
                    rightIcon={
                      <View style={styles.right}>
                      <Input
                        placeholder={'最低价'}
                        inputStyle={{
                            color: colorSchema.TEXT_HEADER_COLOR_1,
                            fontSize:15,
                        }}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_1}
                        containerStyle={{
                            width:30,
                        }}
                      />
                    </View>}
                      keyboardAppearance='dark'
                      shake={false}
                      autoFocus={false}
                      autoCorrect={false}
                      returnKeyType='next'
                      inputStyle={{
                          color: colorSchema.TEXT_HEADER_COLOR_1,
                          fontSize:15,
                      }}
                      placeholder={'价格区间'}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_1}
                      containerStyle={{
                          borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
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
    right: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    buttonView: {

    },
});
