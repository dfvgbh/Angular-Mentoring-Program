import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { dateValidator } from './date.validator';
import { durationValidator } from './duration.validator';

@Component({
  selector: 'amp-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  courseForm: FormGroup;
  AUTHORS_URL = 'http://localhost:3000/authors';
  authorsList: string[] = [];

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
      .subscribe((data) => this.authorsList = <string[]> data);
  }

  isInputInvalid(name: string): boolean {
    return (this.courseForm.get(name).touched || this.courseForm.get(name).dirty)
      && this.courseForm.get(name).invalid;
  }

  hasInputError(name: string, error: string): boolean {
    return (this.courseForm.get(name).touched || this.courseForm.get(name).dirty)
      && this.courseForm.get(name).hasError(error);
  }

  private createForm() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)] ],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required, dateValidator]],
      duration: ['', [Validators.required, durationValidator]],
      authors: [['K. A. Applegate', 'Jeffrey Archer'], Validators.required]
    });
  }
}
