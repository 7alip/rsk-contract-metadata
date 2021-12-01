const { schema } = require('@uniswap/token-lists')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const TOKEN_LIST = require('../token-list.json')

async function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true })
  addFormats(ajv)
  const validator = ajv.compile(schema);

  const valid = validator(TOKEN_LIST)
  if (valid) {
    return valid
  }
  if (validator.errors) {
    return validator.errors.map(error => {
      delete error.data
      return error
    })
  }
}

validate()
  .then(console.log)
  .catch(console.error)