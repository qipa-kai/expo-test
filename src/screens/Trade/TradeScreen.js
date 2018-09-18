import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Header, Icon, Overlay } from "react-native-elements";

import SwitchSelector from "../../components/SwitchSelector";
import BuyView from "./BuyView";
import SellView from "./SellView";

import currentLanguages from "../../config/currentLanguages";
import colorSchema from "../../theme/colorSchema";

export default class TradeScreen extends React.Component {
  state = {
    adType: "buyAd",
    isVisible: false
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
            onPress: () => {
              this.setState({
                isVisible: true
              })
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
        {this.state.adType == "buyAd" ? <BuyView /> : <SellView />}
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayBackgroundColor="white"
          borderRadius={5}
          width="auto"
          height="auto"
          onBackdropPress={() => {
            this.setState({
              isVisible: false
            })
          }}
        >
          <View style={styles.buttonView}>
            <TouchableOpacity
              activeOpacity={0.2}
              focusedOpacity={0.5}
              style={{
                paddingBottom: 15,
                paddingTop: 10,
                borderBottomWidth: 1,
                borderColor: colorSchema.TEXT_HEADER_COLOR_3
              }}
              onPress={() => {
                this.setState({
                  isVisible: false
                });
                this.props.navigation.navigate("New", {
                  type: 'BUY',
                  callback: (data)=>{
                    switch (data) {
                      case '422':
                        alert('You can only create 3 ads in the same type!');
                        break;
                      default:

                    }
                  }
                });
              }}
            >
              <Text style={{ fontSize: 18 }}>
                <Icon
                  name="border-color"
                  size={20}
                  width={30}
                  color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                />
                {currentLanguages.ADVERTISEMENT_PAGE.CREATE_BUY}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.2}
              focusedOpacity={0.5}
              style={{
                paddingBottom: 15,
                paddingTop: 15,
                borderBottomWidth: 1,
                borderColor: colorSchema.TEXT_HEADER_COLOR_3
              }}
              onPress={() => {
                this.setState({
                  isVisible: false
                });
                this.props.navigation.navigate("New", {
                    type: 'SELL',
                    callback: (data)=>{
                      switch (data) {
                        case '422':
                          alert('You can only create 3 ads in the same type!');
                          break;
                        default:

                      }
                    }
                  });
              }}
            >
              <Text style={{ fontSize: 18 }}>
                <Icon
                  name="create"
                  size={20}
                  width={30}
                  color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                />
                {currentLanguages.ADVERTISEMENT_PAGE.CREATE_SELL}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.2}
              focusedOpacity={0.5}
              style={{ paddingBottom: 10, paddingTop: 15 }}
              onPress={() => {
                this.setState({
                  isVisible: false
                });
                this.props.navigation.navigate("MyAd");
              }}
            >
              <Text style={{ fontSize: 18 }}>
                <Icon
                  name="library-books"
                  color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                  size={20}
                  width={30}
                />
                {currentLanguages.ADVERTISEMENT_PAGE.MANAGE}{" "}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              activeOpacity={0.2}
              focusedOpacity={0.5}
              style={{ paddingBottom: 10, paddingTop: 15 }}
              onPress={() => {
                this.props.navigation.navigate("New");
              }}
            >
              <Text style={{ fontSize: 18 }}>
                <Icon
                  name="portrait"
                  color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                  size={20}
                  width={30}
                />
                {currentLanguages.ADVERTISEMENT_PAGE.TRUST}{" "}
              </Text>
            </TouchableOpacity> */}
          </View>
        </Overlay>
        ;
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
