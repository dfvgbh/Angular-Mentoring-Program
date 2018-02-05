import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'amp-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();


  AUTHORS_URL = 'http://localhost:3000/authors';

  duration = '';

  constructor(private http: HttpClient) { }

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
      .subscribe((data) =>  console.log(data));
  }
}
