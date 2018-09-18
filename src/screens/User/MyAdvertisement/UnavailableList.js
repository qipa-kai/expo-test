import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { withNavigation } from "react-navigation";
import currentLanguages from '../../../config/currentLanguages';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "../../../components/ADCards/index";
import colorSchema from "../../../theme/colorSchema";

const ACCESS_TOKEN = 'access_token';
const MOBILE = 'mobile';

class UnavailableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };

    this.navToS1 = this.navToS1.bind(this);
    this.renderAdCards = this.renderAdCards.bind(this);
    this.printLog = this.printLog.bind(this);
  }

  async componentDidMount() {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      const mob = await AsyncStorage.getItem(MOBILE);

      if (token && mob) {
          this.setState({ accessToken: token });
          this.setState({ mobile: mob });

          console.log('user token: ' + token);
          console.log('user mobile: ' + mob);

          this.adsFetch();

      } else {
          this.setState({ accessToken: false });
          this.props.navigation.navigate('Login');
      }
  }

  adsFetch = async () => {
    fetch(
      "http://52.65.228.235/api/v1/users/advertisements",
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': this.state.accessToken,
          'X-Auth-Mobile': this.state.mobile,
        },
        body: undefined
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        for(var i in responseJson.data){
          this.setState({
            dataList: this.state.dataList.concat(responseJson.data[i])
          })
        }

      })
      .catch(error => {
        console.log("err:" + error);
      });
  };

  navToS1 = i => {
    this.props.navigation.navigate("Ad", {
      access_token: this.state.accessToken,
      mobile: this.state.mobile,
      ad_no: this.state.dataList[i].ad_no,
      id: this.state.dataList[i].id,
      ad_type: this.state.dataList[i].trade_type,
      currency_type: this.state.dataList[i].currency_type,
      margin: this.state.dataList[i].margin,
      min: this.state.dataList[i].min,
      max: this.state.dataList[i].max,
      remark: this.state.dataList[i].remark,
      beneficiary_account: this.state.dataList[i].beneficiary_account,
      due_time: this.state.dataList[i].due_time,
      status: this.state.dataList[i].status,
      currency: this.state.dataList[i].currency,
      coin: this.state.dataList[i].coin,
      payments: this.state.dataList[i].payments,
      min_price: this.state.dataList[i].min_price,
      created_at: this.getTime(this.state.dataList[i].created_at),
      margin_price: this.state.dataList[i].margin_price,
      remaining_quantity: this.state.dataList[i].remaining_quantity
    }
  );
  };

  printLog() {
    console.log(this.state.dataList);
  }

  getTime(time) {
    var date = new Date(time*1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    return Y+M+D;
  }

  renderAdCards = () => {
    const listAds = this.state.dataList;
    if(listAds!=undefined) {
      return (
        <ScrollView>
          {
            listAds.map((item, i) => (
            <TouchableOpacity key={i} onPress={() => this.navToS1(i)}>
              <Card isDark="true">
                <CardTitle
                  title={item.trade_type.toUpperCase()}
                  subtitle={currentLanguages.ADVERTISEMENT_PAGE.CREATED_AT + this.getTime(item.created_at)}
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
          ))
          }
        </ScrollView>
      );
    }
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

export default withNavigation(UnavailableList);
