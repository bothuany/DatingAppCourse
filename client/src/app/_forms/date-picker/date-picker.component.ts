import { LowerCasePipe, NgIf } from '@angular/common';
import {
  Component,
  input,
  OnChanges,
  OnInit,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [BsDatepickerModule, NgIf, ReactiveFormsModule, LowerCasePipe],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  label = input<string>('');
  theme = input<string>('default');
  maxDate = input<Date>();
  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.updateDatePickerConfig();
  }
  ngOnInit(): void {
    this.updateDatePickerConfig();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme']) {
      this.updateDatePickerConfig();
    }
  }

  private updateDatePickerConfig(): void {
    this.bsConfig = {
      containerClass: `theme-${this.theme()}`,
      dateInputFormat: 'DD MM YYYY',
    };
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  getArticle(): string {
    if (!this.label) return 'a';
    const firstLetter = this.label().trim()[0].toLowerCase();
    return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a';
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
