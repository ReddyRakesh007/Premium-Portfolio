import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Game {
  title: string;
  genre: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.html',
  styleUrl: './games.scss'
})
export class GamesComponent {
  games: Game[] = [
    {
      title: 'Neon Racer',
      genre: 'Arcade / Racing',
      description: 'A fast-paced synthwave racer where you dodge obstacles in a neon-lit cyber world.',
      image: 'images/games/neon-racer.jpg',
      link: '#',
      tags: ['Unity', 'C#', 'Post-Processing']
    },
    {
      title: 'Shadow Quest',
      genre: 'RPG / Platformer',
      description: 'Journey through the shadows in this dark-fantasy platformer with tactical combat.',
      image: 'images/games/shadow-quest.jpg',
      link: '#',
      tags: ['Unreal Engine', 'Blueprint', '3D Art']
    },
    {
      title: 'Cyber Strike',
      genre: 'Action / Shooter',
      description: 'Defend the mainframe against waves of malicious code in this isometric shooter.',
      image: 'images/games/cyber-strike.jpg',
      link: '#',
      tags: ['Godot', 'GDScript', 'SFX']
    }
  ];
}
