import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preloader" *ngIf="isLoading">
      <div class="loader-content">
        <div class="logo-wrapper">
          <h1 class="loader-logo">RRK</h1>
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="progress"></div>
          </div>
        </div>
        <p class="loader-text">Initializing Creative Universe...</p>
      </div>
    </div>
  `,
  styles: [`
    .preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #050505;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    .loader-content {
      text-align: center;
    }
    .loader-logo {
      font-size: 4rem;
      font-weight: 700;
      background: linear-gradient(135deg, #00d2ff, #9d50bb);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 2rem;
      letter-spacing: 5px;
    }
    .progress-bar {
      width: 300px;
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
      margin: 0 auto;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #00d2ff, #9d50bb);
      transition: width 0.2s ease;
    }
    .loader-text {
      color: #a0a0a0;
      margin-top: 1rem;
      font-size: 0.9rem;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  `]
})
export class PreloaderComponent implements OnInit {
  isLoading = true;
  progress = 0;

  ngOnInit() {
    this.simulateLoading();
  }

  private simulateLoading() {
    const interval = setInterval(() => {
      this.progress += Math.random() * 15;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);
        setTimeout(() => this.finishLoading(), 500);
      }
    }, 150);
  }

  private finishLoading() {
    gsap.to('.preloader', {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        this.isLoading = false;
        // Broadcast completion if needed
      }
    });
  }
}
