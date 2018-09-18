import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Header, ListItem } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

const normal = [
  {
    title: '账户无法登陆怎么办',
  },
  {
    title: '如何提交工单',
  },
]

const transaction = [
  {
    title: '如何提交申诉',
  },
  {
    title: '遇到交易纠纷怎么处理',
  },
  {
    title: '交易对方响应太慢或无响应怎么办',
  },
  {
    title: '数字货币托管',
  },
]

const withdrawal = [
  {
    title: '提现到错误地址怎么办',
  },
]


export default class HelpScreen extends React.Component {
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
                  centerComponent={{ text: '帮助中心', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
              <Text style={styles.category}>常见疑问</Text>
              {
                normal.map((item, i) => (
                  <ListItem
                    containerStyle={styles.listStyle}
                    key={i}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                  />
                ))
              }
              <Text style={styles.category}>交易问题</Text>
              {
                transaction.map((item, i) => (
                  <ListItem
                    containerStyle={styles.listStyle}
                    key={i}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                  />
                ))
              }
              <Text style={styles.category}>充值提现</Text>
              {
                withdrawal.map((item, i) => (
                  <ListItem
                    containerStyle={styles.listStyle}
                    key={i}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                  />
                ))
              }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colorSchema.DARK_BACKGROUND_COLOR
  },
  category: {
    padding: 15,
  },
  listStyle: {
      borderBottomColor: colorSchema.DARK_BACKGROUND_COLOR,
      borderBottomWidth: 1,
      backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
      height: 60,
  },
  titleStyle: {
      color: colorSchema.TEXT_HEADER_COLOR_1
  },
});
