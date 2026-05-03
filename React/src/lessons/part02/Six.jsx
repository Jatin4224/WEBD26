// import React, { useState } from "react";
// import HookForm from "./HookForm";
// import ManualForm from "./ManualForm";

// //conditional rendering
// const Six = () => {
//   const [tab, setTab] = useState("shell");
//   return (
//     <div className="text-white">
//       <div className="tab text-red-900 bg-red-200 w-50">
//         <button onClick={() => setTab("manual")}>Manual</button>
//       </div>
//       <div className="tab text-red-900 bg-red-200 w-50">
//         <button onClick={() => setTab("shell")}>Manual</button>
//       </div>
//       <h1>conditional rendering</h1>
//       {tab === "manual" ? <HookForm /> : <ManualForm />}
//     </div>
//   );
// };

// export default Six;
import React, { useState } from "react";
import HookForm from "./HookForm";
import ManualForm from "./ManualForm";

// Conditional Rendering
const Six = () => {
  const [tab, setTab] = useState("manual");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center py-10 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8 tracking-wide text-center">
        Conditional Rendering
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 bg-gray-800 p-2 rounded-2xl shadow-lg">
        <button
          onClick={() => setTab("manual")}
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
            tab === "manual"
              ? "bg-red-500 text-white shadow-md scale-105"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Manual Form
        </button>

        <button
          onClick={() => setTab("hook")}
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
            tab === "hook"
              ? "bg-blue-500 text-white shadow-md scale-105"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Hook Form
        </button>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700">
        {tab === "manual" ? <ManualForm /> : <HookForm />}
      </div>
    </div>
  );
};

export default Six;
