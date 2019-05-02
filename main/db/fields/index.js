
/**
 * Carolina field types
 */
exports = module.exports = {
  'Array': require('./array-field'),
  'Boolean': require('./boolean-field'),
  'Date': require('./date-field'),
  'Email': require('./email-field'),
  'Integer': require('./integer-field'),
  'IPv4': require('./ip-v4-field'),
  'Json': require('./json-field'),
  'MultiRef': require('./multi-ref-field'),
  'Number': require('./number-field'),
  'Ref': require('./ref-field'),
  'String': require('./string-field'),
  'Text': require('./text-field')
}