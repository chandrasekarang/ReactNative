import React, { Component } from "react";
import { MapView } from "expo";
import { View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as storeActionCreators from "../actionCreators/store";

class StoreMap extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   stores: [
    //     {
    //       latitude: 13.019995,
    //       longitude: 80.185405,
    //       title: "Bay Store",
    //       id: "s1"
    //     },
    //     {
    //         latitude: 13.040172,
    //         longitude: 80.184968,
    //         title: "Pep Store",
    //         id: "s2"
    //     },
    //     {
    //         latitude: 12.990172,
    //         longitude: 80.183968,
    //         title: "Dry Store",
    //         id: "s3"
    //       }
    //   ]
    // };
  }
  componentDidMount(){
    this.props.actions.getStores();
  }
  render() {
    return (
      <View style={{flex:1}}>
        {this.props.stores.length > 0 &&
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.props.stores[0].latitude,
              longitude: this.props.stores[0].longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {this.props.stores.map(s => (<MapView.Marker
              coordinate={{
                latitude: s.latitude,
                longitude: s.longitude
              }}
              title={s.title}
              key={s.id}
            />
            ))}
          </MapView>
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    stores: state.storeState.stores,
    isLoading: state.storeState.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storeActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  StoreMap
);
