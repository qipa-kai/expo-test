import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View, Alert, ScrollView, AsyncStorage} from 'react-native';
import { Header, Input, Button, Icon, CheckBox } from 'react-native-elements';
import currentLanguages from '../../../config/currentLanguages';
import { Dropdown } from 'react-native-material-dropdown';

import colorSchema from '../../../theme/colorSchema';

const ACCESS_TOKEN = 'access_token';
const MOBILE = 'mobile';
const type = '';
const coins = [];
const currencies = [];
const units = [];
const prices = [];
const payment_methods = [];
const coin_currencies = [];
const coin_payments = [];

export default class NewAdScreen extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            type: navigation.getParam('type'),
            coin: 'BTC',
            _coin: 0,
            currency: '人民币',
            unit: 'CNY',
            premium: '0.00',
            price: '0.00',
            limit: '',
            lowest_volume: '0.0000',
            highest_volume: '0.0000',
            payment_method: '',
            payment_term: '30',
            message: '',
            remaining_quantity: '',
            trust_only: false,
            auth_only: false,
        };
        console.log("type: "+this.state.type);

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
        this.AdInfoFetch();
    }

    AdInfoFetch = async () => {
        fetch('http://52.65.228.235/api/v1/advertisements/new?action_type=new&ad_type=fiat_ad&trade_type=' + this.state.type.toLowerCase(), {
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
              console.log(responseJson.status);
              console.log(responseJson.result);
              switch (responseJson.status) {
                case 422:
                  const {navigate,goBack,state} = this.props.navigation;
                  state.params.callback('422');
                  this.props.navigation.goBack();
                  break;
                case 200:
                  console.log(responseJson.data);

                  for (let key_coin_name in responseJson.data) {
                    console.log('Coin:'+key_coin_name);
                    var obj_coin = new Object();
                    obj_coin.value=key_coin_name;
                    coins.push(obj_coin);

                    var obj_currency = new Object();
                    var obj_unit = new Object();
                    var obj_payment_method = new Object();
                    for (let key_each_coin in responseJson.data[key_coin_name] ) {
                      console.log('Currency:'+responseJson.data[key_coin_name][key_each_coin].name);
                      console.log('Unit:'+responseJson.data[key_coin_name][key_each_coin].unit);
                      console.log('Payment Method:'+responseJson.data[key_coin_name][key_each_coin].payments);
                      console.log('Price:'+responseJson.data[key_coin_name][key_each_coin].price);
                      console.log('##########################');
                      obj_payment_method.value=responseJson.data[key_coin_name][key_each_coin].payments;
                      obj_currency.value=responseJson.data[key_coin_name][key_each_coin].name;
                      obj_unit.value=responseJson.data[key_coin_name][key_each_coin].unit;
                      prices.push(responseJson.data[key_coin_name][key_each_coin].price);
                    }
                    currencies.push(obj_currency);
                    units.push(obj_unit);
                    payment_methods.push(obj_payment_method);

                  }

                  this.state.coin = coins[0].value;
                  this.state.currency = currencies[0].value;
                  coin_currencies = currencies.slice(0,1);
                  coin_payments = this.sliceToArray(payment_methods,0);
                  this.state.price = prices[0];


                  console.log('Current Coin:'+this.state.coin);
                  console.log('Current Currency:'+this.state.currency);
                  console.log('Current Payment Method:'+this.state.payment_method);
                  console.log('============================================');

                  this.forceUpdate();
                  break;

                default:

              }

            })
            .catch((error) => {
                console.log('err:' + error);
            });
    };


    AdInfoPost = async () => {
      console.log(this.state.accessToken+"  "+this.state.mobile);
      let current_type = this.state.type.toLowerCase();

        fetch('http://52.65.228.235/api/v1/advertisements?ad_type=fiat_ad&trade_type=' + current_type +
        '&coin=' + this.state.coin + '&currency=' + this.state.currency + '&margin=' + this.state.premium +
        '&min_price=' + this.state.Lowest + '&min=' + this.state.lowest_volume +
        '&max=' + this.state.highest_volume + '&payments=' + this.state.payment_method + '&due_time=' + parseInt(this.state.payment_term) +
        '&remaining_quantity=' + this.state.remaining_quantity + '&remark=' + this.state.message , {
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
              this.props.navigation.navigate('MyAd');
            }
            else{
              this.forceUpdate();
            }
            console.log(responseJson);

        })
        .catch((error) => {
            console.log('err:' + error);
        });
    };


    sliceToArray = (arr, index) => {

      //USE 此方法用于转换原数据为适合dropdown data的格式: array[obj1,obj2,...]
      // Array [
      //  Object {
      //       "payments": Array [
      //         "cash_deposit",
      //         "bank_transfer",
      //         "wepay",
      //         "alipay",
      //       ],
      //     },
      //  ]
      // TO:
      // Array [
      //   Object {
      //     "value": "微信支付",
      //   },
      // ]
      // Array [
      //   Object {
      //     "value": "现金存款",
      //   },
      //   Object {
      //     "value": "银行转账",
      //   },
      // ]

      if (arr.length>0) {
        var array = arr[index].value;
        var result = [];
        for (var i in array){
          let temp = {value: array[i]};
          result.push(temp);
        }

        return result;
      }

      return null;

    }

    render() {

      let types = [{
        value: currentLanguages.ADVERTISEMENT_PAGE.SELL,
      }, {
        value: currentLanguages.ADVERTISEMENT_PAGE.BUY,
      },];

        return (
          <View style={styles.container}>
          <Header
              statusBarProps={{ barStyle: 'light-content' }}
              leftComponent={{
                  icon: 'chevron-left',
                  color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                  onPress: () => {
                    const {navigate,goBack,state} = this.props.navigation;
                    state.params.callback('back');
                    this.props.navigation.goBack(); }
              }}
              centerComponent={{
                  text: currentLanguages.ADVERTISEMENT_PAGE.POST,
                  style: {
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colorSchema.TEXT_HEADER_COLOR_1
                  },
              }}
              outerContainerStyles={{
                backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
                height: 100,
                borderBottomWidth: 0
              }}
              innerContainerStyles={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
          />


            <ScrollView style={styles.container}>
              <View style={styles.info}>
                <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:20, fontWeight:'bold',}}>{currentLanguages.ADVERTISEMENT_PAGE.POST_SELL}</Text>
                <Text style={{color: colorSchema.TEXT_HEADER_COLOR_3, fontSize:14, paddingTop:10,}}>{currentLanguages.ADVERTISEMENT_PAGE.POST_SELL_DETAIL}</Text>
                <View style={styles.formView}>
                  <View style={styles.item}>
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR,flex:1, fontSize:18,fontWeight:'bold', }}>* </Text>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', flex:15,}}>{currentLanguages.ADVERTISEMENT_PAGE.AD_TYPE}</Text>
                    <View style={{minWidth:100, margin:0, padding:0, height: 20,}}>
                      <Dropdown
                        style={{textAlign:'right', }}
                        label= ""
                        value= {this.state.type}
                        labelHeight={0}
                        data= {types}
                        onChangeText={(type) => {this.setState({type});this.forceUpdate();}}
                        textColor={colorSchema.TEXT_HEADER_COLOR_1}
                        itemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        selectedItemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        fontSize={16}
                        // dropdownOffset={{top: 0}}
                      />
                    </View>
                  </View>

                  <View style={styles.item}>
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR,flex:1, fontSize:18,fontWeight:'bold', }}>* </Text>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', flex:15, }}>{currentLanguages.ADVERTISEMENT_PAGE.COIN}</Text>
                    <View style={{minWidth:100, margin:0, padding:0, height: 20,}}>
                      <Dropdown
                        style={{textAlign:'right', }}
                        label= ""
                        value= {this.state.coin}
                        labelHeight={0}
                        data={coins}
                        onChangeText={(coin) => {this.setState({coin}); switch (coin) {
                          case 'BTC':
                            this.state._coin = 0;
                            this.state.currency = currencies[0].value;
                            this.state.payment_method = payment_methods[0].value[0];
                            currencies.slice(0,1);
                            coin_payments = this.sliceToArray(payment_methods,0);
                            this.state.price = prices[0];
                            break;
                          case 'ETH':
                            this.state._coin = 1;
                            this.state.currency = currencies[1].value;
                            this.state.payment_method = payment_methods[1].value[0];
                            coin_currencies = currencies.slice(1,2);
                            coin_payments = this.sliceToArray(payment_methods,1);
                            this.state.price = prices[1];
                            break;
                          case 'USDT':
                            this.state._coin = 2;
                            this.state.currency = currencies[2].value;
                            this.state.payment_method = payment_methods[2].value[2];
                            coin_currencies = currencies.slice(2);
                            coin_payments = this.sliceToArray(payment_methods,2);
                            this.state.price = prices[2];
                            break;
                          default:
                        }
                        this.forceUpdate();
                        }}
                        textColor={colorSchema.TEXT_HEADER_COLOR_1}
                        itemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        selectedItemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        fontSize={16}
                        // dropdownOffset={{top: 0}}
                      />
                    </View>
                  </View>


                  <View style={styles.item}>
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR,flex:1, fontSize:18,fontWeight:'bold', }}>* </Text>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', flex:15, }}>{currentLanguages.ADVERTISEMENT_PAGE.CURRENCY}</Text>
                    <View style={{minWidth:100, margin:0, padding:0, height: 20,}}>
                      <Dropdown
                        style={{textAlign:'right', }}
                        label= ""
                        value= {this.state.currency}
                        labelHeight={0}
                        data={coin_currencies}
                        textColor={colorSchema.TEXT_HEADER_COLOR_1}
                        itemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        selectedItemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        fontSize={16}
                        // dropdownOffset={{top: 0}}
                      />
                    </View>
                  </View>


                  <View style={styles.item}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', }}>{currentLanguages.ADVERTISEMENT_PAGE.PREMIUM}</Text>
                    <View style={{maxWidth:300, margin:0, padding:0, height: 30, flexDirection:'row'}}>
                      <TextInput
                        style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1,bottom:5,}}
                        onChangeText={(premium) => this.setState({premium})}
                        keyboardType = 'numeric'
                        placeholder={this.state.premium}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        onBlur={() => {if(this.state.premium==""){this.state.premium='0.00'; this.forceUpdate();}}}
                      /><Text style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1}}> %</Text>
                    </View>
                  </View>
                  <View style={styles.item_detail}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_3, fontSize:16, }}>
                      市场参考价格 {this.state.price} {this.state.unit}/{this.state.coin}。基于市场的溢价比例
                      市场价是根据部分大型交易所实时价格得出的，确保您的报价基于趋于一个相对合理范围，比如让前价格为1000，溢价比例为10%，
                      那么价格为1100</Text>
                  </View>


                  <View style={styles.item}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', }}>{currentLanguages.ADVERTISEMENT_PAGE.PRICE}</Text>
                    <View style={{minWidth:100, margin:0, padding:0, height: 30,}}>
                      <Text style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1, }}>
                        {parseFloat(this.state.price)*(1+parseFloat(this.state.premium)/100).toFixed(4)+' '+this.state.currency}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.item_detail}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_3, fontSize:16, }}>{currentLanguages.ADVERTISEMENT_PAGE.PRICE_DETAIL}</Text>
                  </View>

                  <View style={styles.item}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', }}>{this.state.type=='SELL'?currentLanguages.ADVERTISEMENT_PAGE.LOWEST:currentLanguages.ADVERTISEMENT_PAGE.HIGHEST}</Text>
                    <View style={{maxWidth:300, margin:0, padding:0, height: 30, flexDirection:'row'}}>
                      <TextInput
                        style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1,bottom:5, }}
                        onChangeText={limit => this.setState({limit})}
                        keyboardType = 'numeric'
                        placeholder={this.state.type=='SELL'?currentLanguages.ADVERTISEMENT_PAGE.LOWEST_DETAIL:currentLanguages.ADVERTISEMENT_PAGE.HIGHEST_DETAIL}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      /><Text style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1}}> {this.state.unit}</Text>
                    </View>
                  </View>

                  <View style={styles.item}>
                    <Text style={{flex:1, color: colorSchema.MAIN_UI_ACTIVE_COLOR, maxWidth:10, fontSize:18,fontWeight:'bold', }}>* </Text>
                    <Text style={{flex:10, color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold',}}>{currentLanguages.ADVERTISEMENT_PAGE.LOWEST_VOLUME}</Text>
                    <View style={{maxWidth:150, margin:0, padding:0, height: 30, flexDirection:'row'}}>
                      <TextInput
                        style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1,bottom:5, }}
                        onChangeText={lowest_volume => this.setState({lowest_volume})}
                        keyboardType = 'numeric'
                        placeholder={currentLanguages.ADVERTISEMENT_PAGE.LOWEST_VOLUME_DETAIL}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      />
                    </View><Text style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1}}> {this.state.unit}</Text>
                  </View>

                  <View style={styles.item}>
                    <Text style={{flex:1, color: colorSchema.MAIN_UI_ACTIVE_COLOR, maxWidth:10, fontSize:18,fontWeight:'bold', }}>* </Text>
                    <Text style={{flex:10, color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold'}}>{currentLanguages.ADVERTISEMENT_PAGE.HIGHEST_VOLUME}</Text>
                    <View style={{maxWidth:150, margin:0, padding:0, height: 30, flexDirection:'row'}}>
                      <TextInput
                        style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1,bottom:5, }}
                        onChangeText={highest_volume => this.setState({highest_volume})}
                        keyboardType = 'numeric'
                        placeholder={currentLanguages.ADVERTISEMENT_PAGE.HIGHEST_VOLUME_DETAIL}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      />
                    </View><Text style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1}}> {this.state.unit}</Text>
                  </View>


                  <View style={styles.item}>
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR,flex:1, fontSize:18,fontWeight:'bold', }}>* </Text>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', flex:10,}}>{currentLanguages.ADVERTISEMENT_PAGE.PAYMENT_METHOD}</Text>
                    <View style={{maxWidth:150, margin:0, padding:0, height: 20,}}>
                      <Dropdown
                        style={{textAlign:'right', }}
                        label= ""
                        value= {currentLanguages.ADVERTISEMENT_PAGE.SELECT_PAYMENT_METHOD}
                        labelHeight={0}
                        onChangeText={payment_method => this.setState({payment_method})}
                        data={coin_payments}
                        textColor={colorSchema.TEXT_HEADER_COLOR_1}
                        itemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        selectedItemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        fontSize={16}
                        containerStyle={{minWidth:150}}
                        // dropdownOffset={{top: 0}}
                      />
                    </View>
                  </View>

                  <View style={styles.item}>
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR,flex:1, fontSize:18,fontWeight:'bold',}}>* </Text>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', flex:10,}}>{currentLanguages.ADVERTISEMENT_PAGE.PAYMENT_TERM}</Text>
                    <View style={{maxWidth:150, margin:0, padding:0, height: 30, flexDirection:'row'}}>
                      <Dropdown
                        style={{textAlign:'right', }}
                        label= ""
                        value= '30'
                        labelHeight={0}
                        data={[{value:5},{value:10},{value:15},{value:20},{value:25},{value:30}]}
                        textColor={colorSchema.TEXT_HEADER_COLOR_1}
                        itemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        selectedItemColor={colorSchema.DARK_BACKGROUND_COLOR_2}
                        fontSize={16}
                        containerStyle={{minWidth:150}}
                        // dropdownOffset={{top: 0}}
                      />
                    </View><Text style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1}}> {currentLanguages.ADVERTISEMENT_PAGE.MINUTES}</Text>
                  </View>

                  <View style={styles.item}>
                    <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR,flex:1, maxWidth:15, fontSize:18,fontWeight:'bold', }}>* </Text>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', flex:10,}}>{currentLanguages.ADVERTISEMENT_PAGE.QUANTITY}</Text>
                    <View style={{maxWidth:150, margin:0, padding:0, height: 30, flexDirection:'row'}}>
                      <TextInput
                        style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1,bottom:5, }}
                        onChangeText={remaining_quantity => this.setState({remaining_quantity})}
                        keyboardType = 'numeric'
                        placeholder={currentLanguages.ADVERTISEMENT_PAGE.REMAINING_QUANTITY}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      />
                    </View>
                  </View>

                  <View style={styles.item}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_1, fontSize:16,fontWeight:'bold', }}>{currentLanguages.ADVERTISEMENT_PAGE.MESSAGE}</Text>
                    <View style={{maxWidth:300, margin:0, padding:0, height: 30, flexDirection:'row'}}>
                      <TextInput
                        style={{textAlign:'right',fontSize:16,color: colorSchema.TEXT_HEADER_COLOR_1,bottom:5, }}
                        onChangeText={message => this.setState({message})}
                        placeholder={currentLanguages.ADVERTISEMENT_PAGE.MESSAGE_DETAIL}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                      />
                    </View>
                  </View>

                  <View style={styles.item_checkbox}>
                    <CheckBox
                      title={currentLanguages.ADVERTISEMENT_PAGE.ONLY_TRUSTED}
                      checked={this.state.trust_only}
                      checkedColor={colorSchema.MAIN_UI_ACTIVE_COLOR}
                      uncheckedColor={colorSchema.MAIN_UI_ACTIVE_COLOR}
                      onPress={() => this.setState({trust_only: !this.state.trust_only})}
                      containerStyle={{padding:0, backgroundColor: 'transparent', borderWidth:0, }}
                      textStyle={{fontSize:16, color:colorSchema.TEXT_HEADER_COLOR_1,}}

                    />
                  </View>

                  <View style={styles.item_detail}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_3, fontSize:16, }}>{currentLanguages.ADVERTISEMENT_PAGE.ONLY_TRUSTED_DETAIL}</Text>
                  </View>

                  <View style={styles.item_checkbox}>
                    <CheckBox
                      title={currentLanguages.ADVERTISEMENT_PAGE.ONLY_AUTHENTICATED}
                      checked={this.state.auth_only}
                      checkedColor={colorSchema.MAIN_UI_ACTIVE_COLOR}
                      uncheckedColor={colorSchema.MAIN_UI_ACTIVE_COLOR}
                      onPress={() => this.setState({auth_only: !this.state.auth_only})}
                      containerStyle={{padding:0, backgroundColor: 'transparent', borderWidth:0, }}
                      textStyle={{fontSize:16, color:colorSchema.TEXT_HEADER_COLOR_1,}}

                    />
                  </View>

                  <View style={styles.item_detail}>
                    <Text style={{color: colorSchema.TEXT_HEADER_COLOR_3, fontSize:16, }}>{currentLanguages.ADVERTISEMENT_PAGE.ONLY_AUTHENTICATED_DETAIL}</Text>
                  </View>





                </View>

                <View style={styles.buttonView}>
                    <Button
                        title={currentLanguages.ADVERTISEMENT_PAGE.POST}
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

                        onPress={()=>{
                          console.log('===============SUMMARY=================');

                          console.log('Current Coin:'+this.state.type);
                          console.log('Current Coin:'+this.state.coin);
                          console.log('Current Currency:'+this.state.currency);
                          console.log('Current Payment Method:'+this.state.payment_method);
                          console.log('Current Payment Term:'+this.state.payment_term);
                          console.log('Current Payment Premium:'+this.state.premium);
                          console.log('Current Payment Price:'+this.state.price);
                          console.log('Current Payment Limit:'+this.state.limit);
                          console.log('Current Payment Remaining Quantity:'+this.state.remaining_quantity);
                          console.log('Current Payment Lowest Volume:'+this.state.lowest_volume);
                          console.log('Current Payment Highest Volume:'+this.state.highest_volume);
                          console.log('Current Payment Message:'+this.state.message);
                          console.log('Current Payment Trusted Only:'+this.state.trust_only);
                          console.log('Current Payment Authed Only:'+this.state.auth_only);

                          console.log('============================================');

                          if(this.state.payment_method!=''&&this.state.payment_term!=''&&this.state.remaining_quantity!=''&&this.state.lowest_volume!=''&&this.state.highest_volume!='') {
                            if(parseFloat(this.state.highest_volume)<parseFloat(this.state.lowest_volume)||parseFloat(this.state.lowest_volume)<0) {
                              alert('Volume is incorrect');
                            }
                            else {
                              this.AdInfoPost();
                            }

                          }
                          else {
                            alert('Key fields are required.');
                          }
                        }
                        }
                    />
                </View>
            </View>
          </ScrollView>

</View>
        );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSchema.DARK_BACKGROUND_COLOR_2,
        width: Dimensions.get('window').width,
    },
    info: {
      backgroundColor: colorSchema.DARK_BACKGROUND_COLOR_2,
      paddingBottom:80,
      paddingTop:10,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
    },
    formView: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginBottom: 30,
        paddingTop:20,
        flex: 1,
    },
    item: {
      borderBottomColor: colorSchema.TEXT_HEADER_COLOR_3,
      borderBottomWidth: 1,
      paddingTop: 20,
      paddingBottom: 15,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    item_detail: {
      paddingTop:15,
      paddingBottom: 15,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    item_checkbox: {
      paddingTop: 30,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    right: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    buttonView: {

    },
});
