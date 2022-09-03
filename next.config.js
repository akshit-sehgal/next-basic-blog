const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      env: {
        some_random_key: 'some_random_dev_value' // Available as key value pairs within process.env
      }
    };
  }
  return {
    env: {
      some_random_key: 'some_random_prod_value' // Available as key value pairs within process.env
    }
  };
};