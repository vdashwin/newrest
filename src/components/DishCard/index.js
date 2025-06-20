import React, {Component} from 'react'

class DishCard extends Component {
  render() {
    const {dish, quantity, onQuantityChange} = this.props

    const showQuantityControls = dish.dish_Availability

    return (
      <div className="dish-card">
        <div
          className="dish-indicator"
          style={{backgroundColor: dish.dish_Type === 20 ? 'green' : 'red'}}
        ></div>
        <div className="dish-details">
          <h3 className="dish-name">{dish.dish_name}</h3>{' '}
          {/* Test Case 5, 13, 21, 22 */}
          <p className="dish-price">
            {dish.dish_currency} {dish.dish_price} {/* Test Case 6, 14 */}
          </p>
          <p className="dish-description">{dish.dish_description}</p>{' '}
          {/* Test Case 7, 15 */}
          <p className="dish-calories">{dish.dish_calories} calories</p>{' '}
          {/* Test Case 8, 16 */}
          {/* Test Case 23, 24: Customizations available */}
          {dish.addonCat && dish.addonCat.length > 0 && (
            <p className="customizations-available">Customizations available</p>
          )}
          {/* Test Case 25, 26: Not available */}
          {!dish.dish_Availability && (
            <p className="not-available">Not available</p>
          )}
          {/* Test Case 10, 11, 12, 18, 19, 20, 27: Quantity Controls */}
          {showQuantityControls ? (
            <div className="quantity-controls">
              <button
                className="quantity-button decrement"
                onClick={() => onQuantityChange(dish.dish_id, -1)}
              >
                - {/* Test Case 11, 19 */}
              </button>
              <p className="dish-quantity">{quantity}</p>{' '}
              {/* Test Case 10, 18 */}
              <button
                className="quantity-button increment"
                onClick={() => onQuantityChange(dish.dish_id, 1)}
              >
                + {/* Test Case 12, 20 */}
              </button>
            </div>
          ) : null // Test Case 27: No buttons if not available
          }
        </div>
        <img
          src={dish.dish_image}
          alt={dish.dish_name}
          className="dish-image"
        />{' '}
        {/* Test Case 9, 17 */}
      </div>
    )
  }
}

export default DishCard
