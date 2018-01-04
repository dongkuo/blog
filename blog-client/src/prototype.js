Array.prototype.remove = function (obj, fun) {
  for (var i = 0; i < this.length; i++) {
    if ((fun && fun(this[i])) || this[i] === obj) {
      this.splice(i, 1);
      return i;
    }
  }
};

Array.prototype.addAll = function (array) {
  array.forEach(obj => {
    this.push(obj)
  })
}

Array.prototype.contains = function (needle, equal) {
  if (!(needle instanceof Array)) {
    for (let value of this) {
      if ((equal instanceof Function && equal(value, needle)) || value === needle) {
        return true;
      }
    }
    return false;
  }
  for (let value of needle) {
    if (!this.contains(value)) {
      return false;
    }
  }
  return true;
};
