import Login from "./Login";
import Register from "./Register";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to Groceries App</h1>
        <p className="lead text-muted">
          Your one-stop solution for managing groceries and shopping lists with ease.
        </p>
      </div>

      <Row className="justify-content-center">
        {/* Login Section */}
        <Col md={5} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Card.Text className="text-center text-muted">
                Already have an account? Log in to continue!
              </Card.Text>
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => navigate("/login")}
                  className="w-100"
                >
                  Go to Login
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Register Section */}
        <Col md={5} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              <Card.Text className="text-center text-muted">
                New here? Create an account to get started.
              </Card.Text>
              <div className="text-center">
                <Button
                  variant="success"
                  onClick={() => navigate("/register")}
                  className="w-100"
                >
                  Go to Register
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Routes for Login and Register */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Container>
  );
};

export default HomePage;
