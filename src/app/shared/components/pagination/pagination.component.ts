import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  DEFAULT_PAGE_SIZE = 10;
  START_FROM = 1;

  currentPage = this.START_FROM;

  @Input() totalItems = 0;
  @Input() pageSize = this.DEFAULT_PAGE_SIZE;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalItems / this.pageSize;
    const pages: number[] = [];

    for (let i = this.START_FROM; i < totalPages + this.START_FROM; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }
}
