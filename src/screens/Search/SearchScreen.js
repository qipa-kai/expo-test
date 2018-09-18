import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import {
    TabView,
    TabBar,
    PagerExperimental,
    SceneMap,
    type Route,
    type NavigationState,
} from 'react-native-tab-view';
import * as GestureHandler from 'react-native-gesture-handler';

import SwitchSelector from '../../components/SwitchSelector';
import SearchAd from './SearchAdScreen';
import SearchUser from './SearchUserScreen';

import currentLanguages from '../../config/currentLanguages';
import colorSchema from '../../theme/colorSchema';

type State = NavigationState<
    Route<{
        key: string,
        title: string,
    }>
>;

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class TradeScreen extends React.Component {

    state = {
        index: 0,
        routes: [
            { key: 'ad', title: '找广告' },
            { key: 'user', title: '找用户' },
        ],
    };

    _handleIndexChange = index =>
        this.setState({
            index,
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
        ad: SearchAd,
        user: SearchUser,
    });

    _renderPager = props => (
        <PagerExperimental GestureHandler={GestureHandler} {...props} />
    );

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
                    centerComponent={{ text: '搜索', style: { color: colorSchema.TEXT_HEADER_COLOR_1 } }}
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
        backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
    },
    tabbar: {
        backgroundColor: colorSchema.DARK_UI_BACKGROUND_COLOR,
    },
    label: {
        color: colorSchema.TEXT_HEADER_COLOR_3,
        fontWeight: '600',
    },
    indicator: {
        backgroundColor: colorSchema.MAIN_UI_ACTIVE_COLOR,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 4,
    },
});
