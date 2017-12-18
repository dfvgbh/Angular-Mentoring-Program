import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'amp-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  searchQuery = 'Search';

  constructor() { }

  ngOnInit() {
  }

  find() {
    console.log(`FIND: ${this.searchQuery}`);
  }
}
