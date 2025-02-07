import { Component } from '@angular/core';
import { DatePickerComponent } from './date-picker/date-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ DatePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hijri-gregorian-datepicker';
  date;
  currentDate:string;
  maxDate:string;
  minDate:string;

  onDatePicked(e){
    this.date = e;
  }
}
