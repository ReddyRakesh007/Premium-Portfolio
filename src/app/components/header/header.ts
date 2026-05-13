import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements AfterViewInit {
  activeSection = 'hero';
  isMenuOpen = false;
  isDarkTheme = true;
  lastScrollTop = 0;
  isHeaderHidden = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  ngAfterViewInit() {
    this.initTheme();
    this.setupCursorEffects();
    this.onScroll(); // Initial check
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark if no theme is saved or if explicitly set to dark
    if (savedTheme === 'light') {
      this.isDarkTheme = false;
      document.documentElement.classList.add('light-theme');
    } else {
      this.isDarkTheme = true;
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }

  private setupCursorEffects() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const outline = document.querySelector('.cursor-outline');

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(outline, {
          scale: 2,
          backgroundColor: 'rgba(0, 242, 254, 0.1)',
          duration: 0.3
        });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(outline, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.3
        });
      });
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header visibility logic
    if (st > this.lastScrollTop && st > 100) {
      this.isHeaderHidden = true; // Scrolling down
    } else {
      this.isHeaderHidden = false; // Scrolling up
    }
    this.lastScrollTop = st <= 0 ? 0 : st;

    const sections = ['hero', 'education', 'certifications', 'experience', 'projects', 'games', 'skills', 'contact'];
    let current = 'hero';

    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section;
        }
      }
    }
    this.activeSection = current;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
}
