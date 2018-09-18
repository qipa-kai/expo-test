import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Header } from 'react-native-elements';

import colorSchema from '../../theme/colorSchema';

const info = {
  description: '点点OTC交易平台是个人与个人之间交易的场外交易平台，由专业的国际化团队研发与运营，专注于为全球用户提供便捷，可依赖的区块链服务；致力于打造国际化的区块链资产平台。',
  update: '升级到最新版本'
}

export default class AboutUsScreen extends React.Component {
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
                  centerComponent={{ text: 'About Us', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
                    style={{ height:100, marginBottom:20,}}
                    source={require('../../../assets/logo.png')}
                  />
                </View>
                <Text style={styles.about}>{info.description}</Text>
                <Button
                  title={info.update}
                  color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                  onPress={() => console.log('update')}
                />
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
      paddingTop:30,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    img: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
    },
    about: {
      color: colorSchema.TEXT_HEADER_COLOR_1,
      paddingBottom:20,
      paddingLeft:10,
      paddingRight:10,
    },
});
