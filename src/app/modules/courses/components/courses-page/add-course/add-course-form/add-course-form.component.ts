import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { dateValidator } from './date.validator';
import { durationValidator } from './duration.validator';

@Component({
  selector: 'amp-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  addCourseForm: FormGroup;
  AUTHORS_URL = 'http://localhost:3000/authors';

  constructor(private http: HttpClient,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.fetchAuthors();
  }

  onSave(): void {
    this.save.emit();
    console.log('Save!');
  }

  onCancel(): void {
    this.cancel.emit();
    console.log('Cancel!');
  }

  fetchAuthors() {
    this.http.get(this.AUTHORS_URL)
      .subscribe((data) => console.log(data));
  }

  isInputInvalid(name: string): boolean {
    return (this.addCourseForm.get(name).touched || this.addCourseForm.get(name).dirty)
      && this.addCourseForm.get(name).invalid;
  }

  hasInputError(name: string, error: string): boolean {
    return (this.addCourseForm.get(name).touched || this.addCourseForm.get(name).dirty)
      && this.addCourseForm.get(name).hasError(error);
  }

  private createForm() {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)] ],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required, dateValidator]],
      duration: ['', [Validators.required, durationValidator]],
      authors: [['22', 'aa'], Validators.required]
    });
  }
}
