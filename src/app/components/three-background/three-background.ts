import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-background',
  standalone: true,
  template: '<canvas #canvas class="three-canvas"></canvas>',
  styles: [`
    .three-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
      transition: opacity 0.5s ease;
    }
    :host-context(.light-theme) .three-canvas {
      opacity: 0;
      visibility: hidden;
    }
  `]
})
export class ThreeBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private starGeo!: THREE.BufferGeometry;
  private stars!: THREE.Points;
  private floatingShapes: THREE.Mesh[] = [];
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;

  ngOnInit() {
    this.initThree();
    this.animate();
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d')!;
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 60;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Add Ambient Light for shapes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d2ff, 2);
    pointLight.position.set(20, 20, 20);
    this.scene.add(pointLight);

    // Particle System
    this.starGeo = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const color = new THREE.Color();
      if (Math.random() > 0.3) {
        color.setRGB(1.0, 0.3 + Math.random() * 0.3, 0.1);
      } else {
        color.setRGB(1.0, 0.8 + Math.random() * 0.2, 0.1);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    this.starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      size: 0.8,
      map: this.createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      opacity: 0.9,
      sizeAttenuation: true
    });

    this.stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(this.stars);

    // Add Floating 3D Shapes
    this.createFloatingShapes();
  }

  private createFloatingShapes() {
    const geometries = [
      new THREE.IcosahedronGeometry(2, 0),
      new THREE.TorusGeometry(3, 0.5, 16, 100),
      new THREE.TorusKnotGeometry(2, 0.4, 64, 8)
    ];

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
      side: THREE.DoubleSide
    });

    for (let i = 0; i < 8; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geo, material.clone());
      
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 40
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Unique color per shape
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.5);
      (mesh.material as THREE.MeshPhongMaterial).color = color;

      this.floatingShapes.push(mesh);
      this.scene.add(mesh);
    }
  }

  private onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX - window.innerWidth / 2) / 100;
    this.mouseY = (event.clientY - window.innerHeight / 2) / 100;
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    const positions = this.starGeo.attributes['position'].array as Float32Array;
    
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3 + 1] += 0.3;
      positions[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.03;
      
      if (positions[i * 3 + 1] > 60) {
        positions[i * 3 + 1] = -60;
        positions[i * 3] = (Math.random() - 0.5) * 120;
      }
    }
    
    this.starGeo.attributes['position'].needsUpdate = true;

    // Animate Floating Shapes
    this.floatingShapes.forEach((mesh, i) => {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;
      mesh.position.y += Math.sin(Date.now() * 0.001 + i) * 0.02;
    });
    
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }
}
