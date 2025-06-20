import React, {Component} from 'react'
import Header from './components/Header'
import MenuCategories from './components/MenuCategories'
import DishCard from './components/DishCard'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css' // For general app layout and styling

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

class App extends Component {
  state = {
    restaurantName: '',
    menuCategories: [],
    activeCategory: '',
    dishes: [],
    cart: {}, // { dishId: quantity }
    loading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchRestaurantData()
  }

  // Test Case 1: When the Page is opened, an HTTP GET request should be made
  fetchRestaurantData = async () => {
    this.setState({loading: true, error: null})
    try {
      const response = await fetch(dishesApiUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const restaurantDetails = data[0] // Assuming the first item contains overall restaurant details

      // Test Case 2: Page should consist of an HTML heading with "UNI Resto Cafe" (restaurant_name)
      // Test Case 4 & 33: HTML button elements for menu categories, not hardcoded
      // Test Case 33: Tabs length changes as per API
      this.setState(
        {
          restaurantName: restaurantDetails.restaurant_name,
          menuCategories: restaurantDetails.table_menu_list,
          loading: false,
        },
        () => {
          // Set initial active category and load dishes for it
          if (this.state.menuCategories.length > 0) {
            this.handleCategoryClick(this.state.menuCategories[0].menu_category)
          }
        },
      )
    } catch (error) {
      console.error('Failed to fetch restaurant data:', error)
      this.setState({
        error: 'Failed to load restaurant data. Please try again.',
        loading: false,
      })
    }
  }

  // Handler for category clicks
  handleCategoryClick = categoryName => {
    this.setState({activeCategory: categoryName}, () => {
      this.renderCategoryDishes()
    })
  }

  renderCategoryDishes = () => {
    const {menuCategories, activeCategory} = this.state
    const currentCategoryData = menuCategories.find(
      category => category.menu_category === activeCategory,
    )

    this.setState({
      dishes: currentCategoryData ? currentCategoryData.category_dishes : [],
    })
  }

  // Test Case 28, 29, 30, 31, 32: Update dish quantity and cart count
  handleQuantityChange = (dishId, change) => {
    this.setState(prevState => {
      const currentQuantity = prevState.cart[dishId] || 0
      let newQuantity = currentQuantity + change

      // Test Case 30: Prevent decrement below 0
      if (newQuantity < 0) {
        newQuantity = 0
      }

      return {
        cart: {
          ...prevState.cart,
          [dishId]: newQuantity,
        },
      }
    })
  }

  // Calculate total items in cart for cart icon display
  getCartCount = () => {
    let total = 0
    for (const dishId in this.state.cart) {
      total += this.state.cart[dishId]
    }
    return total
  }

  render() {
    const {
      restaurantName,
      menuCategories,
      activeCategory,
      dishes,
      cart,
      loading,
      error,
    } = this.state
    const cartCount = this.getCartCount()

    if (loading) {
      return <LoadingSpinner />
    }

    if (error) {
      return <div className="error-message">{error}</div>
    }

    return (
      <div className="app-container">
        <Header restaurantName={restaurantName} cartCount={cartCount} />{' '}
        {/* Test Case 2 & 3 */}
        <MenuCategories
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryClick={this.handleCategoryClick}
        />{' '}
        {/* Test Case 4 & 33 */}
        <div className="dishes-list">
          {dishes.length > 0 ? (
            dishes.map(dish => (
              <DishCard
                key={dish.dish_id}
                dish={dish}
                quantity={cart[dish.dish_id] || 0} // Test Case 10 & 18
                onQuantityChange={this.handleQuantityChange}
              /> // Test Cases 5-9, 11-12, 13-17, 19-20, 21-27, 28-32
            ))
          ) : (
            <p className="no-dishes-message">
              No dishes available for this category.
            </p>
          )}
        </div>
      </div>
    )
  }
}

export default App
