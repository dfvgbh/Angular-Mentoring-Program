import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'amp-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnChanges {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Input() formValue;

  AUTHORS_URL = 'http://localhost:3000/authors';
  courseForm: FormGroup;
  authorsList: string[] = [];

  constructor(private http: HttpClient,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.fetchAuthors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formValue !== undefined) {
      this.setForm(this.formValue);
    }
  }

  onSave(): void {
    this.save.emit(this.courseForm.value);
  }

  onCancel(): void {
    this.cancel.emit();
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
      name: ['', [Validators.required, Validators.maxLength(50)] ],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      addedDate: [null, [Validators.required]],
      duration: [0, [Validators.required]],
      authors: [[], Validators.required]
    });
  }

  private setForm(formValue) {
    this.courseForm.setValue({
      name: formValue.name,
      description: formValue.description,
      addedDate: formValue.addedDate,
      duration: formValue.duration,
      authors: formValue.authors
    });
    Object.keys(this.courseForm.controls)
      .forEach(key => {
        this.courseForm.get(key).markAsDirty();
      });
  }
}
