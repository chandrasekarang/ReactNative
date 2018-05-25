import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";

let URI = "http://172.16.99.28:4000";

class ProductDetail extends React.Component {
  //static navigationOptions = { title: "Product Detail" };
  static navigationOptions = ({ navigation }) => ({
    title: `Product Detail for ${navigation.state.params.id}`
  });

  constructor(props) {
    super(props);
    //this.state = { product: {}, isLoading: false };
  }

  componentDidMount() {
    //this.setState({ isLoading: true });
    let { id } = this.props.navigation.state.params;
    console.log(id);
    this.props.actions.getProduct(id);
    // fetch(`${URI}/products/${id}`)
    //   .then(r => r.json())
    //   .then(product =>
    //     this.setState({ product, isLoading: false })
    //   );
  }

  renderProduct() {
    const { navigation, productDetails } = this.props;
    // const { product } = this.state;
    return (<View>
      <Image
        source={productDetails.image ? { uri: `${URI}/images/${productDetails.image}` } : require("../assets/barcode.png")}
        style={{ height: 200, marginTop: 20 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>{productDetails.id} - {productDetails.title}</Text>
      <Text style={[styles.title, { fontSize: 16 }]}>
        {productDetails.additionalInfo && `(${productDetails.additionalInfo})`}
      </Text>
    </View>)
  }

  render() {

    return (
      <View style={styles.container}>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
            this.renderProduct()
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    padding: 10
  },
  title: {
    fontSize: 24,
    padding: 10
  }
});

// export default ProductDetail;

function mapStateToProps(state) {
  return {
    productDetails: state.productState.product,
    isLoading: state.productState.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ProductDetail
);
