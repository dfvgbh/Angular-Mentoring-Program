import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CourseItem } from '../../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'amp-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() courseItem: CourseItem;
  @Output() removeItem = new EventEmitter<CourseItem>();

  constructor(private router: Router) { }

  onRemoveItem(courseItem: CourseItem) {
    this.removeItem.emit(courseItem);
  }

  navigateToCourse(course) {
    this.router.navigate(['/courses', course.id]);
  }
}
