import React from 'react';
import { StyleSheet, Text, View, Image, ActionSheetIOS } from 'react-native';
import { Header, Button } from 'react-native-elements';
import currentLanguages from '../../../config/currentLanguages';
import colorSchema from '../../../theme/colorSchema';

const info = {
  description: '点点OTC交易平台是个人与个人之间交易的场外交易平台，由专业的国际化团队研发与运营，专注于为全球用户提供便捷，可依赖的区块链服务；致力于打造国际化的区块链资产平台。',
  update: '升级到最新版本'
}
var BUTTONS = [
  'Delete',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 1;

export default class AboutUsScreen extends React.Component {
    constructor(props) {
      super(props);
      const { navigation } = this.props;
      this.state = {
          isEdit: false,
          access_token: navigation.getParam('access_token'),
          mobile: navigation.getParam('mobile'),
          status: navigation.getParam('status'),
          id: navigation.getParam('id'),
          created_at: navigation.getParam('created_at'),
          price: navigation.getParam('margin_price'),
          min: navigation.getParam('min'),
          max: navigation.getParam('max'),
          currency: navigation.getParam('currency'),
          min_price: navigation.getParam('min_price'),
          ad_no: navigation.getParam('ad_no'),
          payments: navigation.getParam('payments'),
          due_time: navigation.getParam('due_time'),
          remark: navigation.getParam('remark'),
          coin: navigation.getParam('coin'),
          ad_type: navigation.getParam('ad_type'),
          margin: navigation.getParam('margin'),
      };

      this.printLog = this.printLog.bind(this);
    }

    printLog(){
      console.log(this.state.ad_no);
    }

    showActionSheet() {
      ActionSheetIOS.showActionSheetWithOptions({
        message: 'Would you like to DELETE this advertisement?',
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        // tintColor: ,
      },
      (buttonIndex) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
        if (buttonIndex == 0) {
          this.adsDelete();
        }
      });
    }

    adsDelete = async () => {
      fetch(
        "http://52.65.228.235/api/v1/advertisements/" + this.state.id ,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.access_token,
            'X-Auth-Mobile': this.state.mobile,
          },
          body: undefined
        }
      )
        .then(response => response.json())
        .then(responseJson => {
           if(responseJson.status == 200) {
             console.log('DELETED');
             const {navigate,goBack,state} = this.props.navigation;
             state.params.callback(this.state.isEdit);
             this.props.navigation.goBack();
           }
        })
        .catch(error => {
          console.log("err:" + error);
        });
    };
    changeStatus = async () => {
      fetch(
        "http://52.65.228.235/api/v1/advertisements/" + this.state.id + "/toggle_status",
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.access_token,
            'X-Auth-Mobile': this.state.mobile,
          },
          body: undefined
        }
      )
        .then(response => response.json())
        .then(responseJson => {
           if(responseJson.status == 200) {
             this.state.isEdit = true;
             console.log('Toggled Status: '+this.state.status);
           }
        })
        .catch(error => {
          console.log("err:" + error);
        });
    };
    render() {
        return (
            <View style={styles.container}>
              <Header
                  statusBarProps={{ barStyle: 'light-content' }}
                  leftComponent={{
                      icon: 'chevron-left',
                      color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                      onPress: () => {
                        const {navigate,goBack,state} = this.props.navigation;
                        state.params.callback(this.state.isEdit);
                        this.props.navigation.goBack();
                      }
                  }}
                  centerComponent={{ text: this.state.status=='available'?currentLanguages.ADVERTISEMENT_PAGE.IN_PROGRESS:currentLanguages.ADVERTISEMENT_PAGE.UNAVAILABLE, style: { color: colorSchema.TEXT_HEADER_COLOR_1, paddingLeft:15, } }}
                  rightComponent={
                    <Text
                      onPress={()=>{
                        this.state.status=='available'?this.setState({
                          status: 'disabled',
                        }):this.setState({
                          status: 'available',
                        });
                        this.changeStatus();
                      }
                    }
                      style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR}}>{ this.state.status=='available'?currentLanguages.ADVERTISEMENT_PAGE.UNAVAILABLE:currentLanguages.ADVERTISEMENT_PAGE.POST }
                    </Text>
                  }
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
              <View style={styles.time}>
                <Text style={{color: colorSchema.TEXT_HEADER_COLOR_3, textAlign: 'center', fontSize:16,}}>{currentLanguages.ADVERTISEMENT_PAGE.CREATED_AT + " " + this.state.created_at}</Text>
              </View>

              <View style={styles.formView}>
                <View style={styles.info_light}>
                  <View style={styles.formView_2}>
                    <View style={styles.formView}>
                      <View style={styles.info_light_nopadding}>
                        <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.AD_TYPE}</Text>
                        <Text style={styles.font_strong}>{this.state.ad_type.toUpperCase()}</Text>
                      </View>
                      <View style={styles.info_light_nopadding}>
                        <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.COIN}</Text>
                        <Text style={styles.font_strong}>{this.state.coin}</Text>
                      </View>
                    </View>
                    <View style={styles.formView}>
                      <View style={styles.info_light_nopadding}>
                        <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.CURRENCY}</Text>
                        <Text style={styles.font_strong}>{this.state.currency}</Text>
                      </View>
                      <View style={styles.info_light_nopadding}>
                        <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.PREMIUM}</Text>
                        <Text style={styles.font_strong}>{this.state.margin + ' %'}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.info_dark}>
                  <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.PRICE}</Text>
                  <Text style={styles.font_strong}>{this.state.price + " " + this.state.currency}</Text>
                </View>
                <View style={styles.info_light}>
                  <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.LOWEST}</Text>
                  <Text style={styles.font_strong}>{this.state.min_price + " " + this.state.currency}</Text>
                </View>
                <View style={styles.info_dark}>
                  <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.LOWEST_VOLUME}</Text>
                  <Text style={styles.font_strong}>{this.state.min + " " + this.state.currency}</Text>
                </View>
                <View style={styles.info_light}>
                  <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.HIGHEST_VOLUME}</Text>
                  <Text style={styles.font_strong}>{this.state.max + " " + this.state.currency}</Text>
                </View>
                <View style={styles.info_dark}>
                </View>
                <View style={styles.info_dark}>
                  <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.PAYMENT_METHOD}</Text>
                  <View style={styles.payView}>
                    {this.state.payments.map(
                      (item, i) =>
                        item == "cash_deposit" ? (
                          <Image
                            key={i}
                            source={require("../../../../assets/paymenticon/cash_deposit.png")}
                            style={styles.payIcon}
                          />
                        ) : null || item == "bank_transfer" ? (
                          <Image
                            key={i}
                            source={require("../../../../assets/paymenticon/bank_transfer.png")}
                            style={styles.payIcon}
                          />
                        ) : null || item == "alipay" ? (
                          <Image
                            key={i}
                            source={require("../../../../assets/paymenticon/alipay.png")}
                            style={styles.payIcon}
                          />
                        ) : null || item == "wepay" ? (
                          <Image
                            key={i}
                            source={require("../../../../assets/paymenticon/wepay.png")}
                            style={styles.payIcon}
                          />
                        ) : null
                    )}
                  </View>
                </View>
                <View style={styles.info_dark}>
                  <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.PAYMENT_TERM}</Text>
                  <Text style={styles.font_strong}>{this.state.due_time + " " + currentLanguages.ADVERTISEMENT_PAGE.MINUTES}</Text>
                </View>

                <View style={styles.info_dark}>
                  <Text style={styles.font}>{currentLanguages.ADVERTISEMENT_PAGE.MESSAGE}</Text>
                  <Text style={styles.font_strong}>{this.state.remark}</Text>
                </View>

                <View style={styles.info_dark}>
                  <Text style={styles.font}>仅限于自己信任的用户与本广告交易</Text>
                </View>

                <View style={styles.info_dark}>
                  <Text style={styles.font}>仅限于实名认证的用户与本广告交易</Text>
                </View>

                <View style={styles.info_dark}>
                </View>
                <View style={styles.info_dark}>
                </View>
                <View style={styles.info_dark}>
                </View>

                <View style={styles.info_dark}>
                  <View style={styles.buttonView}>
                      <Button
                          title={currentLanguages.SETTING_PAGE.EDIT}
                          disabled={false}
                          titleStyle={{
                              fontSize: 16,
                              color: colorSchema.DARK_UI_BACKGROUND_COLOR,
                          }}
                          buttonStyle={{
                              backgroundColor: colorSchema.BTN_BACKGROUND_COLOR_1,
                              borderColor: 'transparent',
                              borderWidth: 0,
                              borderRadius: 5,
                              height: 40,
                          }}
                          containerStyle={{
                          }}
                          onPress={()=>{
                            this.props.navigation.navigate('Edit',{
                              access_token: this.state.accessToken,
                              mobile: this.state.mobile,
                              ad_no: this.state.ad_no,
                              id: this.state.id,
                              ad_type: this.state.ad_type,
                              currency_type: this.state.currency_type,
                              margin: this.state.margin,
                              min: this.state.min,
                              max: this.state.max,
                              remark: this.state.remark,
                              beneficiary_account: this.state.beneficiary_account,
                              due_time: this.state.due_time,
                              status: this.state.status,
                              currency: this.state.currency,
                              coin: this.state.coin,
                              payments: this.state.payments,
                              min_price: this.state.min_price,
                              created_at: this.state.created_at,
                              margin_price: this.state.margin_price,
                              remaining_quantity: this.state.remaining_quantity,
                            });
                          }}
                      />
                  </View>
                  <View style={styles.buttonView}>
                      <Button
                          title={currentLanguages.ADVERTISEMENT_PAGE.DELETE}
                          disabled={false}
                          titleStyle={{
                              fontSize: 16,
                              color: colorSchema.DARK_UI_BACKGROUND_COLOR,
                          }}
                          buttonStyle={{
                              backgroundColor: colorSchema.BTN_BACKGROUND_COLOR_3,
                              borderColor: 'transparent',
                              borderWidth: 0,
                              borderRadius: 5,
                              height: 40,
                          }}
                          containerStyle={{
                          }}
                          onPress={()=>{
                            this.showActionSheet();
                          }}
                      />
                  </View>
                </View>
                <View style={styles.info_dark}>
                </View>
                <View style={styles.info_dark}>
                </View>
                <View style={styles.info_dark}>
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
    },
    font: {
      fontSize: 14,
      paddingTop:2,
      textAlign: 'left',
      color: colorSchema.TEXT_HEADER_COLOR_3,
      flex:1,
    },
    font_strong: {
      fontSize: 16,
      textAlign: 'right',
      color: colorSchema.TEXT_HEADER_COLOR_1,
      flex:1,
    },
    time: {
      backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
      paddingTop:10,
      paddingBottom:30,
      borderBottomWidth: 0,

    },
    info_light: {
      backgroundColor: colorSchema.ORDER_BACKGROUND_COLOR,
      paddingBottom:10,
      paddingTop:10,
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    info_light_nopadding: {
      backgroundColor: colorSchema.ORDER_BACKGROUND_COLOR,
      paddingBottom:10,
      paddingTop:10,
      paddingRight:10,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    info_dark: {
      backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
      paddingBottom:10,
      paddingTop:10,
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    formView: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        flex: 1,
    },
    formView_2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    payView: {
      flex: 3,
      flexDirection: "row-reverse"
    },
    payIcon: {
      marginLeft: 8,
      alignSelf: "flex-end",
      width: 22,
      height: 22
    },
    buttonView: {
      flex:1,
      paddingLeft:5,
      paddingRight:5,
    },
});
