import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button, Container, Form } from "react-bootstrap";

interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: any;
}

interface Category {
  _id?: string;
  name: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCategoryFilter = (categoryId: string) => {
    console.log(categoryId)
    if (categoryId === "All Categories") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === categoryId);
      setFilteredProducts(filtered);
    }
  };

  return (
    <Container className="mt-5">
      <div className="text-center mb-4">
        <h2>Shop by Category</h2>
        <Form.Select
          aria-label="Category filter"
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map((product: Product) => (
          <Col key={product._id}>
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.price < 0 ? "Price unknown" : `$${product.price}`}
                </Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" className="w-100">
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
