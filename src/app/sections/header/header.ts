import { Component, HostListener, signal } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly profile = PROFILE;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { label: 'À propos', anchor: 'about' },
    { label: 'Compétences', anchor: 'skills' },
    { label: 'Projets', anchor: 'projects' },
    { label: 'Contact', anchor: 'contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
