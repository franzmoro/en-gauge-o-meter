# EN-GAUGE-O-METER
The EN-GAUGE-O-METER is a small app which displays numerical data in the form of a gauge-type indicator.

## Requirements
#### General
- The meter shall be capable of being imported as a component / widget in a larger React app.
- The development shall show a good knowledge of **React** and **Redux**.
- The development effort shall fit within a 4 hour sprint.

#### Functional / Visual
The app shall show:
- a round gauge
- text labels for **minimum** and **maximum** range (on the sides of the gauge) and for the **current value** (on the top of the gauge).
- a needle pointing along the gauge (proportionally to current value in relation to values range).
- unit of measure (if applicable)

#### Data Handling
- The meter shall support incoming data in the following (sample) format:
```
  {
    "value": 34,
    "min": 0,
    "max": 200,
    "format": "currency",
    "unit": "GBP"
  }
```
- Shall prevent the following scenarios from producing errors:
  - values from API potentially:
    - *missing* / *undefined* / *null*
    - of *unexpected format*
  - API responding with an error (e.g. 404 / 500 status-code).

## Stretch Goals
If they can fit within the 4h development sprint, the following features / implementations will be placed in the project scope:
- **Online Continuos Integration** with Travis.CI
- **Update button** (gets fresh data from API, updates needle and labels)
- **Color Picker** (changes gauge colors)
- **Size Changing** (select canvas size)
- **Type-checking** with flow

## Technical Choices
#### Front-end framework
The basic functional requirements for a stand-alone app could have probably been achieved with vanilla html / javascript. However to fit with a component/widget-like and to demonstrate technological use capability, **[React](https://facebook.github.io/react/)** has been chosen.

#### Visual rendering
The gauge and needle shapes are achieved with **Canvas**.
The following documentation will shed light on how to draw shapes in Canvas:
- **[Arcs](https://developer.mozilla.org/it/docs/Web/API/CanvasRenderingContext2D/arc)**
- **[Lines](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Lines)**

#### Component Properties
- **PropTypes** should be enforced.
- **Default props** should also be in place for potentially undefined / missing values from API

#### Routing
**Not necessary**.

#### Back-end
**No (proxy) server required**, as all the data we need is generated via the API.

#### Data generation
Data is generated via [this API](https://widgister.herokuapp.com/challenge/frontend), and has a similar format to the one described in the data handling section. As discussed, the API is not necessarily reliable, and potential errors need to be accounted for.

#### App state management
**[Redux](
redux.js.org/)** has been chosen to allow:
- simple separation of view layer from logic, leading to:
  - improved readability
  - simplified unit-testing for the app's logic

**[Immutable.js](https://facebook.github.io/immutable-js/)** and **[pure functions](https://en.wikipedia.org/wiki/Pure_function)** ensure there will be no state mutations.

#### Testing
Testing is performed at unit level for redux actions and reducers with **[Tape](https://github.com/substack/tape)**

#### Building
The front-end javascript is
- Transpiled from ES2015 and JSX (html-like syntax for React) to ES5 with [babel](https://babeljs.io/docs/plugins/)
- Bundled with **[webpack](https://webpack.github.io/docs/)**
- Rendered in the html document via the main script.

In development mode, webpack has [hot-reloading](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html).

#### Online deployment
This is easily done via **GH pages** (see the guide [here](https://help.github.com/articles/user-organization-and-project-pages/)), as there is no back-end server and the React-app is bundled to ES5.

## Dev Setup
- clone the repo ```git clone ```
- Install the dev-dependencies ```npm install```
- Start webpack-dev-server: ```npm run dev:start```

## Dev Guidelines
#### Styling
**Shall be included in the component** and not in a centralized css stylesheet. This is especially important to avoid potential clashes with other widget/components class-names part of the "larger app".

#### Commit style
Leave 1 line of whitespace between the following lines:

- **Emoji + Brief description**:
Description shall fit in 1 line.
Emoji to describe immediately the type of commit (see emoji guide [here](emoji_guide.md)).

- **Body in greater detail**:
Explain the problem being solved by this commit (how and why, if applicable).
- **Reference to Github Issue / Pull Request**, e.g.:
```
relates to #12, #19
```
