import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren('skillItem') skillItems!: QueryList<ElementRef>;
  @ViewChildren('progressBar') progressBars!: QueryList<ElementRef>;

  skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'React', level: 75 },
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'Python', level: 70 },
        { name: 'SQL / MongoDB', level: 85 }
      ]
    },
    {
      name: 'Other Tools',
      skills: [
        { name: 'Git / GitHub', level: 90 },
        { name: 'Docker', level: 65 },
        { name: 'Ionic / Mobile', level: 80 },
        { name: 'Postman', level: 85 }
      ]
    }
  ];

  ngAfterViewInit() {
    this.animateSkills();
  }

  private animateSkills() {
    this.skillItems.forEach((item, index) => {
      gsap.from(item.nativeElement, {
        scrollTrigger: {
          trigger: item.nativeElement,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: (index % 5) * 0.1,
        ease: 'power2.out'
      });
    });

    this.progressBars.forEach((bar) => {
      const level = bar.nativeElement.getAttribute('data-level');
      gsap.fromTo(bar.nativeElement, 
        { width: '0%' },
        {
          scrollTrigger: {
            trigger: bar.nativeElement,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          },
          width: level + '%',
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.2
        }
      );
    });
  }
}
