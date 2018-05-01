import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 30.8910278;
const LONGITUDE = 34.7582799;
const LATITUDE_DELTA = 0.00322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapKml extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };

    this.onKmlReady = this.onKmlReady.bind(this);
  }

  onKmlReady() {
    this.map.fitToElements(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          kmlFileName={'midburn_map.kml'}
          showsUserLocation={true}
          showsMyLocationButton
        >
        </MapView>
      </View>
    );
  }
}

MapKml.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width,
    height,
  },
});

module.exports = MapKml;