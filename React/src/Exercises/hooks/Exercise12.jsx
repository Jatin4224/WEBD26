/*

Logging a particular value
Below, we have a signup form with several React state variables.

Our goal is to add a console.log that fires only when the value of “email” changes. We should see the user's email logged in the console whenever they edit that field.

Acceptance Criteria:

Whenever the user changes the value of the “email” state variable, the new value should be logged to the console.
Nothing should be logged when the user changes another field (for example, their city or postal code).
The logging should be done inside an effect, not within the onChange event handler.
Stretch Goal:

Update the code so that name is also logged whenever it changes.
Code Playground

Reset Code
Show line numbers
Format code using Prettier


*/
import React, { useEffect } from "react";

function SignupForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  //solution
  useEffect(() => {
    console.log(email);
  }, [email]);

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <form>
      <Field
        id="name"
        label="Preferred Name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <Field
        id="email"
        type="email"
        label="Email Address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <div className="row">
        <Field
          id="city"
          label="City"
          grow={2}
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />

        <Field
          id="postal-code"
          label="Postal Code"
          grow={1}
          value={postalCode}
          onChange={(event) => {
            setPostalCode(event.target.value);
          }}
        />
      </div>

      <button>Sign up</button>
    </form>
  );
}

function Field({ id, label, type = "text", grow, value, onChange }) {
  return (
    <div className="field" style={{ flexGrow: grow }}>
      <label htmlFor={id}>{label}</label>

      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
}

export default SignupForm;
