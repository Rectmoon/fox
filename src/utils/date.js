import { getType } from './base'

export function isDate (o) {
  return getType(o) === 'date'
}

export function getYmd (o) {
  const a = []
  const d = isDate(o) ? o : new Date()
  const m = d.getMonth()
  const da = d.getDate()
  a.push(d.getFullYear())
  a.push(m.toString().length < 2 ? '0' + m : m)
  a.push(da.toString().length < 2 ? '0' + da : da)
  return a
}

export function getDate (y, m, d = 1) {
  return new Date(y, m, d)
}

export function formatDate (date = new Date(), fmt = 'yyyy-mm-dd hh:ii:ss') {
  const o = {
    'y+': date.getFullYear(), // 年
    'm+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'i+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季
    'l+': date.getMilliseconds() // 毫
  }
  for (const k in o) {
    if (new RegExp(`(${k})`, 'i').test(fmt)) {
      if (k === 'y+') { fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length)) } else if (k === 'l+') {
        let lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(
          RegExp.$1,
          ('00' + o[k]).substr(('' + o[k]).length - 1, lens)
        )
      } else {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
  }
  return fmt
}
