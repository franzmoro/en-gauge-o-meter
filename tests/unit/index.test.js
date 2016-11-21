require('babel-core/register')({ presets: ['es2015', 'react', 'stage-0'] });

const test = require('tape');
const syncFlow = require('sync-flow');
const reducers = require('../../src/smart_gauge/reducers.js');
const configureStore = require('../../src/configure_store.js');

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
