import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

// Ad Screen
import TradeScreen from './screens/Trade/TradeScreen';
import CoinTradeScreen from './screens/CoinTrade/CoinTradeScreen';
import SearchScreen from './screens/Search/SearchScreen';
import SearchAdScreen from './screens/Search/SearchAdScreen';
import SearchUserScreen from './screens/Search/SearchUserScreen';

// Order Screen
import PreOrderScreen from './screens/TradeOrder/PreOrder';
import OrderStatusScreen from './screens/TradeOrder/OrderStatus';

// Wallet Screen
import WalletScreen from './screens/Wallet/WalletScreen';

// User Screen
import UserScreen from './screens/User/UserScreen';
import AboutUsScreen from './screens/User/AboutUsScreen';
import AuthenticationScreen from './screens/User/AuthenticationScreen';
import EmailScreen from './screens/User/EmailScreen';
import FundPasswordScreen from './screens/User/FundPasswordScreen';
import GoogleScreen from './screens/User/GoogleScreen';
import HelpScreen from './screens/User/HelpScreen';
import LoginPasswordScreen from './screens/User/LoginPasswordScreen';
import PhoneScreen from './screens/User/PhoneScreen';
import SettingScreen from './screens/User/SettingScreen';
import ServiceScreen from './screens/User/ServiceScreen';

// Auth Screen
import LoginScreen from './screens/Auth/LoginScreen.js';
import RegisterPhoneScreen from './screens/Auth/RegisterPhoneScreen';
import RegisterUserScreen from './screens/Auth/RegisterUserScreen';

// My Ad Screen
import MyAdScreen from './screens/User/MyAdvertisement/MyAdScreen';
import AdScreen from './screens/User/MyAdvertisement/AdvertisementScreen';
import NewAdScreen from './screens/User/MyAdvertisement/NewAdScreen';
import EditAdScreen from './screens/User/MyAdvertisement/EditAdScreen';

import tabBarIcon from './utils/tabBarIcon';
import lanEN from './theme/languages/lanEN';
import colorSchema from './theme/colorSchema';

const bottomNavigator = createBottomTabNavigator(
    {
        Trade: {
            screen: TradeScreen,
            navigationOptions: {
                title: lanEN.BOTTOM_NAVIGATOR.TRADE,
                tabBarIcon: tabBarIcon('account-balance'),
                header: null,
            },
        },
        CoinTrade: {
            screen: CoinTradeScreen,
            navigationOptions: {
                title: lanEN.BOTTOM_NAVIGATOR.COIN,
                tabBarIcon: tabBarIcon('fiber-smart-record'),
            },
        },
        Wallet: {
            screen: WalletScreen,
            navigationOptions: {
                title: lanEN.BOTTOM_NAVIGATOR.WALLET,
                tabBarIcon: tabBarIcon('account-balance-wallet'),
            },
        },
        User: {
            screen: UserScreen,
            navigationOptions: {
                title: lanEN.BOTTOM_NAVIGATOR.ME,
                tabBarIcon: tabBarIcon('account-circle'),
            },
        },
    },
    {
        tabBarOptions: {
            showLabel: true,
            activeTintColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
            inactiveTintColor: colorSchema.MAIN_UI_DEACTIVE_COLOR,
            labelStyle: {
                fontSize: 12,
            },
            tabStyle: {
                width: 100,
            },
            style: {
                backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
            }
        },
    },
);

const Index = createStackNavigator(
    {
        Main: {
            screen: bottomNavigator,
        },
        Trade: TradeScreen,
        PreOrder: PreOrderScreen,
        OrderStatus: OrderStatusScreen,
        Search: SearchScreen,
        New: NewAdScreen,
        Edit: EditAdScreen,

        Login: LoginScreen,
        Register: RegisterPhoneScreen,
        UserRegister: RegisterUserScreen,

        AboutUs: AboutUsScreen,
        Authentication: AuthenticationScreen,
        Email: EmailScreen,
        FundPassword: FundPasswordScreen,
        Google: GoogleScreen,
        Help: HelpScreen,
        LoginPassword: LoginPasswordScreen,
        Phone: PhoneScreen,
        Setting: SettingScreen,
        Service: ServiceScreen,

        MyAd: MyAdScreen,
        Ad: AdScreen,

    },
    {
        headerMode: 'none'
    },
);

export default Index;
