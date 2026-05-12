import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  link: string;
  category: 'web' | 'mobile' | 'system' | 'all';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  currentFilter: 'all' | 'web' | 'mobile' | 'system' = 'all';
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      title: 'Smart Dashboard UI',
      description: 'A sophisticated data visualization dashboard built with modern frameworks.',
      image: 'images/project1.png',
      tags: ['Angular', 'SCSS', 'Chart.js'],
      link: '#',
      category: 'web',
      longDescription: 'This project involved creating a high-performance dashboard capable of rendering thousands of data points in real-time. It features custom chart components, drag-and-drop widgets, and a fully responsive layout for tablets and desktops.'
    },
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management.',
      image: 'images/project2.png',
      tags: ['Node.js', 'Express', 'MongoDB'],
      link: '#',
      category: 'web',
      longDescription: 'A complete end-to-end shopping experience featuring secure user authentication, a robust product catalog, shopping cart functionality, and integrated payment gateways. The admin panel allows for real-time order tracking and inventory updates.'
    },
    {
      title: 'DreamFood Mobile App',
      description: 'A modern food delivery and restaurant management application built with Ionic and Angular for cross-platform support.',
      image: 'images/project-dreamfood.png',
      tags: ['Ionic', 'Angular', 'Capacitor'],
      link: '#',
      category: 'mobile',
      longDescription: 'DreamFood leverages Ionic and Angular to deliver a seamless mobile experience on both iOS and Android. It includes features like real-time order tracking, secure payment processing, and a sophisticated restaurant discovery algorithm.'
    },
    {
      title: 'YSRCP Cadre Management',
      description: 'A robust backend and administration system for political cadre management, featuring real-time data tracking and member organization.',
      image: 'images/project-ysrcp.png',
      tags: ['Node.js', 'Express', 'MySQL'],
      link: '#',
      category: 'system',
      longDescription: 'Built to handle massive organizational data, this system provides tools for hierarchical member management, geofenced notification broadcasting, and detailed demographic reporting for political strategy planning.'
    },
    {
      title: 'Catering Services Platform',
      description: 'A comprehensive catering management system with a dynamic user interface for booking and menu selection.',
      image: 'images/project-catering.png',
      tags: ['Angular', 'SCSS', 'TypeScript'],
      link: '#',
      category: 'web',
      longDescription: 'This platform streamlines the catering booking process, allowing users to customize menus, select service levels, and manage event timelines through an intuitive, interactive interface.'
    },
    {
      title: 'Mazic Minds Website',
      description: 'A professional educational website featuring complex UI components and responsive design for an enhanced learning experience.',
      image: 'images/project-mazicminds.png',
      tags: ['Angular', 'GSAP', 'Responsive'],
      link: '#',
      category: 'web',
      longDescription: 'An education-focused web portal designed to make learning interactive. It uses GSAP for smooth storytelling transitions and features a comprehensive course management system with progress tracking.'
    }
  ];

  get filteredProjects() {
    if (this.currentFilter === 'all') return this.projects;
    return this.projects.filter(p => p.category === this.currentFilter);
  }

  setFilter(filter: 'all' | 'web' | 'mobile' | 'system') {
    this.currentFilter = filter;
    setTimeout(() => this.setupTiltEffect(), 100);
  }

  openModal(project: Project) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeModal() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  ngAfterViewInit() {
    this.setupTiltEffect();
  }

  private setupTiltEffect() {
    setTimeout(() => {
      this.projectCards.forEach((card) => {
        const el = card.nativeElement;
        const title = el.querySelector('h3');
        const tags = el.querySelector('.tags');
        const image = el.querySelector('img');

        el.addEventListener('mousemove', (e: MouseEvent) => {
          const { left, top, width, height } = el.getBoundingClientRect();
          const x = e.clientX - left;
          const y = e.clientY - top;
          const centerX = width / 2;
          const centerY = height / 2;
          const rotateX = (centerY - y) / 10;
          const rotateY = (x - centerX) / 10;

          // Main card tilt
          gsap.to(el, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000
          });

          // Parallax for inner elements
          if (title) gsap.to(title, { z: 50, duration: 0.5 });
          if (tags) gsap.to(tags, { z: 30, duration: 0.5 });
          if (image) gsap.to(image, { scale: 1.1, duration: 0.5 });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          });

          if (title) gsap.to(title, { z: 0, duration: 0.5 });
          if (tags) gsap.to(tags, { z: 0, duration: 0.5 });
          if (image) gsap.to(image, { scale: 1, duration: 0.5 });
        });
      });
    }, 200);
  }
}
