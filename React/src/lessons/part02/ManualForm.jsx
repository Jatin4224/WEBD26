// import React, { useState } from "react";

// const ROLES = ["frontend", "backend", "ai engineer"];

// const ManualForm = () => {
//   //step 1 of form handling - handling the state
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     role: "frontend",
//     experience: "",
//     coverLetter: "",
//   });

//   //step2 - handling errors
//   const [errors, SetErrors] = useState({});

//   //step 3 - submitted state rakhna jruri h form m .
//   const [submitted, setSubmitted] = useState(false);

//   //step 4 - confusing code
//   function set(field) {
//     return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
//   }

//   function HandleSubmit(event) {
//     event.preventDefault();
//     const e = validate(values);
//     SetErrors(e);
//     if (Object.keys(e).length === 0) setSubmitted(true); //agar error m kuch gaya hi nahi hain.

//     if (submitted) {
//       return (
//         <div>
//           <form onSubmit={submit} noValidate>
//             <label>
//               full Name
//               <input value={values.name} onChange={() => set("name")} />
//             </label>
//           </form>
//         </div>
//       );
//     }
//   }
//   return <div>ManualForm</div>;
// };

// export default ManualForm;
import React, { useState } from "react";

const ROLES = ["frontend", "backend", "ai engineer"];

const ManualForm = () => {
  // Step 1 - Form State
  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "frontend",
    experience: "",
    coverLetter: "",
  });

  // Step 2 - Error State
  const [errors, setErrors] = useState({});

  // Step 3 - Submitted State
  const [submitted, setSubmitted] = useState(false);

  // Handle Input Change
  function set(field) {
    return (e) =>
      setValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
  }

  // Validation
  function validate(data) {
    const err = {};

    if (!data.name.trim()) err.name = "Full name is required";
    if (!data.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      err.email = "Enter a valid email";

    if (!data.experience) err.experience = "Experience is required";

    if (!data.coverLetter.trim()) err.coverLetter = "Cover letter is required";

    return err;
  }

  // Submit Form
  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  }

  // Success UI
  if (submitted) {
    return (
      <div className="bg-green-500/10 border border-green-500 text-green-400 p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-3">🎉 Application Submitted!</h2>
        <p className="text-gray-300">
          Thanks <span className="font-semibold">{values.name}</span>, we’ll
          contact you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-3xl shadow-2xl border border-gray-800">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2">🚀 Job Application Form</h1>
      <p className="text-gray-400 mb-8">
        Fill in your details and apply for your dream role.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Full Name */}
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            value={values.name}
            onChange={set("name")}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">Email Address</label>
          <input
            type="email"
            value={values.email}
            onChange={set("email")}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 font-medium">Select Role</label>
          <select
            value={values.role}
            onChange={set("role")}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-2 font-medium">Experience (Years)</label>
          <input
            type="number"
            value={values.experience}
            onChange={set("experience")}
            placeholder="e.g. 2"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          />
          {errors.experience && (
            <p className="text-red-400 text-sm mt-1">{errors.experience}</p>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block mb-2 font-medium">Cover Letter</label>
          <textarea
            rows="5"
            value={values.coverLetter}
            onChange={set("coverLetter")}
            placeholder="Tell us why you're the best fit..."
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none resize-none"
          />
          {errors.coverLetter && (
            <p className="text-red-400 text-sm mt-1">{errors.coverLetter}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition-transform font-semibold shadow-lg"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ManualForm;
