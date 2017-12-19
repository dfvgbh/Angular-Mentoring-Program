import { Directive, ElementRef, Input, OnInit } from '@angular/core';

enum HighlightColor {
  Fresh = '#26ab5f',
  Upcoming = 'royalblue'
}

@Directive({
  selector: '[ampHighlightRecent]'
})
export class HighlightRecentDirective implements OnInit {
  @Input('ampHighlightRecent') addedDate: Date;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const now = new Date();
    const twoWeeks = 3600 * 1000 * 24 * 14;

    if (this.addedDate < now && this.addedDate >= new Date(+now - twoWeeks)) {
      this.highlight(HighlightColor.Fresh);
    } else if (this.addedDate > now) {
      this.highlight(HighlightColor.Upcoming);
    }
  }

  private highlight(color: string) {
    this.el.nativeElement.style.border = `2px solid ${color}`;
  }
}
