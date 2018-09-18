import React from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'; //弹窗

import colorSchema from '../../theme/colorSchema';
import { Permissions } from 'expo';
import { ImagePicker } from 'expo';

var image = 0;

export default class AuthenticationScreen extends React.Component {

    state = {
      image1: null,
      image2: null,
      image3: null,
    };

    showActionSheet = () => {
      this.ActionSheet.show()
    }

    constructor(props) {
        super(props);
    }

    render() {
        let { image } = this.state;
        let { image1 } = this.state;
        let { image2 } = this.state;
        let { image3 } = this.state;
        return (
            <ScrollView style={styles.container}>
              <Header
                  statusBarProps={{ barStyle: 'light-content' }}
                  leftComponent={{
                      icon: 'chevron-left',
                      color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                      onPress: () => { this.props.navigation.goBack() }
                  }}
                  rightComponent={{
                      icon: 'done',
                      color: colorSchema.MAIN_UI_ACTIVE_COLOR,
                      onPress: () => console.log('done')
                  }}
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

                <Text style={styles.authTitle}>身份认证</Text>

                <View style={styles.formView}>
                    <Input
                        keyboardAppearance='dark'
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        keyboardType='numeric'
                        returnKeyType='next'
                        inputStyle={{
                            marginLeft: 10,
                            color: colorSchema.TEXT_HEADER_COLOR_1
                        }}
                        placeholder={'请输入姓氏'}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            marginTop: 20,
                            height: 45,
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                    />
                </View>

                <View style={styles.formView}>
                    <Input
                        keyboardAppearance='dark'
                        shake={false}
                        autoFocus={false}
                        autoCorrect={false}
                        returnKeyType='next'
                        inputStyle={{
                            marginLeft: 10,
                            color: colorSchema.TEXT_HEADER_COLOR_1
                        }}
                        placeholder={'请输入名字'}
                        placeholderTextColor={colorSchema.TEXT_HEADER_COLOR_3}
                        containerStyle={{
                            borderBottomColor: colorSchema.MAIN_UI_ACTIVE_COLOR
                        }}
                    />
                </View>


                <View style={styles.buttonView}>
                    <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5} style={{marginTop: 20,}}
                      onPress={()=>{this.image=1;this.showActionSheet();}}>
                       <View style=  {{
                         backgroundColor: colorSchema.MAIN_UI_DEACTIVE_COLOR,
                         borderColor: 'transparent',
                         borderWidth: 0,
                         borderRadius: 5,
                         paddingTop:30,
                         paddingBottom:10,
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                         <Icon
                           name={'add'}
                           color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                           paddingBottom={5}
                           size={20}
                         />
                         <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR, fontSize: 15, paddingBottom:20,}}>请上传身份证正面照</Text>
                         {image1 &&
                           <Image source={{ uri: image1 }} style={{ width: 200, height: 150, marginBottom: 30, }} />}
                       </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5} style={{marginTop: 20,}}
                      onPress={()=>{this.image=2;this.showActionSheet();}}>

                       <View style=  {{
                         backgroundColor: colorSchema.MAIN_UI_DEACTIVE_COLOR,
                         borderColor: 'transparent',
                         borderWidth: 0,
                         borderRadius: 5,
                         paddingTop: 30,
                         paddingBottom: 10,
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                         <Icon
                           name={'add'}
                           color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                           paddingBottom={5}
                           size={20}
                         />
                         <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR, fontSize: 15, paddingBottom: 20,}}>请上传身份证背面照</Text>
                         {image2 &&
                           <Image source={{ uri: image2 }} style={{ width: 200, height: 150, marginBottom: 30, }} />}
                       </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5} style={{marginTop: 20,}}
                      onPress={()=>{this.image=3;this.showActionSheet();}}>
                       <View style=  {{
                         backgroundColor: colorSchema.MAIN_UI_DEACTIVE_COLOR,
                         borderColor: 'transparent',
                         borderWidth: 0,
                         borderRadius: 5,
                         paddingTop:30,
                         paddingBottom:10,
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                         <Icon
                           name={'add'}
                           color={colorSchema.MAIN_UI_ACTIVE_COLOR}
                           paddingBottom={5}
                           size={20}
                         />
                         <Text style={{color: colorSchema.MAIN_UI_ACTIVE_COLOR, fontSize: 15, paddingBottom: 20}}>请上传本人手持身份证正面照</Text>
                         {image3 &&
                           <Image source={{ uri: image3 }} style={{ width: 200, height: 150, marginBottom: 30, }} />}
                       </View>
                    </TouchableOpacity>
                    <ActionSheet
                      ref={o => this.ActionSheet = o}
                      options={['拍摄照片', '从相册中选择', '取消']}
                      cancelButtonIndex={2}
                      destructiveButtonIndex={0}
                      onPress={(index) => {
                        if(index==0) {
                          console.log("take");
                          this._takePhoto();
                        }
                        else if(index==1){
                          console.log("pick");
                          this._pickImage();
                        }
                      }}
                    />

                </View>

            </ScrollView>
        );
    }

    _pickImage = async () => {
    const results = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ]);
    if (results.some(({ status}) => status !== 'granted')) {
      Alert.alert("We cannot access to your camera roll, please go to system Setting and turn it on.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      switch (this.image) {
        case 1:
          this.image=0;
          this.setState({ image1: result.uri });
          break;
        case 2:
          this.image=0;
          this.setState({ image2: result.uri });
          break;
        case 3:
          this.image=0;
          this.setState({ image3: result.uri });
          break;
        default:

      }
    }
  };

  _takePhoto = async () => {
  const results = await Promise.all([
    Permissions.askAsync(Permissions.CAMERA),
  ]);
  if (results.some(({ status}) => status !== 'granted')) {
    Alert.alert("We cannot access to your camera, please go to system Setting and turn it on.");
    return;
  }
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result);

  if (!result.cancelled) {
    switch (this.image) {
      case 1:
        this.image=0;
        this.setState({ image1: result.uri });
        break;
      case 2:
        this.image=0;
        this.setState({ image2: result.uri });
        break;
      case 3:
        this.image=0;
        this.setState({ image3: result.uri });
        break;
      default:

    }
  }
};



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
        width: Dimensions.get('window').width,
    },
    authTitle: {
        color: colorSchema.TEXT_HEADER_COLOR_1,
        fontSize: 40,
        padding: 20,
        fontWeight: 'bold',
    },
    formView: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
        padding: 20,
    }
});
