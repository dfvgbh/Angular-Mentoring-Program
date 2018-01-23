import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input() totalItems;
  @Input() pageSize;
  @Input() currentPage;
  @Input() startFrom;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalItems / this.pageSize;
    const pages: number[] = [];

    for (let i = this.startFrom; i < totalPages + this.startFrom; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  toNextPage(): void {
    const totalPages = this.totalItems / this.pageSize;
    if (this.currentPage >= totalPages) {
      return;
    }
    this.onPageChange(this.currentPage + 1);
  }

  toPreviousPage(): void {
    if (this.currentPage <= this.startFrom) {
      return;
    }
    this.onPageChange(this.currentPage - 1);
  }
}
