import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { toHijri } from 'hijri-converter';
import { HijriDateComponent } from './hijri-date/hijri-date.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule, HijriDateComponent],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnChanges{
  documentClickListener: () => void;
  @Input() currentDate:any;
  @Input() minDate:string;
  @Input() maxDate:string;
  @Input() isHigri:boolean = true;
  @Output() dateSelected = new EventEmitter<{}>();
  showDatePicker:boolean = false;
  hijriCurrentDate:any;
  model: NgbDateStruct;
  minGregorianDate: NgbDateStruct;
  minDateHijri: NgbDateStruct;
  maxGregorianDate: NgbDateStruct;
  maxDateHijri: NgbDateStruct;
  date:any = {};
  changePosition:boolean=false;

  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    this.model = null;
    this.minGregorianDate = null;
    this.maxGregorianDate = null;
    this.minDateHijri = null;
    this.maxDateHijri = null;
    this.date = {};
    this.showDatePicker = false;
    this.hijriCurrentDate = null;
    if (this.currentDate) {
      let currentDate = this.formatDate(this.currentDate);
      const [year, month, day] = currentDate.split('-').map(Number);
      this.model = {year,month,day};
      let hijriCurrentDate= toHijri(this.model.year, this.model.month , this.model.day);
      this.hijriCurrentDate = {year:hijriCurrentDate.hy, month:hijriCurrentDate.hm, day:hijriCurrentDate.hd};
      this.date = {
        value : `${this.hijriCurrentDate.year}-${this.hijriCurrentDate.month}-${this.hijriCurrentDate.day}`,
        gregorian : `${this.model.year}-${this.model.month}-${this.model.day}`,
        hijri: `${this.hijriCurrentDate.year}-${this.hijriCurrentDate.month}-${this.hijriCurrentDate.day}`
      }
      if (this.isHigri) {
        this.date['value'] = `${this.hijriCurrentDate.year}-${this.hijriCurrentDate.month}-${this.hijriCurrentDate.day}`;
      } else {
        this.date['value'] = `${this.model.year}-${this.model.month}-${this.model.day}`;
      }
      this.dateSelected.emit(this.date);
    }
    if (this.minDate) {
      const [year, month, day] = this.minDate.split('-').map(Number);
      this.minGregorianDate = {year,month,day};
      let minDateHijri= toHijri(this.minGregorianDate.year, this.minGregorianDate.month , this.minGregorianDate.day);
      this.minDateHijri = {year:minDateHijri.hy, month:minDateHijri.hm, day:minDateHijri.hd};
    } else {
      this.minGregorianDate = {year:1950,month:1,day:1};
      let minDateHijri= toHijri(this.minGregorianDate.year, this.minGregorianDate.month , this.minGregorianDate.day);
      this.minDateHijri = {year:minDateHijri.hy, month:minDateHijri.hm, day:minDateHijri.hd};
    }
    if (this.maxDate) {
      const [year, month, day] = this.maxDate.split('-').map(Number);
      this.maxGregorianDate = {year,month,day};
      let maxDateHijri= toHijri(this.maxGregorianDate.year, this.maxGregorianDate.month , this.maxGregorianDate.day);
      this.maxDateHijri = {year:maxDateHijri.hy, month:maxDateHijri.hm, day:maxDateHijri.hd};
    } else {
      this.maxGregorianDate = {year:2100,month:1,day:1};
      let maxDateHijri= toHijri(this.maxGregorianDate.year, this.maxGregorianDate.month , this.maxGregorianDate.day);
      this.maxDateHijri = {year:maxDateHijri.hy, month:maxDateHijri.hm, day:maxDateHijri.hd};
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onModelChange() {
    this.date = {
      value : `${this.model.year}-${this.model.month}-${this.model.day}`,
      gregorian : `${this.model.year}-${this.model.month}-${this.model.day}`,
    }
    let hijriCurrentDate= toHijri(this.model.year, this.model.month , this.model.day);
    this.hijriCurrentDate = {year:hijriCurrentDate.hy, month:hijriCurrentDate.hm, day:hijriCurrentDate.hd};
    this.date.hijri = `${this.hijriCurrentDate.year}-${this.hijriCurrentDate.month}-${this.hijriCurrentDate.day}`;
    this.dateSelected.emit(this.date);
    this.showDatePicker = false;
  }

  toggleDateType(){
    this.isHigri = !this.isHigri;
    if (this.isHigri && this.model) {
      this.date['value'] = `${this.hijriCurrentDate.year}-${this.hijriCurrentDate.month}-${this.hijriCurrentDate.day}`
    } else if (!this.isHigri && this.model){
      this.date['value'] = `${this.model.year}-${this.model.month}-${this.model.day}`
    }
  }

  onDatePicked(date:any){
    this.showDatePicker = false;
    const [year, month, day] = date.gregorian.split('-').map(Number);
    const [hyear, hmonth, hday] = date.value.split('-').map(Number);
    this.model = {year,month,day};
    this.hijriCurrentDate = {year:hyear,month:hmonth,day:hday};
    this.date = date;
    this.date.hijri = date.value;
    this.dateSelected.emit(this.date);
    this.showDatePicker = false;
  }

  toggleBtn(btn: HTMLButtonElement, event: Event) {
    event.stopPropagation();
    this.showDatePicker = !this.showDatePicker;
    if (this.showDatePicker) {
      btn.focus();
      this.blurBtn(btn);
    } else {
      btn.blur();
    }
  }


  blurBtn(btn: HTMLButtonElement) {
    if (!this.showDatePicker) {
      return;
    }
    btn.focus();
    if (this.documentClickListener) {
      this.documentClickListener();
    }
    this.documentClickListener = this.renderer.listen('document', 'click', (event: any) => {
      if (!event.target.closest('.date-container') && event.target !== btn) {
        this.showDatePicker = false;
        btn.blur();
        this.documentClickListener();
        this.documentClickListener = null;
      }
    });
  }

}
