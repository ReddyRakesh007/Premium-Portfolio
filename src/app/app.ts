import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { EducationComponent } from './components/education/education';
import { ProjectsComponent } from './components/projects/projects';
import { SkillsComponent } from './components/skills/skills';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { ThreeBackgroundComponent } from './components/three-background/three-background';
import { CertificationsComponent } from './components/certifications/certifications';
import { ExperienceComponent } from './components/experience/experience';
import { AudioPlayerComponent } from './components/audio-player/audio-player';
import { GamesComponent } from './components/games/games';
import { PreloaderComponent } from './components/preloader/preloader';
import { StatsComponent } from './components/stats/stats';
import { ResumeViewComponent } from './components/resume-view/resume-view';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent, 
    HeroComponent, 
    EducationComponent, 
    ProjectsComponent, 
    SkillsComponent, 
    ContactComponent, 
    ExperienceComponent,
    FooterComponent,
    ThreeBackgroundComponent,
    CertificationsComponent,
    AudioPlayerComponent,
    GamesComponent,
    PreloaderComponent,
    StatsComponent,
    ResumeViewComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  @ViewChild('cursorDot') cursorDot!: ElementRef;
  @ViewChild('cursorOutline') cursorOutline!: ElementRef;

  ngAfterViewInit() {
    // Ensure cursors are visible initially
    gsap.set(this.cursorDot.nativeElement, { opacity: 1 });
    gsap.set(this.cursorOutline.nativeElement, { opacity: 1 });
    
    this.setupScrollReveal();
  }

  private setupScrollReveal() {
    // Reveal sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Reveal glass cards with a slight delay
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index % 3 * 0.1, // Stagger effect for cards in a row
        ease: 'power2.out'
      });
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.cursorDot && this.cursorOutline) {
      gsap.to(this.cursorDot.nativeElement, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.05,
        ease: 'power2.out'
      });
      gsap.to(this.cursorOutline.nativeElement, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.1,
        ease: 'power2.out'
      });
    }
  }

  @HostListener('window:mousedown')
  onMouseDown() {
    gsap.to(this.cursorOutline.nativeElement, { scale: 0.8, duration: 0.2 });
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    gsap.to(this.cursorOutline.nativeElement, { scale: 1, duration: 0.2 });
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    gsap.to([this.cursorDot.nativeElement, this.cursorOutline.nativeElement], { 
      opacity: 0, 
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  @HostListener('document:mouseenter')
  onMouseEnter() {
    gsap.to([this.cursorDot.nativeElement, this.cursorOutline.nativeElement], { 
      opacity: 1, 
      duration: 0.3,
      ease: 'power2.out'
    });
  }
}
