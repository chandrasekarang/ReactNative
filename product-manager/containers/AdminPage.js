import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Picker, Alert, Text, Platform, FlatList, ActivityIndicator } from 'react-native';
import ProductListItem from "../components/ProductListItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";

let URI = "http://172.16.99.28:4000";

class AdminPage extends Component {
    static navigationOptions = {
        title: "Admin",
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

    componentDidMount() {
        this.props.actions.getProducts(1, this.props.limit);
    }

    onDeleteTapped = id => {
        Alert.alert(
            'Delete confirmation',
            'Are you sure to delete?',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'OK', onPress: () => this.props.actions.deleteProduct(id) },
            ],
            { cancelable: false }
        );
    };

    /*  flat list supporting methods */

    _getMore = () => {
        this.props.actions.getProducts(++this.props.page, this.props.limit);
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
                type="admin"
                onDeleteTapped={this.onDeleteTapped}
            />
        );
    };

    _keyExtractor = (item, index) => {
        return `${index}`;
    };


    render() {
        return (
            <View style={styles.container}>
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
        products: state.productState.products,
        isLoading: state.productState.isLoading,
        isRefreshing: state.productState.isRefreshing,
        page: state.productState.page,
        limit: state.productState.limit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    AdminPage
);