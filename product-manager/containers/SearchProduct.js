import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Picker, Alert, Text, Platform, FlatList, ActivityIndicator } from 'react-native';
import ProductListItem from "../components/ProductListItem";
import {getSearch} from "../actionCreators/search";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

let URI = "http://172.16.99.28:4000";

class SearchProduct extends Component {
    static navigationOptions = {
        title: "Search",
        headerStyle: {
            backgroundColor: "#00ff80"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center"
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: '',
        }
    }


    onWishTapped = id => {
        // TODO: when user taps on the heart icon, you 
        // need to change the icon to full heart, which is 
        // already handled in ProductListItem based on wish property
        // you need to set the wish property to true for the tapped product
        // which is already in the state
        // implement above using react redux
    };

     /*  flat list supporting methods */

    _getMore = () => {
        this.props.getSearch(this.state.searchTxt, ++this.props.page, this.props.limit);
    };

    _renderItem = ({ index, item }) => {
        return (
            <ProductListItem
                {...this.props}
                id={item.id}
                title={`${item.id} - ${item.title}`}
                image={item.image ? `${URI}/images/${item.image}` : null}
                rating={item.rating}
                price={item.price}
                wish={item.wish || false}
                onWishTapped={this.onWishTapped}
            />
        );
    };

    _keyExtractor = (item, index) => {
        return `${index}`;
    };

 
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBG}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.control}
                        onChangeText={(searchTxt) => {
                            this.setState({ searchTxt }, ()=>{
                                this.props.getSearch(this.state.searchTxt, 1, this.props.limit);
                            });
                        }}
                        value={this.state.searchTxt}
                        placeholder="Search"
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    {this.props.isLoading ? (
                        <ActivityIndicator size="large" color="#00ff80" />
                    ) : (
                            <FlatList
                                data={this.props.products}
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                onEndReachedThreshold={0.5}
                                onEndReached={this._getMore}
                            />
                        )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        alignItems: "stretch",
        backgroundColor: '#ffffff',
    },
    searchBG: {
        backgroundColor: '#e3e3e3',
    },
    control: {
        backgroundColor: '#ffffff',
        margin: 15,
        paddingLeft: 10,
        borderRadius: 10,
        ...Platform.select({
            android: {
                height: 40
            },
            ios: {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#fff',
                marginTop: 20,
                marginBottom: 20
            }
        })
    },
    additionalInfo: {
        ...Platform.select({
            ios: {
                height: 80
            }
        })
    }
});

function mapStateToProps(state) {
    return {
        products: state.searchState.products,
        isLoading: state.searchState.isLoading,
        page: state.searchState.page,
        limit: state.searchState.limit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSearch: bindActionCreators(getSearch, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    SearchProduct
);