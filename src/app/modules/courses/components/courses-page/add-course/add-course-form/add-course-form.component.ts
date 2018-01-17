import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amp-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  duration = '';

  constructor() { }

  ngOnInit() {
  }

  onSave(): void {
    this.save.emit();
    console.log('Save!');
  }

  onCancel(): void {
    this.cancel.emit();
    console.log('Cancel!');
  }
}
