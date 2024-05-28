import { useForm, SubmitHandler } from "react-hook-form";
import User from "../types/user";
import { useSignup } from "../hooks/useSignup";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../styles/UserSignup.module.css";

export default function Signup() {
  const { signup, error, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const newUser: User = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      };
      await signup(newUser);
      alert("User created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container
        className={`mt-4 py-3 d-flex align-items-center flex-column ${styles.signupContainer}`}
      >
        <h2 className="fw-bold pb-2">Create Your User </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Form.Group className="mb-3" controlId="formBasicUserFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              {...register("fullname", { required: true })}
              type="fullname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email", { required: true })}
              type="email"
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
