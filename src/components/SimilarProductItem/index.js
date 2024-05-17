import './index.css'

const SimilarProductItem = props => {
  const {item} = props
  const updatedItem = {
    id: item.id,
    imageUrl: item.image_url,
    title: item.title,
    style: item.style,
    price: item.price,
    description: item.description,
    brand: item.brand,
    rating: item.rating,
  }
  return (
    <li className="li">
      <img
        src={updatedItem.imageUrl}
        className="similar-product-img"
        alt={`similar product ${updatedItem.title}`}
      />
      <h1 className="similar-product-title">{updatedItem.title}</h1>
      <p className="similar-product-brand">by {updatedItem.brand}</p>
      <div className="rate-section">
        <p className="similar-product-price">Rs {updatedItem.price}/-</p>
        <div className="rating-container">
          {updatedItem.rating}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            className="star-img"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
