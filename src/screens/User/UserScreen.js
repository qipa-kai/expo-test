import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements'
import lanEN from '../../theme/languages/lanEN';

import colorSchema from '../../theme/colorSchema';

const ACCESS_TOKEN = 'access_token';
const MOBILE = 'mobile';
const FUND_PASSWORD = 'fund_password';


const list = [
  {
    title: lanEN.USER_PAGE.AUTHENTICATION,
    icon: 'perm-identity',
    navigate: 'Authentication'
  },
  {
    title: lanEN.USER_PAGE.COIN_COIN,
    icon: 'description',
    navigate: 'Authentication'
  },
  {
    title: lanEN.USER_PAGE.MY_AD,
    icon: 'library-books',
    navigate: 'MyAd'
  },
  {
    title: lanEN.USER_PAGE.SETTING,
    icon: 'settings',
    navigate: 'Setting'
  },
  {
    title: lanEN.USER_PAGE.HELP,
    icon: 'help',
    navigate: 'Help'
  },
  {
    title: lanEN.USER_PAGE.SERVICE,
    icon: 'headset',
    navigate: 'Service'
  },
  {
    title: lanEN.USER_PAGE.ABOUTUS,
    icon: 'info',
    navigate: 'AboutUs'
  }
];

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accessToken: '',
            mobile: '',
            title: '',
            name: '',
            counts: '',
            rating: '',
            trusted: '',
            fundPassword: '',
        };

    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        const mob = await AsyncStorage.getItem(MOBILE);
        const fund = await AsyncStorage.getItem(FUND_PASSWORD);
        if (token && mob) {
            this.setState({ accessToken: token });
            this.setState({ mobile: mob });
            this.setState({ fundPassword: fund });
            console.log('user token: ' + token);
            console.log('user mobile: ' + mob);
            console.log('user has fund password: ' + fund);
            this.userInfoFetch();

        } else {
            this.setState({ accessToken: false });
            this.props.navigation.navigate('Login');
        }
    }
    userInfoFetch = async () => {
      console.log(this.state.accessToken+"  "+this.state.mobile);
        fetch('http://52.65.228.235/api/v1/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.accessToken,
                'X-Auth-Mobile': this.state.mobile,
            },
            body: undefined
        })

            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
                this.state.name = responseJson.data.username;
                this.state.title = this.state.name[0].toUpperCase();
                this.state.counts = responseJson.data.orders_count;
                this.state.rating = responseJson.data.rating;
                this.forceUpdate();
            })
            .catch((error) => {
                console.log('err:' + error);
            });
    };

    handleLoginButtonPress = () => {
        this.props.navigation.navigate('Login');
    };

    handleLogoutButtonPress = () => {
        try {
            AsyncStorage.removeItem(ACCESS_TOKEN);
            AsyncStorage.removeItem(MOBILE);
            AsyncStorage.removeItem(FUND_PASSWORD);
            this.props.navigation.navigate('Main');
        } catch(error) {
            console.log("error")
        }
    };


    renderLoginScreen = () => {
        return (
            <View>
                <Text style={styles.titleStyle}>Please login!</Text>
                <Button
                    title='LOGIN'
                    disabled={false}
                    titleStyle={{
                        fontWeight: '700',
                        color: colorSchema.DARK_UI_BACKGROUND_COLOR,
                    }}
                    buttonStyle={{
                        backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{
                        marginTop: 20,
                        height: 45
                    }}
                    onPress={
                        this.handleLoginButtonPress
                    }
                />
            </View>
        )
    };

    renderUserScreen = () => {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <View style={styles.avatar}>
                        <Avatar
                            size="medium"
                            rounded
                            // source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                            overlayContainerStyle={{backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR}}
                            title={this.state.title}
                            titleStyle={{color: colorSchema.DARK_UI_BACKGROUND_COLOR, fontWeight: 'bold'}}
                            activeOpacity={0.7}
                        />
                    </View>
                    <View style={styles.infoText}>
                        <Text style={styles.name}>{this.state.name}</Text>
                        <Text style={styles.detail}>{lanEN.USER_PAGE.COUNTS} {this.state.counts}  |  {lanEN.USER_PAGE.RATING} {this.state.rating}  |  {lanEN.USER_PAGE.TRUSTED} {this.state.trusted}</Text>
                    </View>
                </View>
                {
                    list.map((item, i) => (
                        <ListItem
                            containerStyle={styles.listStyle}
                            key={i}
                            title={item.title}
                            leftIcon={{ name:item.icon, iconStyle:styles.leftIcon }}
                            titleStyle={styles.titleStyle}
                            onPress={() => { this.props.navigation.navigate(item.navigate) }}
                        />
                    ))
                }
                <Button
                    title='LOGOUT'
                    disabled={false}
                    titleStyle={{
                        fontWeight: '700',
                        color: colorSchema.DARK_UI_BACKGROUND_COLOR,
                    }}
                    buttonStyle={{
                        backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{
                        marginTop: 20,
                        height: 45,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    onPress={
                        this.handleLogoutButtonPress
                    }
                />
            </View>
        )
    };

    render() {
        // if (this.state.accessToken == '') return null
        return (
            <View style={styles.container}>
                { this.renderUserScreen() }
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSchema.DARK_BACKGROUND_COLOR
    },
    info: {
      backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
      paddingBottom:30,
      paddingTop:80,
      paddingLeft: 20,
      marginBottom: 10,
      flexDirection: 'row'
    },
    avatar: {
      flex:.5
    },
    infoText: {
      flex:1.5
    },
    name: {
      fontSize: 20,
      color: colorSchema.TEXT_HEADER_COLOR_2,
      marginBottom: 5
    },
    detail: {
      fontSize: 12,
      color: colorSchema.TEXT_HEADER_COLOR_2
    },
    listStyle: {
        borderBottomColor: colorSchema.DARK_BACKGROUND_COLOR,
        borderBottomWidth: 1,
        backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
    },
    titleStyle: {
        color: colorSchema.TEXT_HEADER_COLOR_2,
        fontSize: 15,
    },
    leftIcon: {
        color: colorSchema.MAIN_UI_ACTIVE_COLOR,
        width: 28
    }
});
