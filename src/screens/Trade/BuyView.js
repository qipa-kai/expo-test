import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  TabView,
  TabBar,
  PagerExperimental,
  SceneMap,
  type Route,
  type NavigationState
} from "react-native-tab-view";
import * as GestureHandler from "react-native-gesture-handler";

import USDTBuyList from "./USDTBuyList";
import BTCBuyList from "./BTCBuyList";
import ETHBuyList from "./ETHBuyList";

import currentLanguages from "../../config/currentLanguages";
import colorSchema from "../../theme/colorSchema";

type State = NavigationState<
  Route<{
    key: string,
    title: string
  }>
>;

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class BuyView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "usdt", title: currentLanguages.COMMON.COIN.USDT },
      { key: "btc", title: currentLanguages.COMMON.COIN.BTC },
      { key: "eth", title: currentLanguages.COMMON.COIN.ETH }
    ],
    isVisible: false
  };

  _handleIndexChange = index =>
    this.setState({
      index
    });

  _renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabbar}
      labelStyle={styles.label}
      indicatorStyle={styles.indicator}
    />
  );

  _renderScene = SceneMap({
    usdt: USDTBuyList,
    btc: BTCBuyList,
    eth: ETHBuyList
  });

  _renderPager = props => (
    <PagerExperimental GestureHandler={GestureHandler} {...props} />
  );

  render() {
    return (
      <View style={styles.container}>
        <TabView
          style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          renderPager={this._renderPager}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
          useNativeDriver
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
  tabbar: {
    backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR
  },
  label: {
    color: colorSchema.TEXT_HEADER_COLOR_3,
    fontWeight: "600"
  },
  indicator: {
    backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 4
  }
});
