import { useForm, SubmitHandler } from "react-hook-form";
import User from "../types/user";
import * as user_api_functions from "../network/user_api";
import { Button, Container, Form } from "react-bootstrap";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const newUser: User = {
        email: data.email,
        password: data.password,
      };
      const taskResponse = await user_api_functions.createUser(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {/* include validation with required or other standard HTML validation rules */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
