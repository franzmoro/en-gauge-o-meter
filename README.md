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

## Dev Setup

## Dev Guidelines
