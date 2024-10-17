import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardText } from 'react-bootstrap';
// import { FaStar } from 'react-icons/fa';

const Products = () => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const response = await fetch("https://dummyjson.com/products?limit=40");
        const data = await response.json();

        if(data && data.products){
            setProducts(data.products);
            console.log(data);
        }
    }

    useEffect(()=> {
        getProducts();
    }, [])
    
  return (
    <>
    <Container>
      <Row>
       { products.map((item) => { return <Col>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.thumbnail} />
        <Card.Body>

            <Card.Title>{item.title}</Card.Title>
            <p>
                {item.category}
            </p>
           <Row>
            <Col>
            <Card.Text>
            {(item.price - (item.discountPercentage / 100 * item.price)).toFixed(2)}

            </Card.Text>
            
            </Col>
            <Col>
            <CardText>
                <p className='text-end'>
                {item.price}
                </p>
            </CardText>
            </Col>
           </Row>
              { item.stock <= 5 && <p className='text-danger'>Only {item.stock} left in stock</p> }
            <Button variant="primary">Go somewhere</Button>

            
            {/* <FaStar
              className="star"
              color={item.rating <= (5) ? "#ffc107" : "#e4e5e9"} // Yellow or grey
              size={30}
            
            /> */}
            
            {item.rating} / 5 
        </Card.Body>
        </Card>
        </Col> }) }
    
      </Row>
    </Container>


    </>
  )
}

export default Products