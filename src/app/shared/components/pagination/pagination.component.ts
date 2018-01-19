import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input() totalItems = 0;
  pageSize = 10;

  constructor() { }

  ngOnInit() {
  }

  getPages(): number[] {
    const totalPages = this.totalItems / this.pageSize;
    const pages: number[] = [];

    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

}
