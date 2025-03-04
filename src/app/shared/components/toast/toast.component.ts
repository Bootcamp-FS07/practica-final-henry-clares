import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast/toast.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toastService = inject(ToastService);

  toasts$ = this.toastService.toasts$;

  closeToast(id: number) {
    this.toastService.dismissToast(id);
  }
}
