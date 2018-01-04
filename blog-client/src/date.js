function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

function formatFriendly(time) {
  let now = Date.now()
  let delta = now - time
  let entering = [1000, 60, 60, 24, 31, 12] // 进率
  let unitNames = ['秒', '分钟', '小时', '天', '个月', '年']
  for (let i = 0; i < entering.length && delta >= 0; i++) {
    delta /= entering[i]
    if (i === entering.length - 1) {
      return parseInt(delta) + unitNames[i] + '前'
    } else if (delta < entering[i + 1]) {
      return parseInt(delta) + unitNames[i] + '前'
    }
  }
  return format(time, 'yyyy-MM-dd hh:mm:ss')
}

function format(date, fmt) {
  if (!date) {
    return ""
  }
  if (typeof date === "number") {
    date = new Date(date)
  }
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  if (fmt === 'friendly') {
    return formatFriendly(date.getTime())
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

// console.log(formatFriendly(new Date("2016-05-01 08:13:09").getTime()))

export default format
