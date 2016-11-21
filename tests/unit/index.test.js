require('babel-core/register')({ presets: ['es2015', 'react', 'stage-0'] });

const test = require('tape');
const syncFlow = require('sync-flow');
const configureStore = require('../../src/configure_store.js');
const {
  actions: {
    setGaugeDimensions,
    setStyle,
    isResponseOk,
    setNewData
  },
  reducers
} = require('../../src/smart_gauge/');
const mockResponses = require('../fixtures/mock_responses.json');
const mockOutputs = require('../fixtures/mock_output.json');

test('UNIT:CONFIG --> CREATE STORE', t => {
  const { getState } = configureStore({ reducers });
  const exec = [
    () => {
      t.deepEqual(
        getState().toJS(),
        require('../fixtures/mock_state.js'),
        'correct initial state'
      );
      t.end();
    }
  ];
  syncFlow(exec,t.end,200);
});

test('UNIT:ACTIONS --> setGaugeDimensions', t => {
  const { dispatch, getState } = configureStore({ reducers });
  const mockGaugeDimensions = {
    xRef: 100,
    yRef: 200,
    radius: 83
  };
  const exec = [
    () => {
      dispatch(setGaugeDimensions(mockGaugeDimensions));
    },
    () => {
      const dimensions = getState().get('dimensions').toJS();
      t.deepEqual(
        dimensions,
        mockGaugeDimensions,
        'correctly set dimensions to redux store'
      );
      t.end();
    }
  ];
  syncFlow(exec, t.end, 200);
});

test('UNIT:ACTIONS --> setStyle', t => {
  const { dispatch, getState } = configureStore({ reducers });
  const mockStyle = {
    needleStrokeStyle: 'orange',
    gaugeStrokeStyle: '#EEEEEE',
    labelFont: '20px Fontello'
  };
  const exec = [
    () => {
      dispatch(setStyle(mockStyle));
    },
    () => {
      const dimensions = getState().get('style').toJS();
      t.deepEqual(
        dimensions,
        mockStyle,
        'correctly set style to redux store'
      );
      t.end();
    }
  ];
  syncFlow(exec, t.end, 200);
});

test('UNIT:ACTIONS --> isResponseOk', t => {
  const expectedOutcomes = {
    'good1': true,
    'good2': true,
    'trickyButIncorrect': false
  };
  Object.keys(expectedOutcomes).map(type => {
    t.equal(
      isResponseOk(mockResponses[type]),
      expectedOutcomes[type],
      `not fooled by response of type "${type}"`
    );
  });
  t.end();
});

test('UNIT:ACTIONS --> setNewData with unit', t => {
  const { dispatch, getState } = configureStore({ reducers });
  const dataCase = 'good1';
  const mockInputData = mockResponses[dataCase].data;
  const mockOutputData = mockOutputs[dataCase];

  const exec = [
    () => {
      dispatch(setNewData(mockInputData));
    },
    () => {
      const dataState = getState().get('data');
      t.deepEqual(
        dataState.toJS(),
        mockOutputData,
        'correctly set labels and ratio'
      );
    }
  ];
  syncFlow(exec, t.end, 200);
  t.end();
});

test('UNIT:ACTIONS --> setNewData no unit', t => {
  const { dispatch, getState } = configureStore({ reducers });
  const dataCase = 'good2';
  const mockInputData = mockResponses[dataCase].data;
  const mockOutputData = mockOutputs[dataCase];

  const exec = [
    () => {
      dispatch(setNewData(mockInputData));
    },
    () => {
      const dataState = getState().get('data');
      t.deepEqual(
        dataState.toJS(),
        mockOutputData,
        'correctly set labels and ratio'
      );
    }
  ];
  syncFlow(exec, t.end, 200);
  t.end();
});
