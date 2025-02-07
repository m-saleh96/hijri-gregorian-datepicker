import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbCalendarIslamicCivil, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { toGregorian } from 'hijri-converter';
import { IslamicI18n } from './islamic-i18n.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hijri-date',
  templateUrl: './hijri-date.component.html',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
  ],
})
export class HijriDateComponent implements OnInit{
  @Input() showDatePicker:boolean = false;
  @Input() hijriCurrentDate:any;
  @Input() minDateHijri:NgbDateStruct;
  @Input() maxDateHijri:NgbDateStruct;
  @Input() max!:string;
  @Output() dateSelected = new EventEmitter<{}>();
  model2!: NgbDateStruct;

  ngOnInit(): void {
    this.model2 = this.hijriCurrentDate;
  }

  onModelChange() {
    const gregorianDate = toGregorian(this.model2.year , this.model2.month , this.model2.day);
    let date = {
      value : `${this.model2.year}-${this.model2.month}-${this.model2.day}`,
      gregorian : `${gregorianDate.gy}-${gregorianDate.gm}-${gregorianDate.gd}`,
    }
    this.dateSelected.emit(date);
    this.showDatePicker = false;

  }
}
