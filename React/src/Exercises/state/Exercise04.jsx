/*
Controlled Country Picker
The “Big List O’ Countries” select is a staple of e-commerce sites. Let's build one!

Using the data provided in the COUNTRIES object, create a <select> tag with options for every country. Bind this <select> tag to the provided country state variable.

Acceptance Criteria:

Use the COUNTRIES constant to dynamically generate the set of <option> elements.
In order to map over an object, you'll need to use something like Object.keys() or Object.entries()
There should be a "blank" option, selected by default. It shouldn't default to the first country in the list.
The indicator at the bottom should update when the user changes their selected country.
No warnings in the dev console


*/

// import { COUNTRIES } from "./data";

/*
 “COUNTRIES” is a dictionary-like object
 with the following shape:

 {

 }
*/
import React from "react";

const DATA = { AF: "Afghanistan", AL: "Albania", DZ: "Algeria" };
const countries = Object.entries(DATA);
function Exercise04() {
  const [country, setCountry] = React.useState("");

  return (
    <form>
      <fieldset>
        <legend>Shipping Info</legend>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          {" "}
          <option value="">Select a country</option>
          {countries.map(([id, label]) => (
            <option key={id} value={label}>
              {label}
            </option>
          ))}
        </select>
      </fieldset>

      <p className="country-display">Selected country: {country}</p>

      <button>Submit</button>
    </form>
  );
}

export default Exercise04;
