import { useForm, SubmitHandler } from "react-hook-form";
import User from "../types/user";
import * as user_api_functions from "../network/user_api";
import { Button, Container, Form } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/UserSignup.module.css";

export default function Login() {
  const { login, error, isLoading } = useLogin();
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
      //const taskResponse = await user_api_functions.createUser(newUser);
      await login(newUser.email, newUser.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="mt-4 d-flex align-items-center flex-column">
        <h2 className="fw-bold pb-2">Please Login! </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email", { required: true })}
              type="email"
            />
          </Form.Group>
          {/* include validation with required or other standard HTML validation rules */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password", { required: true })}
              type="password"
            />
          </Form.Group>
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}

          <Button disabled={isLoading ?? false} variant="primary" type="submit">
            Submit
          </Button>
          {error && <div className={`p-1 mt-3 ${styles.error}`}>{error}</div>}
        </Form>
      </Container>
    </>
  );
}
