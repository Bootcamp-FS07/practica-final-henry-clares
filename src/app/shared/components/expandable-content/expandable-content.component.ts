import { Component, input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-expandable-content',
  imports: [],
  templateUrl: './expandable-content.component.html',
  styleUrl: './expandable-content.component.css',
})
export class ExpandableContentComponent implements OnChanges {
  content = input('');
  maxLength = input(100);

  isExpanded = false;
  truncatedText = '';
  fullText = '';

  ngOnChanges() {
    this.updateText();
  }

  private updateText() {
    if (this.content().length > this.maxLength()) {
      this.truncatedText = this.content().slice(0, this.maxLength()) + '...';
      this.fullText = this.content();
    } else {
      this.truncatedText = this.content();
      this.fullText = '';
    }
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }
}
