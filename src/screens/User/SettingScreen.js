import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'; //弹窗
import currentLanguages from '../../config/currentLanguages';

import colorSchema from '../../theme/colorSchema';

const ACCESS_TOKEN = 'access_token';
const MOBILE = 'mobile';
const FUND_PASSWORD = 'fund_password';

let personalSecurity = [
  {
    title: '资金密码',
    right: '未设置',
    navigate: 'FundPassword'
  },
  {
    title: '放币使用指纹',
    right: '不使用',
    navigate: '',
  },
]

let accountSecurity = [
  {
    title: '绑定手机号',
    right: '未绑定',
    navigate: 'Phone',
  },
  {
    title: '绑定邮箱',
    right: '未绑定',
    navigate: 'Email',
  },
  {
    title: '登陆密码',
    right: '',
    navigate: 'LoginPassword',
  },
  {
    title: '谷歌验证码',
    right: '未设置',
    navigate: 'Google',
  },
]

let language = [
  {
    title: '语言',
    right: '简体中文',
    navigate: '',
  },
]


export default class SettingScreen extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          my_language: language[0].right,
      };

      userInfoFetch = async () => {
        console.log(this.state.accessToken+"  "+this.state.mobile);
          fetch('http://52.65.228.235/api/v1/users/me', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'X-Auth-Token': this.state.accessToken,
                  'X-Auth-Mobile': this.state.mobile,
              },
              body: undefined
          })

              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                  this.state.name = responseJson.data.username;
                  this.state.title = this.state.name[0].toUpperCase();
                  this.state.counts = responseJson.data.orders_count;
                  this.state.rating = responseJson.data.rating;
                  this.state.fundPassword = responseJson.data.has_paypassword;
                  this.forceUpdate();
              })
              .catch((error) => {
                  console.log('err:' + error);
              });
      };
  }

    showActionSheet = () => {
      this.ActionSheet.show()
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
                  centerComponent={{ text: '设置', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
              <Text style={styles.category}>个人安全设置</Text>
              {
                personalSecurity.map((item, i) => (
                  <ListItem
                    containerStyle={styles.listStyle}
                    key={i}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    chevron
                    chevronColor={colorSchema.DARK_BACKGROUND_COLOR}
                    rightElement={<Text style={styles.right}>{item.right}</Text>}
                    onPress={() => { this.props.navigation.navigate(item.navigate) }}
                  />
                ))
              }
              <Text style={styles.category}>账户安全设置</Text>
              {
                accountSecurity.map((item, i) => (
                  <ListItem
                    containerStyle={styles.listStyle}
                    key={i}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    chevron
                    chevronColor={colorSchema.DARK_BACKGROUND_COLOR}
                    rightElement={<Text style={styles.right}>{item.right}</Text>}
                    onPress={() => { this.props.navigation.navigate(item.navigate) }}
                  />
                ))
              }
              <Text style={styles.category}>语言设置</Text>
              {
                language.map((item, i) => (
                  <ListItem
                    containerStyle={styles.listStyle}
                    key={i}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    chevron
                    chevronColor={colorSchema.DARK_BACKGROUND_COLOR}
                    rightElement={<Text style={styles.right}>{this.state.my_language}</Text>}
                    onPress={()=>{this.showActionSheet()}}
                  />
                ))
              }
              <ActionSheet
                ref={o => this.ActionSheet = o}
                options={['English', '简体中文',currentLanguages.COMMON.CANCEL]}
                cancelButtonIndex={2}
                destructiveButtonIndex={0}
                onPress={(index) => {
                  if (index==0) {
                    this.state.my_language='English';
                  }
                  else if(index==1) {
                    this.state.my_language='简体中文';
                  }
                  console.log(this.state.my_language);
                  this.forceUpdate();
                }}
              />
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
  right: {
      color: colorSchema.DARK_BACKGROUND_COLOR
  },
});
