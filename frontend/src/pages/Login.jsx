// Api & Mutations
import { useMutation } from "@tanstack/react-query";
import { loginExistedUser } from "../api/auth.api.js";

// Form Data & Layout
import FormsLayout from "../components/shared/FormsLayout.jsx";
import { loginFormFields } from "../forms/login.form.js";

const Login = () => {
  // Mutation
  const mutation = useMutation({
    mutationFn: loginExistedUser,
    onSuccess: (data) => {
      console.log("Login successful. RES: ", data);
    },
    onError: (err) => {
      console.error("Login failed. ERR: ", err);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <FormsLayout
        title="Login"
        fields={loginFormFields}
        onSubmit={mutation.mutate}
        submitLabel={mutation.isPending ? "Logging in..." : "Login"}
      />
    </div>
  );
};

export default Login;
