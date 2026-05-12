import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent implements AfterViewInit {
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.timelineItems.forEach((item, index) => {
      gsap.from(item.nativeElement, {
        scrollTrigger: {
          trigger: item.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }
}
