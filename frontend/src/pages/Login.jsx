// Api & Mutations
import { useMutation } from "@tanstack/react-query";
import { loginExistedUser } from "../api/auth.api.js";

// Form Data & Layout
import FormsLayout from "../components/shared/FormsLayout.jsx";
import { loginFormFields } from "../forms/login.form.js";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth.slice.js";

const Login = () => {
  const dispatch = useDispatch();

  // Mutation
  const mutation = useMutation({
    mutationFn: loginExistedUser,
    onSuccess: (data) => {
      console.log("Login successful. RES: ", data);
      dispatch(setUser(data));
    },
    onError: (err) => {
      console.error("Login failed. ERR: ", err);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Login form */}
      <FormsLayout
        title="Login"
        fields={loginFormFields}
        onSubmit={mutation.mutate}
        submitLabel={mutation.isPending ? "Logging in..." : "Login"}
        disabled={mutation.isPending}
      />
    </div>
  );
};

export default Login;
