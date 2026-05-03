// import React from "react";
// import { useForm } from "react-hook-form";
// const ROLES = ["frontend", "backend", "ai engineer"];

// const HookForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors: isSubmitSuccessful, isSubmitting },
//     getValues,
//   } = useForm({ defaultValues: { naem: "jatin" }, mode: "onTouched" });

//   if (isSubmitSuccessful) {
//     return (
//       <div>
//         <h1>Form Submitted successfully</h1>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <Form onSubmit={handleSubmit(submit)}> atta hun</Form>
//       <label>
//         full name
//         <input {...register("name", { required: "name is required" })} />
//       </label>
//       <label>
//         email
//         <input {...register("email", { required: "email is required" })} />
//       </label>
//       <buton type="submit"></buton>
//     </div>
//   );
// };

// export default HookForm;
import React from "react";
import { useForm } from "react-hook-form";

const ROLES = ["frontend", "backend", "ai engineer"];

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "frontend",
    },
    mode: "onTouched",
  });

  // Submit Handler
  const submit = async (data) => {
    console.log("Submitted Data:", data);

    // fake loading
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  // Success Screen
  if (isSubmitSuccessful) {
    return (
      <div className="max-w-xl mx-auto bg-green-500/10 border border-green-500 text-green-400 p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-3">
          🎉 Form Submitted Successfully
        </h1>
        <p className="text-gray-300">Your application has been received.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-3xl shadow-2xl border border-gray-800">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2">⚡ React Hook Form</h1>
      <p className="text-gray-400 mb-8">
        Faster and cleaner form handling using react-hook-form.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 font-medium">Select Role</label>
          <select
            {...register("role")}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 hover:scale-[1.02] transition-transform font-semibold shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Form"}
        </button>
      </form>
    </div>
  );
};

export default HookForm;
