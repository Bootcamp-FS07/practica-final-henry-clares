import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet, ToastComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
