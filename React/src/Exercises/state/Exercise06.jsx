/*

Generative Art
In this exercise, we're building a tool to produce generative art!

The tool is nearly complete, but the form controls need to be wired up. Your job is to connect the React state to the form controls, so that tweaking the controls will update the art.


Acceptance Criteria:

The range slider should be bound to the numOfLines state.
The select control should be bound to the colorTheme state.
The radio buttons should be bound to the shape state.
The radio button labels should work correctly. The user should be able to click the text "Polygons" to select that option.
The inputs should conform to HTML standards (eg. radio buttons should be grouped using the “name” attribute).


*/

import React from "react";

import GenerativeArt from "./GenerativeArt";

function App() {
  const [numOfLines, setNumOfLines] = React.useState(5);

  /*
 Accepted values:
 - basic
 - monochrome
 - froot-loops
 - spooky
 */
  const [colorTheme, setColorTheme] = React.useState("basic");

  /*
 Accepted values:
 - circles
 - polygons
 */
  const [shape, setShape] = React.useState("circles");

  return (
    <>
      <GenerativeArt
        numOfLines={numOfLines}
        colorTheme={colorTheme}
        shape={shape}
      />

      <form>
        <fieldset>
          <legend>Controls</legend>
          <div className="row">
            <div className="col">
              <label htmlFor="num-of-lines" className="control-heading">
                Number of Lines:
              </label>
              <input id="num-of-lines" type="range" min="1" max="15" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="control-heading" htmlFor="color-theme">
                Color Theme:
              </label>
              <select id="color-theme">
                <option value="basic">Basic</option>
                <option value="monochrome">Monochrome</option>
              </select>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}
