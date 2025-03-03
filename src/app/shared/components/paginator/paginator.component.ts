import { Component, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-paginator',
  imports: [NgIcon],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  totalItems = input<number>(0);
  itemsPerPage = input<number>(10);
  pageChange = output<number>();

  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  onPageSelect(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
