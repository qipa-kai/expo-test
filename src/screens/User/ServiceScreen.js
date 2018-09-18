import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Header } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

const info = {
  description: '微信扫码咨询官方客服',
  or: '或长按复制客服微信地址',
  address: 'DotStar2018CustomerService'
}

export default class ServiceScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <Header
                  statusBarProps={{ barStyle: 'light-content' }}
                  leftComponent={{
                      icon: 'chevron-left',
                      color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                      onPress: () => { this.props.navigation.goBack() }
                  }}
                  centerComponent={{ text: '在线客服', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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

              <View style={styles.info}>
                <View style={styles.img}>
                  <Image
                    style={{ width:150, height:150,}}
                    source={require('../../../assets/qrcode.jpg')}
                  />
                </View>
                <Text style={styles.about}>{info.description}</Text>
                <Text style={styles.or}>{info.or}</Text>
                <Text style={styles.address}>{info.address}</Text>
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
    info: {
      backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
      paddingBottom:80,
      paddingTop:80,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      paddingBottom:20,
      borderWidth: 1,
      borderColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
    },
    about: {
      color: colorSchema.DARK_BACKGROUND_COLOR,
      paddingBottom:40,
    },
    or: {
      color: colorSchema.DARK_BACKGROUND_COLOR,
      paddingBottom:10,
    },
    address: {
      color: colorSchema.TEXT_HEADER_COLOR_1,
    },
});
