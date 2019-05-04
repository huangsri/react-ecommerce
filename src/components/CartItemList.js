import React, { Component } from "react";
import { Box } from "grommet";
import { connect } from "react-redux";

class CartItemList extends Component {
  render() {
    const { cartItems } = this.props;
    console.log({ cartItems });
    return (
      <Box>
        {cartItems.map(item => (
          <Box>
            {item.productId} x {item.amount}
          </Box>
        ))}
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  };
};

export default connect(mapStateToProps)(CartItemList);
