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

## Technical Choices
#### Front-end framework
The basic functional requirements for a stand-alone app could have probably been achieved with vanilla html / javascript. However to fit with a component/widget-like and to demonstrate technological use capability, **[React](https://facebook.github.io/react/)** has been chosen.

#### Visual rendering
The gauge and needle shapes are achieved with **Canvas**.
The following documentation will shed light on how to draw shapes in Canvas:
- **[Arcs](https://developer.mozilla.org/it/docs/Web/API/CanvasRenderingContext2D/arc)**
- **[Lines](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Lines)**

#### Routing
**Not necessary**.

#### Back-end
**No (proxy) server required**, as all the data we need is generated via the API.

#### Data generation
Data is generated via [this API](https://widgister.herokuapp.com/challenge/frontend), and has a similar format to the one described in the data handling section. As discussed, the API is not necessarily reliable, and potential errors need to be accounted for.

#### Building
The front-end javascript is
- Transpiled from ES2015 and JSX (html-like syntax for React) to ES5 with [babel](https://babeljs.io/docs/plugins/)
- Bundled with **[webpack](https://webpack.github.io/docs/)**
- Rendered in the html document via the main script.

In development mode, webpack has [hot-reloading](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html).


## Dev Setup

## Dev Guidelines
