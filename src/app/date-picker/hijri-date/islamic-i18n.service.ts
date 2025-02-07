import { Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class IslamicI18n extends NgbDatepickerI18n{


  get WEEKDAYS(): string[] {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  }

  get MONTHS(): string[] {
    return ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
  }

  getMonthShortName(month: number): string {
    return this.MONTHS[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number): string {
    return this.WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

}
