import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";

export default class CardContent extends Component {
  render() {
    const newStyle = this.props.style || {};
    return (
      <View style={[styles.cardContent, newStyle]}>
        {this.props.avatarSource !== undefined && (
          <Image
            source={this.props.avatarSource}
            resizeMode="stretch"
            style={styles.avatarStyle}
          />
        )}
        <View style={styles.CardContentTextCont}>
          <View style={styles.mainView}>
            <View style={styles.currencyView}>
              <Text style={styles.currencyText}>{this.props.margin_price}</Text>
            </View>

            <View style={styles.payView}>
              {this.props.payments.map(
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

          <View style={styles.subView}>
            <View style={styles.dataView}>
              <Text style={[styles.dataText, (style = { marginBottom: 8 })]}>
                {this.props.priceLimit}
              </Text>
              <Text style={styles.dataText}>{this.props.qty}</Text>
            </View>
            <View style={styles.arrowView}>
              <Icon name="chevron-right" color="#f2ba5a" size={35} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  darkText: {
    color: "rgba(0 ,0 ,0 , 0.87)"
  },
  lightText: {
    color: "rgba(255 ,255 ,255 , 0.87)"
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16
  },
  CardContentTextCont: {
    flex: 1,
    flexDirection: "column"
  },
  contentText: {
    fontSize: 14,
    color: "rgba(0 ,0 ,0 , 0.54)"
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 150,
    marginRight: 16
  },
  mainView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    paddingBottom: 10
  },
  currencyView: {
    flex: 7,
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  currencyText: {
    color: "white",
    fontSize: 25
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
  subView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingBottom: 5
  },
  dataView: {
    flex: 9,
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  dataText: {
    color: "#939393",
    fontSize: 15
  },
  arrowView: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-end"
  },
  coinText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800"
  }
});
