import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { CourseItem } from '../models';

@Component({
  selector: 'amp-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {
  // implements OnChanges, OnInit, DoCheck, AfterContentInit,
  //                                           AfterContentChecked, AfterViewInit,
  //                                           AfterViewChecked, OnDestroy
  @Input() courseItem: CourseItem;
  @Output() removeItem = new EventEmitter<CourseItem>();

  constructor() { }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.warn('ON CHANGES');
  //   console.log(changes);
  // }
  //
  // ngOnInit() {
  //   console.warn('ON INIT');
  // }
  //
  // ngDoCheck() {
  //   console.warn('DO CHECK');
  // }
  //
  // ngAfterContentInit() {
  //   console.warn('AFTER CONTENT INIT');
  // }
  //
  // ngAfterContentChecked() {
  //   console.warn('AFTER CONTENT CHECKED');
  // }
  //
  // ngAfterViewInit() {
  //   console.warn('AFTER VIEW INIT');
  // }
  //
  // ngAfterViewChecked() {
  //   console.warn('AFTER VIEW CHECKED');
  // }
  //
  // ngOnDestroy() {
  //   console.warn('ON DESTROY');
  // }

  onRemoveItem(courseItem: CourseItem) {
    this.removeItem.emit(courseItem);
  }
}
