import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements AfterViewInit {
  @Input() resumeModal: any;
  @ViewChild('heroName') heroName!: ElementRef;
  @ViewChild('heroTagline') heroTagline!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;

  openResume(event: Event) {
    event.preventDefault();
    if (this.resumeModal) {
      this.resumeModal.open();
    }
  }

  ngAfterViewInit() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    // Initial state
    gsap.set(this.heroName.nativeElement, { opacity: 0, y: 100, skewY: 7 });
    gsap.set(this.heroTagline.nativeElement, { opacity: 0, y: 50 });
    gsap.set(this.heroImage.nativeElement, { scale: 0.8, opacity: 0, rotateY: -30 });

    tl.to(this.heroName.nativeElement, { opacity: 1, y: 0, skewY: 0, delay: 0.5 })
      .to(this.heroTagline.nativeElement, { opacity: 1, y: 0 }, "-=1")
      .to(this.heroImage.nativeElement, { opacity: 1, scale: 1, rotateY: 0 }, "-=1.2");

    // Float animation for image
    gsap.to(this.heroImage.nativeElement, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}
