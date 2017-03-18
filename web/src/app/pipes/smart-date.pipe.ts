import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = new Date(value);
    let now = new Date();
    let delta = now.getTime() - value.getTime();
    let absDelta = Math.abs(delta);
    if (absDelta < 60000) {
      return delta < 0 ? "马上" : "刚刚";
    }
    let prefix = null;
    let suffix = delta < 0 ? "后" : "前";
    if (absDelta < 3600000) {
      prefix = Math.trunc(absDelta / 60000) + '分钟';
    } else if (absDelta < 12 * 3600000) {
      prefix = Math.trunc(absDelta / 3600000) + '小时';
    } else {
      return value.getFullYear() + "年" + SmartDatePipe.addZeroIfNeed(value.getMonth() + 1) + "月" + SmartDatePipe.addZeroIfNeed(value.getDate()) + "日";
    }
    return prefix + suffix;
  }

  private static addZeroIfNeed(value: number): string {
    return value < 10 ? '0' + value : value + '';
  }
}
