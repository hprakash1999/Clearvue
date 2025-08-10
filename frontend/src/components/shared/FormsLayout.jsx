// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FormsLayout = ({ title, fields, onSubmit, submitLabel = "Submit", disabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    onSubmit(values);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-center text-2xl font-bold text-gray-800">{title}</h2>

      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      ))}

      <button
        type="submit"
        className={`w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 ${disabled ? "cursor-not-allowed bg-gray-500" : ""}`}
        disabled={disabled}
      >
        {submitLabel}
      </button>
    </motion.form>
  );
};

export default FormsLayout;
