import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hcl-divide-numbers';
  calculaterForm!: FormGroup;
  answer!: number | null;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.divideNumbers();
  }

  divideNumbers() {
    let dividend = this.calculaterForm.controls['input1'];
    let divisor = this.calculaterForm.controls['input2'];
    this.calculaterForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.answer = null;
        if (dividend.valid && divisor.valid) {
          this.answer = dividend.value / divisor.value;
        }
      });
  }
  initForm(): void {
    this.calculaterForm = this.fb.group({
      input1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      input2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
}
