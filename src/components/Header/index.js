import React, { Component } from 'react';


class Header extends Component {
  render() {
    const { restaurantName, cartCount } = this.props;
    return (
      <header className="header">
        <h1 className="restaurant-heading">{restaurantName}</h1> {/* Test Case 2 */}
        <div className="cart-section">
          <p className="my-orders-text">My Orders</p> {/* Test Case 3 */}
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cartCount}</span> {/* Test Case 28, 29, 31, 32 */}
        </div>
      </header>
    );
  }
}

export default Header;