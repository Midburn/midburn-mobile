import React from 'react';
import { StyleSheet, Dimensions, View, Platform } from 'react-native';

import Pdf from 'react-native-pdf';

export default class MapScreen extends React.Component {
    render() {
        const source = Platform.select({
            ios: () => require('../../../data/2018/map/CityMap2018.pdf'),  // ios only
            android: () => { uri:'bundle-assets://test.pdf' }, // change to real path, or add to android asserts
        })();

        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    style={styles.pdf}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});
