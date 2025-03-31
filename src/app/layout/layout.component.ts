import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isDesktop: boolean = true

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = !(event.target.innerWidth <= 960);
  }

  constructor() {
    if (typeof window !== "undefined") {
      this.isDesktop = !(window.innerWidth <= 960);
    }
  }
}