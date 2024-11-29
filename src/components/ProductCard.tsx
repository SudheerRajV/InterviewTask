import Card from 'react-bootstrap/Card';
const ProductCard = ({product}: any) => {
    //console.log('product', product)
  return (
    <>
      <Card className="d-flex flex-row align-items-center p-2 mt-1">
              {/* Image on the left */}
              <Card.Img
                src={product.image}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
                className="me-3"
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text  className="text-truncate-two-lines">{product.description}</Card.Text>
              </Card.Body>
    </Card>
    </>
  );
}

export default ProductCard