import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resume-view-overlay" *ngIf="isOpen" (click)="close()">
      <div class="resume-modal glass-card" (click)="$event.stopPropagation()">
        <!-- PDF-Style Header -->
        <header class="pdf-header">
          <div class="header-left">
            <button class="icon-btn menu-btn"><i class="fas fa-bars"></i></button>
            <span class="file-name">Rakesh_Reddy_Resume.pdf</span>
          </div>
          <div class="header-center">
            <div class="page-controls">
              <span class="page-num">1</span> / <span class="total-pages">2</span>
            </div>
            <div class="zoom-controls">
              <button class="icon-btn"><i class="fas fa-minus"></i></button>
              <span class="zoom-level">100%</span>
              <button class="icon-btn"><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div class="header-right">
            <button class="icon-btn" (click)="printResume()"><i class="fas fa-print"></i></button>
            <button class="icon-btn" (click)="downloadResume()"><i class="fas fa-download"></i></button>
            <button class="icon-btn close-btn" (click)="close()">&times;</button>
          </div>
        </header>
        
        <div class="resume-content-scroll custom-scrollbar">
          <div class="resume-page">
            <header class="resume-header">
              <h1>Rakesh Reddy Karri</h1>
              <p class="contact">Palakollu, India | +91 7981275466 | jaitherider007@gmail.com</p>
              <div class="links">
                <a href="#">GitHub</a> | <a href="#">LinkedIn</a>
              </div>
            </header>

            <section class="resume-section">
              <h4>Summary</h4>
              <p>Dedicated Full Stack Developer specializing in Angular, Node.js, and Mobile App Development. Graduated May 2024 (B.Tech).</p>
            </section>

            <section class="resume-section">
              <h4>Experience</h4>
              <div class="exp-item">
                <h5>Full Stack Developer (Projects) <span>2023 - Present</span></h5>
                <ul>
                  <li>DreamFood Mobile App (Ionic/Angular)</li>
                  <li>YSRCP Cadre Management (Node.js/MySQL)</li>
                  <li>Catering & Mazic Minds Platforms</li>
                </ul>
              </div>
            </section>

            <section class="resume-section">
              <h4>Skills</h4>
              <div class="skills-grid">
                <div><strong>Frontend:</strong> Angular, React, TypeScript, GSAP</div>
                <div><strong>Backend:</strong> Node.js, Express, MySQL, MongoDB</div>
              </div>
            </section>

            <section class="resume-section">
              <h4>Education</h4>
              <p><strong>B.Tech in Computer Science</strong> (2020 - 2024)</p>
              <p><strong>Intermediate (MPC)</strong> - Sri Chaitanya Junior College, Palakollu (2018 - 2020)</p>
            </section>

            <div class="resume-footer">
              <button class="btn-primary" (click)="printResume()">Print to PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resume-view-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(10px);
      z-index: 10001;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    .resume-modal {
      width: 100%;
      max-width: 1000px;
      height: 95vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .pdf-header {
      background: #323639;
      color: white;
      padding: 0.5rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      z-index: 10;
      box-shadow: 0 2px 10px rgba(0,0,0,0.5);

      .header-left, .header-center, .header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .file-name {
        font-weight: 500;
        margin-left: 0.5rem;
      }

      .page-controls, .zoom-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255,255,255,0.1);
        padding: 4px 12px;
        border-radius: 4px;
      }

      .icon-btn {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 6px;
        border-radius: 50%;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;

        &:hover {
          background: rgba(255,255,255,0.1);
        }

        &.close-btn {
          font-size: 1.5rem;
          margin-left: 0.5rem;
        }
      }
    }
    .resume-content-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 3rem;
      background: rgba(255,255,255,0.02);
    }
    .resume-page {
      background: white;
      color: #333;
      padding: 40px;
      border-radius: 4px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      max-width: 800px;
      margin: 0 auto;
    }
    .resume-header {
      text-align: center;
      border-bottom: 2px solid #00d2ff;
      padding-bottom: 20px;
      margin-bottom: 25px;
      h1 { margin: 0; color: #222; font-size: 2.2rem; }
      .contact { color: #666; font-size: 0.9rem; margin: 10px 0; }
    }
    .resume-section {
      margin-bottom: 20px;
      h4 {
        color: #00d2ff;
        text-transform: uppercase;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        margin-bottom: 10px;
      }
      p, li { font-size: 0.95rem; line-height: 1.6; }
      .exp-item h5 {
        display: flex; justify-content: space-between;
        margin-bottom: 5px;
        span { color: #888; font-weight: normal; }
      }
    }
    .resume-footer {
      margin-top: 30px;
      text-align: center;
    }
    .btn-primary {
      padding: 10px 25px;
      background: #00d2ff;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .resume-view-overlay {
        padding: 0;
      }
      .resume-modal {
        height: 100vh;
        max-width: 100%;
        border-radius: 0;
      }
      .pdf-header {
        padding: 0.5rem;
        .header-center { display: none; }
        .file-name { display: none; }
      }
      .resume-content-scroll {
        padding: 1rem;
      }
      .resume-page {
        padding: 20px;
        box-shadow: none;
        h1 { font-size: 1.5rem; }
      }
      .resume-section h4 {
        font-size: 0.9rem;
      }
      .exp-item h5 {
        flex-direction: column;
        gap: 2px;
        span { font-size: 0.8rem; }
      }
    }
  `]
})
export class ResumeViewComponent {
  isOpen = false;

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/resume_ats.html';
    link.download = 'Rakesh_Reddy_Resume.html';
    link.click();
  }

  printResume() {
    const printContent = document.querySelector('.resume-page')?.innerHTML;
    if (printContent) {
      const win = window.open('', '', 'height=800,width=1000');
      win?.document.write('<html><head><title>Resume - Rakesh Reddy</title>');
      win?.document.write('<style>body{font-family:sans-serif;padding:40px;}.resume-header{text-align:center;border-bottom:2px solid #00d2ff;padding-bottom:20px;margin-bottom:25px;}h1{margin:0;color:#222;font-size:2.2rem;}.contact{color:#666;font-size:0.9rem;margin:10px 0;}.resume-section{margin-bottom:20px;}h4{color:#00d2ff;text-transform:uppercase;border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px;}p,li{font-size:0.95rem;line-height:1.6;}.exp-item h5{display:flex;justify-content:space-between;margin-bottom:5px;}span{color:#888;font-weight:normal;}.resume-footer{display:none;}</style>');
      win?.document.write('</head><body>');
      win?.document.write(printContent);
      win?.document.write('</body></html>');
      win?.document.close();
      win?.print();
    }
  }
}
