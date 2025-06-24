import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { productId, optionId } = useParams()
  console.log('🚀 ~ ProductDetail ~ useParams():', useParams())
  return (
    <div>
      <h1>Product Id: {productId}</h1>
      <p>This is the product detail page. {optionId}</p>
    </div>
  )
}

export default ProductDetail
