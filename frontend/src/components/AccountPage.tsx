import { Container, Form, Button, InputGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUpdateUser from "../hooks/useUpdateUser";
import { useAuthContext } from "../hooks/useAuthContext";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const AccountPage = () => {
  const { user } = useAuthContext();
  const { updateUser, error } = useUpdateUser();
  const [key, setKey] = useState(0); // Add key for forcing re-render

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      password: "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        password: "",
      });
      setKey((prev) => prev + 1); // Force re-render when user data changes
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    const { fullName, email, password } = data;
    const success = await updateUser(fullName, email, password);
    if (success) {
      // Force a re-render after successful update
      setKey((prev) => prev + 1);
      // Clear password field
      reset({
        fullName: success.fullName,
        email: success.email,
        password: "",
      });
    }
  };

  return (
    <Container
      key={key}
      className="mt-4 py-3 d-flex align-items-center flex-column"
    >
      <h2 className="mb-4 fw-bold pb-2">Account Settings</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit(onSubmit)} className="settings-form w-50">
        <Form.Group controlId="fullName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              {...register("fullName")}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                {errors.password.message}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>

        <div className="d-flex justify-content-center my-4">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AccountPage;
