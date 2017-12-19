import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amp-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  @Output() searchItem = new EventEmitter<string>();

  searchQuery = 'Search';

  constructor() { }

  ngOnInit() {
  }

  onSearchItem(searchQuery: string) {
    this.searchItem.emit(searchQuery);
  }
}
