import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VarianteType } from './toast.type';

interface Toast {
  id: number;
  message: string;
  type: VarianteType;
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private counter = 0;

  showToast(message: string, type: VarianteType, duration = 4000) {
    const toast: Toast = { id: this.counter++, message, type };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);
    setTimeout(() => this.dismissToast(toast.id), duration);
  }

  dismissToast(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }
}
