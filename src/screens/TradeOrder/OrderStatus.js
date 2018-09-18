import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image
} from "react-native";
import { Header, Button, Avatar } from "react-native-elements";

import colorSchema from "../../theme/colorSchema";

export default class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      ad_no: navigation.getParam("ad_no"),
      user: navigation.getParam("user"),
      trade_type: navigation.getParam("trade_type"),
      coin: navigation.getParam("coin"),
      margin_price: navigation.getParam("margin_price"),
      currency: navigation.getParam("currency"),
      payments: navigation.getParam("payments"),
      remark: navigation.getParam("remark"),
      leftPrice: navigation.getParam("leftPrice"),
      rightPrice: navigation.getParam("rightPrice")
    };

    this.printLog = this.printLog.bind(this);
  }

  printLog() {
    console.log(this.state.ad_no);
  }

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
            text: "ORDER STATUS",
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

        <View
          style={[
            styles.orderStatusView,
            (style = { paddingBottom: 20, paddingTop: 20 })
          ]}
        >
          <View style={styles.headTitleView}>
            <Text
              style={{
                flex: 4,
                color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                fontSize: 14,
                fontWeight: "600"
              }}
            >
              {this.state.user}
            </Text>
            <Text
              style={{
                flex: 6,
                fontSize: 12,
                fontWeight: "400",
                color: colorSchema.TEXT_HEADER_COLOR_1,
                textAlign: "right"
              }}
            >
              { "Order Number: " + this.state.ad_no }
            </Text>
          </View>
        </View>
        <View style={styles.orderStatusView}>
          <Text style={styles.titleText}> {"PRICE: " + this.state.leftPrice + " " + this.state.currency} </Text>
        </View>

        <View style={[styles.orderStatusView, (style = { paddingBottom: 0 })]}>
          <View
            style={{
              flex: 6
            }}
          >
            <View style={{
                flexDirection: "row",
                alignItems: 'flex-start',
            }}>

            </View>

            <Text style={styles.contentText}>
              {"REMARK: " + this.state.remark}
            </Text>
          </View>

          <View
            style={{
              flex: 4
            }}
          >
            <Button
              title="REPORT"
              disabled={false}
              titleStyle={{
                fontSize: 12,
                fontWeight: "500",
                color: colorSchema.GRADY_BUTTON_TEXT_COLOR
              }}
              buttonStyle={{
                backgroundColor: colorSchema.GRADY_BUTTON_BACKGROUND_COLOR,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{
                flex: 1,
                height: 45
              }}
              onPress={() => console.log("report")}
            />
          </View>
        </View>

        <View style={styles.orderStatusView}>
            <View
                style={{
                    flex: 6
                }}
            >
                <Text style={styles.contentText}> {"TRADE QTY: " + this.state.rightPrice + " " + this.state.coin} </Text>
                <Text style={styles.contentText}> {"TRADE PRICE: " + this.state.margin_price + " " + this.state.currency} </Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'flex-start',
                }}>
                    <Text style={[styles.contentText, style={
                    }]}>PAYMENTS: </Text>
                    <View style={styles.payView}>
                        {this.state.payments.map(
                            (item, i) =>
                                item == "cash_deposit" ? (
                                    <View
                                        style={{
                                            flexDirection: "row"
                                        }}>
                                        <Image
                                            key={i}
                                            source={require("../../../assets/paymenticon/cash_deposit.png")}
                                            style={styles.payIcon}
                                        />
                                        <Text>cash</Text>
                                    </View>


                                ) : null || item == "bank_transfer" ? (
                                    <View
                                        style={{
                                            flexDirection: "row"
                                        }}>
                                        <Image
                                            key={i}
                                            source={require("../../../assets/paymenticon/bank_transfer.png")}
                                            style={styles.payIcon}
                                        />
                                        <Text>bsb </Text>
                                    </View>

                                ) : null || item == "alipay" ? (
                                    <View
                                        style={{
                                            flexDirection: "row"
                                        }}>
                                        <Image
                                            key={i}
                                            source={require("../../../assets/paymenticon/alipay.png")}
                                            style={styles.payIcon}
                                        />
                                        <Text>alipay</Text>
                                    </View>
                                ) : null || item == "wepay" ? (
                                    <View
                                        style={{
                                            flexDirection: "row"
                                        }}>
                                        <Image
                                            key={i}
                                            source={require("../../../assets/paymenticon/wepay.png")}
                                            style={styles.payIcon}
                                        />
                                        <Text>we pay</Text>
                                    </View>

                                ) : null
                        )}
                    </View>
                </View>

                {/*<Text style={styles.contentText}>*/}
                    {/*{"REMARK: " + this.state.remark}*/}
                {/*</Text>*/}
            </View>

            <View
                style={{
                    flex: 4
                }}
            >
                <Button
                    title="REPORT"
                    disabled={false}
                    titleStyle={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: colorSchema.GRADY_BUTTON_TEXT_COLOR
                    }}
                    buttonStyle={{
                        backgroundColor: colorSchema.GRADY_BUTTON_BACKGROUND_COLOR,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{
                        marginTop: 100,
                        flex: 1,
                        height: 45
                    }}
                    onPress={() => console.log("report")}
                />
            </View>

          {/*<Button*/}
            {/*title="ORDER STATUS"*/}
            {/*disabled={false}*/}
            {/*titleStyle={{*/}
              {/*fontSize: 12,*/}
              {/*fontWeight: "500",*/}
              {/*color: colorSchema.DARK_UI_BACKGROUND_COLOR*/}
            {/*}}*/}
            {/*buttonStyle={{*/}
              {/*backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,*/}
              {/*borderColor: "transparent",*/}
              {/*borderWidth: 0,*/}
              {/*borderRadius: 5*/}
            {/*}}*/}
            {/*containerStyle={{*/}
              {/*flex: 1,*/}
              {/*flexDirection: "column",*/}
              {/*justifyContent: "flex-start",*/}
              {/*height: 45*/}
            {/*}}*/}
            {/*onPress={() => console.log("order!")}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.ORDER_INFO_BACKGROUND_COLOR
  },
  orderStatusView: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colorSchema.ORDER_BACKGROUND_COLOR
  },
  headTitleView: {
    flex: 1,
    flexDirection: "row"
  },
  titleText: {
    paddingBottom: 20,
    color: colorSchema.TEXT_HEADER_COLOR_1,
    fontSize: 20,
    fontWeight: "500"
  },
  contentText: {
    paddingBottom: 20,
    color: colorSchema.ORDER_TABLE_TITLE_GRAY_COLOR
  },
  payView: {
    flexDirection: "column"
  },
  payIcon: {
    marginLeft: 8,
    alignSelf: "flex-end",
    width: 22,
    height: 22
  }
});
