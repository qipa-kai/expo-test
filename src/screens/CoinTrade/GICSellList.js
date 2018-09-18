import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "../../components/ADCards/index";
import colorSchema from "../../theme/colorSchema";

class GICSellList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    };

    this.navToPreOrder = this.navToPreOrder.bind(this);
    this.renderAdCards = this.renderAdCards.bind(this);
    this.printLog = this.printLog.bind(this);
  }

  async componentDidMount() {
    this.adsFetch();
  }

  adsFetch = async () => {
    fetch(
      "http://52.65.228.235/api/v1/advertisements?ad_type=coin_ad&trade_type=sell&coin=GIC",
      {
        method: "GET",
        headers: undefined,
        body: undefined
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ dataList: responseJson.data });
      })
      .catch(error => {
        console.log("err:" + error);
      });
  };

  navToPreOrder = i => {
    this.props.navigation.navigate("PreOrder", {
      ad_no: this.state.dataList[i].user
    });
  };

  printLog() {
    console.log(this.state.dataList);
  }

  renderAdCards = () => {
    const listAds = this.state.dataList;

    return (
      <ScrollView>
        {listAds.map((item, i) => (
          <TouchableOpacity key={i} onPress={() => this.navToPreOrder(i)}>
            <Card isDark="true">
              <CardTitle
                title={item.user}
                subtitle={
                  "COUNT " + item.orders_count + " | " + "RATING " + item.rating
                }
              />
              <CardContent
                margin_price={item.margin_price + " " + item.currency}
                payments={item.payments}
                priceLimit={
                  "LIMIT " + item.min + " - " + item.max + " " + item.currency
                }
                qty={"QTY " + item.remaining_quantity + " " + item.coin}
              />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {this.state.dataList !== null ? (
          this.renderAdCards()
        ) : (
          <Text>no data!!!</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.DARK_BACKGROUND_COLOR
  }
});

export default withNavigation(GICSellList);
