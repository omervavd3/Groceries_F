import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  email: z.string().email("Invalid email"),
  userName: z.string().min(3, "Name must be at least 3 characters long"),
  password: z
    .string({ invalid_type_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    reset();
    console.log(data);
    axios
      .post("http://localhost:3000/auth/register", data)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        alert("User name or email already exists");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "30rem", padding: "2rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Register</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter email"
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("userName", { required: true })}
                type="name"
                placeholder="Enter name"
                isInvalid={!!errors.userName}
              />
              {errors.userName && (
                <Form.Control.Feedback type="invalid">
                  {errors.userName.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", { required: true, minLength: 8 })}
                type="password"
                placeholder="Password"
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Button variant="primary" type="submit" className="w-40">
                Submit
              </Button>
              <Button className="w-40 m-2" onClick={() => navigate("/")}>
                To Home Page
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
