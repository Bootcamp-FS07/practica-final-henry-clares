import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Output() okAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  closeModal() {
    this.cancelAction.emit();
  }

  confirmAction() {
    this.okAction.emit();
  }
}
