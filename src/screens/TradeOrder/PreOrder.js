import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import { Header, Button, Avatar } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';

import currentLanguages from "../../config/currentLanguages";
import colorSchema from "../../theme/colorSchema";

export default class PreOrder extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      //api data
      ad_no: navigation.getParam("ad_no"),
      trade_type: navigation.getParam("trade_type"),
      coin: navigation.getParam("coin"),
      user: navigation.getParam("user"),
      orders_count: navigation.getParam("orders_count"),
      rating: navigation.getParam("rating"),
      margin_price: navigation.getParam("margin_price"),
      currency: navigation.getParam("currency"),
      min: navigation.getParam("min"),
      max: navigation.getParam("max"),
      remaining_quantity: navigation.getParam("remaining_quantity"),
      payments: navigation.getParam("payments"),
      remark: navigation.getParam("remark"),

      // input data
      leftPrice: 0,
      rightPrice: 0,

      // input validation
      inputError: true,
    };

    this.inputLeftPrice = this.inputLeftPrice.bind(this);
    this.inputRightPrice = this.inputRightPrice.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.navToOrderStatus = this.navToOrderStatus.bind(this);
  }

  inputLeftPrice(value) {
    this.setState({leftPrice: value});
    this.setState({rightPrice: value / this.state.margin_price});
    this.inputValidation();
  }

  inputRightPrice(value) {
    this.setState({rightPrice: value});
    this.setState({leftPrice: value * this.state.margin_price});
    this.inputValidation();
  }

  inputValidation = () => {
    const inputNotZero = this.state.inputLeftPrice !== 0 && this.state.inputRightPrice !== 0 ? true : false;
    if ( inputNotZero ) {
      this.setState({inputError: false});
    }else {
      this.setState({inputError: true});
    }
  }

  navToOrderStatus = () => {
    this.props.navigation.navigate("OrderStatus", {
      ad_no: this.state.ad_no,
      user: this.state.user,
      trade_type: this.state.trade_type,
      coin: this.state.coin,
      margin_price: this.state.margin_price,
      currency: this.state.currency,
      payments: this.state.payments,
      remark: this.state.remark,
      leftPrice: this.state.leftPrice,
      rightPrice: this.state.rightPrice,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          leftComponent={{
            icon: "chevron-left",
            color: colorSchema.MAIN_UI_ACTIVE_COLOR,
            onPress: () => {
              this.props.navigation.goBack();
            }
          }}
          centerComponent={{
            text:
              this.state.trade_type.toUpperCase() +
              " " +
              this.state.coin.toUpperCase(),
            style: {
              fontSize: 20,
              fontWeight: "bold",
              color: colorSchema.TEXT_HEADER_COLOR_1
            }
          }}
          rightComponent={{
            icon: "info",
            color: colorSchema.MAIN_UI_ACTIVE_COLOR,
            onPress: () => {
              console.log("HELP");
            }
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

        <ScrollView>
          <View style={{ flex: 1, flexWrap: "wrap" }}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Avatar
                  size="medium"
                  rounded
                  overlayContainerStyle={{
                    backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                  }}
                  title={this.state.user.charAt(0).toUpperCase()}
                  titleStyle={{
                    color: colorSchema.DARK_UI_BACKGROUND_COLOR,
                    fontWeight: "bold"
                  }}
                  activeOpacity={0.7}
                />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.user}>{this.state.user}</Text>
                <Text style={styles.detail}>
                  {currentLanguages.USER_PAGE.COUNTS} {this.state.orders_count}{" "}
                  | {currentLanguages.USER_PAGE.RATING} {this.state.rating}
                </Text>
              </View>
            </View>

            <View style={styles.orderInfo}>
              <View style={styles.orderInfoRow}>
                <View style={styles.orderTableTitleView}>
                  <Text style={styles.tableTitleText}>PRICE</Text>
                </View>
                <View style={styles.orderTableResultView}>
                  <Text style={[styles.whiteText, (style = { fontSize: 30 })]}>
                    {this.state.margin_price} {this.state.currency}
                  </Text>
                </View>
              </View>

              <View style={styles.orderInfoRow}>
                <View style={styles.orderTableTitleView}>
                  <Text style={styles.tableTitleText}>LIMIT</Text>
                </View>
                <View style={styles.orderTableResultView}>
                  <Text style={[styles.whiteText, (style = { fontSize: 20 })]}>
                    {this.state.min} - {this.state.max} {this.state.coin}
                  </Text>
                </View>
              </View>

              <View style={styles.orderInfoRow}>
                <View style={styles.orderTableTitleView}>
                  <Text style={styles.tableTitleText}>QTY</Text>
                </View>
                <View style={styles.orderTableResultView}>
                  <Text style={[styles.whiteText, (style = { fontSize: 18 })]}>
                    {this.state.remaining_quantity} {this.state.coin}
                  </Text>
                </View>
              </View>

              <View style={styles.orderInfoRow}>
                <View style={styles.orderTableTitleView}>
                  <Text style={styles.tableTitleText}>PAYMENT TYPE</Text>
                </View>
                <View style={styles.orderTableResultView}>
                  <View style={styles.payView}>
                    {this.state.payments.map(
                      (item, i) =>
                        item == "cash_deposit" ? (
                          <Image
                            key={i}
                            source={require("../../../assets/paymenticon/cash_deposit.png")}
                            style={styles.payIcon}
                          />
                        ) : null || item == "bank_transfer" ? (
                          <Image
                            key={i}
                            source={require("../../../assets/paymenticon/bank_transfer.png")}
                            style={styles.payIcon}
                          />
                        ) : null || item == "alipay" ? (
                          <Image
                            key={i}
                            source={require("../../../assets/paymenticon/alipay.png")}
                            style={styles.payIcon}
                          />
                        ) : null || item == "wepay" ? (
                          <Image
                            key={i}
                            source={require("../../../assets/paymenticon/wepay.png")}
                            style={styles.payIcon}
                          />
                        ) : null
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.orderInfoRow}>
                <Text style={styles.tableTitleText}>
                  REMARK: {this.state.remark}
                </Text>
              </View>
            </View>

            <View style={styles.orderInputRow}>
              <Text
                style={{ color: colorSchema.TEXT_HEADER_COLOR_2, fontSize: 30 }}
              >
                HOW MANY?
              </Text>

              <View style={styles.inputItemView}>
                <View style={styles.inputItem}>
                  <Text style={styles.inputLabel}>{this.state.currency}</Text>
                  <View style={styles.testInputView}>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={value => this.inputLeftPrice(value)}
                      value={ this.state.leftPrice == 0 ? null : this.state.leftPrice.toString() }
                      keyboardType="numeric"
                      placeholder={this.state.min + " - " + this.state.max}
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                    />
                  </View>
                </View>
                <View style={styles.inputIcon}>
                  <FontAwesome
                  style={{
                    fontSize:20,
                    alignSelf: 'center',
                    paddingBottom: 5,
                  }}
                  name='exchange'
                  color='#fff' />
                </View>
                <View style={styles.inputItem}>
                  <Text style={styles.inputLabel}>{this.state.coin}</Text>
                  <View style={styles.testInputView}>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={value => this.inputRightPrice(value)}
                      value={ this.state.rightPrice == 0 ? null : this.state.rightPrice.toString() }
                      keyboardType="numeric"
                      placeholder="Please Input a Number."
                      placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                    />
                  </View>
                </View>
              </View>
            </View>

            <Button
              title={this.state.trade_type.toUpperCase()}
              disabled={this.state.inputError}
              titleStyle={{
                fontWeight: "700",
                color: colorSchema.DARK_UI_BACKGROUND_COLOR
              }}
              buttonStyle={{
                backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{
                flex: 1,
                marginTop: 20,
                height: 45,
                marginLeft: 10,
                marginRight: 10
              }}
              onPress={() => this.navToOrderStatus()}
            />
          </View>
          <View style={{ padding: 20 }}>
            <Text style={styles.notiText}>交易提醒</Text>
            <Text style={styles.notiText}>
              1. 交易前请详细了解卖家的交易信息
            </Text>
            <Text style={styles.notiText}>
              2. 请通过平台进行沟通约定，并保存好相关聊天记录
            </Text>
            <Text style={styles.notiText}>
              3. 如遇到交易纠纷，请通过点击右上角的感叹号图标来查询帮助信息
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.ORDER_BACKGROUND_COLOR
  },
  userInfo: {
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row"
  },
  avatar: {
    flex: 0.5
  },
  infoText: {
    flex: 1.5
  },
  user: {
    fontSize: 20,
    color: colorSchema.MAIN_UI_ACTIVE_COLOR,
    marginBottom: 5
  },
  detail: {
    fontSize: 14,
    color: colorSchema.TEXT_HEADER_COLOR_3
  },
  orderInfo: {
    backgroundColor: colorSchema.ORDER_INFO_BACKGROUND_COLOR,
    padding: 15
  },
  orderInfoRow: {
    flexDirection: "row",
    paddingBottom: 20
  },
  orderTableTitleView: {
    justifyContent: "center",
    flex: 0.5
  },
  tableTitleText: {
    color: colorSchema.ORDER_TABLE_TITLE_GRAY_COLOR,
    fontWeight: "600",
    textAlignVertical: "center"
  },
  orderTableResultView: {
    flex: 1.5
  },
  whiteText: {
    color: colorSchema.TEXT_HEADER_COLOR_2,
    alignSelf: "flex-end"
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
  orderInputRow: {
    flex: 1,
    padding: 15
  },
  inputItemView: {
    flex: 1,
    flexDirection: "row"
  },
  inputItem: {
    flex: 4,
    borderBottomColor: colorSchema.TEXT_HEADER_COLOR_3,
    borderBottomWidth: 1,
    paddingTop: 20
  },
  inputIcon: {
    flex: 2,
    alignSelf: "flex-end",
    paddingBottom: 5,
  },
  testInputView: {
    margin: 0,
    padding: 0,
    height: 30,
    flexDirection: "row"
  },
  textInput: {
    textAlign: "right",
    fontSize: 16,
    color: colorSchema.TEXT_HEADER_COLOR_1
  },
  inputLabel: {
    color: colorSchema.TEXT_HEADER_COLOR_1,
    fontSize: 16,
    fontWeight: "bold"
  },
  notiText: {
    paddingBottom: 5,
    color: colorSchema.ORDER_TABLE_TITLE_GRAY_COLOR,
    fontSize: 13,
    fontWeight: "400"
  }
});
