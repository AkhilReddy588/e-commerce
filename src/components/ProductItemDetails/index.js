import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {similarProducts: []},
    count: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  onIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrease = () => {
    this.setState(prevState => {
      if (prevState.count > 1) {
        return {count: prevState.count - 1}
      }
      return null
    })
  }

  onContinue = () => {
    const {history} = this.props
    history.push('/products')
  }

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    const updatedData = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      brand: data.brand,
      price: data.price,
      description: data.description,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
      style: data.style,
      similarProducts: data.similar_products,
    }
    if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    } else {
      this.setState({
        productDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProductDetails = () => {
    const {productDetails, count} = this.state
    const {similarProducts} = productDetails
    return (
      <div className="product-details-container">
        <div className="top-section">
          <div className="product-img-container">
            <img
              src={productDetails.imageUrl}
              alt="product"
              className="product-img"
            />
          </div>
          <div className="content-section">
            <h1 className="product-title">{productDetails.title}</h1>
            <p className="product-price">Rs {productDetails.price}/-</p>
            <div className="feedback">
              <div className="rating">
                <p>{productDetails.rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-icon"
                />
              </div>
              <p className="reviews">{productDetails.totalReviews} Reviews</p>
            </div>
            <p className="product-description">{productDetails.description}</p>
            <div className="product-availability">
              <p>Available:</p>
              <p className="span-availability">{productDetails.availability}</p>
            </div>
            <div className="product-availability">
              <p>Brand:</p>
              <p className="span-availability">{productDetails.brand}</p>
            </div>
            <hr className="line" />
            <div className="count-section">
              <button
                aria-label="Decrease Quantity"
                data-testid="minus"
                onClick={this.onDecrease}
                className="count-btn"
              >
                <BsDashSquare />
              </button>
              <p className="count">{count}</p>
              <button
                aria-label="Increase Quantity"
                data-testid="plus"
                onClick={this.onIncrease}
                className="count-btn"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-to-crt-btn">Add To Cart</button>
          </div>
        </div>
        <div>
          <h1 className="similar-heading">Similar Products</h1>
          <ul className="similar-produts-section">
            {similarProducts.map(eachItem => (
              <SimilarProductItem item={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureCase = () => (
    <div className="failure-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="not-found-heading">Product Not Found</h1>
      <button onClick={this.onContinue} className="failure-btn">
        Continue Shopping
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loading-section" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let value
    switch (apiStatus) {
      case apiStatusConstants.success:
        value = this.renderProductDetails()
        break
      case apiStatusConstants.failure:
        value = this.renderFailureCase()
        break
      case apiStatusConstants.inProgress:
        value = this.renderLoading()
        break
      default:
        value = null
    }
    return (
      <div>
        <Header />
        {value}
      </div>
    )
  }
}

export default ProductItemDetails
