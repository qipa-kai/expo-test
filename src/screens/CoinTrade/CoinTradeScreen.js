import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Header } from "react-native-elements";

import SwitchSelector from "../../components/SwitchSelector";
import BuyView from "./BuyView";
import SellView from "./SellView";

import currentLanguages from "../../config/currentLanguages";
import colorSchema from "../../theme/colorSchema";

export default class CoinTradeScreen extends React.Component {
  state = {
    adType: "buyAd"
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          leftComponent={{
            icon: "search",
            color: colorSchema.MAIN_UI_ACTIVE_COLOR,
            onPress: () => {
              this.props.navigation.navigate("Search");
            }
          }}
          centerComponent={
            <SwitchSelector
              initial={0}
              onPress={value => this.setState({ adType: value })}
              textColor={colorSchema.MAIN_UI_ACTIVE_COLOR}
              selectedColor={colorSchema.DARK_UI_BACKGROUND_COLOR}
              buttonColor={colorSchema.MAIN_UI_ACTIVE_COLOR}
              borderColor={colorSchema.MAIN_UI_ACTIVE_COLOR}
              backgroundColor={colorSchema.DARK_UI_BACKGROUND_COLOR}
              hasPadding
              options={[
                { label: currentLanguages.COMMON.BUY, value: "buyAd" },
                { label: currentLanguages.COMMON.SELL, value: "sellAd" }
              ]}
            />
          }
          rightComponent={{
            icon: "add",
            color: colorSchema.MAIN_UI_ACTIVE_COLOR,
            onPress: () => console.log("add")
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
        {this.state.adType == "buyAd" ? <BuyView /> : <SellView />}
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
