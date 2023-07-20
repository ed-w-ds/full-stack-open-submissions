// info for printing log messages
// error for printing error messages
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}
module.exports = {
  info, error,
}
