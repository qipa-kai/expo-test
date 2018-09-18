import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import colorSchema from '../../theme/colorSchema';

export default class OrderStatus extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            ad_no: navigation.getParam('ad_no'),
        };

        this.printLog = this.printLog.bind(this);
    }

    printLog(){
        console.log(this.state.ad_no);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <Text style={styles.testText}>{this.state.ad_no}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSchema.DARK_BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    testText: {
        color: colorSchema.TEXT_HEADER_COLOR_2
    }
});
