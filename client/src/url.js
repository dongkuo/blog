const url = {}

url.buildQueries = (obj) => {
  var result = ''
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      var value = obj[name]
      if (value !== undefined && value !== null) {
        if (result) {
          result += '&'
        }
        result += name + '=' + value
      }
    }
  }
  return result
}

export default url
