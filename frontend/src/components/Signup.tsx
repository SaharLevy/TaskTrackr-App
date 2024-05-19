import { useForm, SubmitHandler } from "react-hook-form";
import User from "../types/user";
import * as user_api_functions from "../network/user_api";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("email")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
}
