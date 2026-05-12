import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-section">
      <div class="stats-grid">
        <div #statItem class="stat-card glass-card" *ngFor="let stat of stats">
          <div class="stat-value" [attr.data-target]="stat.value">0</div>
          <div class="stat-suffix">{{ stat.suffix }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      padding: 60px 10%;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }
    .stat-card {
      text-align: center;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .stat-value {
      font-size: 3.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #00d2ff, #9d50bb);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }
    .stat-suffix {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--accent-cyan);
      margin-top: -5px;
      margin-bottom: 10px;
    }
    .stat-label {
      font-size: 0.9rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    @media (max-width: 768px) {
      .stats-section { padding: 40px 5%; }
      .stat-value { font-size: 2.5rem; }
    }
  `]
})
export class StatsComponent implements AfterViewInit {
  @ViewChildren('statItem') statItems!: QueryList<ElementRef>;

  stats = [
    { label: 'Major Projects', value: 12, suffix: '+' },
    { label: 'Tech Stack', value: 25, suffix: '+' },
    { label: 'LeetCode / DSA', value: 150, suffix: '+' },
    { label: 'Client Smiles', value: 100, suffix: '%' }
  ];

  ngAfterViewInit() {
    this.statItems.forEach((item, index) => {
      const valueEl = item.nativeElement.querySelector('.stat-value');
      const target = parseInt(valueEl.getAttribute('data-target'));

      gsap.from(item.nativeElement, {
        scrollTrigger: {
          trigger: item.nativeElement,
          start: 'top 90%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        onComplete: () => this.animateValue(valueEl, target)
      });
    });
  }

  private animateValue(el: HTMLElement, target: number) {
    let current = 0;
    const duration = 2000;
    const start = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toString();
      }
    };

    requestAnimationFrame(update);
  }
}
