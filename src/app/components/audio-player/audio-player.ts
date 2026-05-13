import { Component, ViewChild, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Track {
  name: string;
  artist: string;
  url: string;
}

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss'
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  
  isPlaying = false;
  wasPlayingBeforeHidden = false;
  bottomOffset = 32;
  currentTrackIndex = 0;
  showPlaylist = false;

  playlist: Track[] = [
    {
      name: 'Forest Ambience',
      artist: 'Nature Sounds',
      url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3'
    },
    {
      name: 'Upbeat Summer',
      artist: 'Pop Energy',
      url: 'https://cdn.pixabay.com/audio/2022/10/14/audio_3d1838d72a.mp3'
    },
    {
      name: 'Classical Strings',
      artist: 'Orchestra',
      url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_51d2f7f382.mp3'
    },
    {
      name: 'Midnight Jazz',
      artist: 'Smooth Vibes',
      url: 'https://cdn.pixabay.com/audio/2022/01/21/audio_3174298a0c.mp3'
    },
    {
      name: 'Piano Meditation',
      artist: 'Peaceful Mind',
      url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808f30730.mp3'
    },
    {
      name: 'Acoustic Joy',
      artist: 'Pleasant Days',
      url: 'https://cdn.pixabay.com/audio/2023/06/11/audio_5027581977.mp3'
    }
  ];

  get currentTrack(): Track {
    return this.playlist[this.currentTrackIndex];
  }

  ngOnInit() {
    this.checkScroll();
  }

  ngAfterViewInit() {
    // Attempt to autoplay after a delay
    setTimeout(() => {
      this.playAudio();
    }, 2000);

    // Listen for the first user interaction to trigger playback if blocked
    const firstInteractionHandler = () => {
      if (!this.isPlaying) {
        this.playAudio();
      }
      document.removeEventListener('click', firstInteractionHandler);
      document.removeEventListener('keydown', firstInteractionHandler);
      document.removeEventListener('touchstart', firstInteractionHandler);
    };

    document.addEventListener('click', firstInteractionHandler);
    document.addEventListener('keydown', firstInteractionHandler);
    document.addEventListener('touchstart', firstInteractionHandler);

    // Listen for track end
    this.audioPlayer.nativeElement.onended = () => {
      this.nextTrack();
    };
  }

  private playAudio() {
    const audio = this.audioPlayer.nativeElement;
    audio.play().then(() => {
      this.isPlaying = true;
    }).catch(() => {
      console.log('Autoplay blocked');
    });
  }

  togglePlaylist() {
    this.showPlaylist = !this.showPlaylist;
  }

  selectTrack(index: number) {
    this.currentTrackIndex = index;
    this.loadAndPlay();
    this.showPlaylist = false;
  }

  togglePlay() {
    const audio = this.audioPlayer.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.loadAndPlay();
  }

  previousTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadAndPlay();
  }

  private loadAndPlay() {
    const audio = this.audioPlayer.nativeElement;
    audio.src = this.currentTrack.url;
    audio.load();
    audio.play().then(() => {
      this.isPlaying = true;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  @HostListener('document:visibilitychange', [])
  onVisibilityChange() {
    const audio = this.audioPlayer.nativeElement;
    if (document.hidden) {
      if (this.isPlaying) {
        this.wasPlayingBeforeHidden = true;
        audio.pause();
        this.isPlaying = false;
      }
    } else {
      if (this.wasPlayingBeforeHidden) {
        audio.play().then(() => {
          this.isPlaying = true;
          this.wasPlayingBeforeHidden = false;
        }).catch(() => {
          this.isPlaying = false;
        });
      }
    }
  }

  private checkScroll() {
    const isMobile = window.innerWidth <= 768;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.documentElement.scrollHeight;
    const footer = document.querySelector('app-footer');
    const footerHeight = footer ? (footer as HTMLElement).offsetHeight : 0;
    
    const distanceFromBottom = bodyHeight - (scrollPosition + windowHeight);
    
    if (distanceFromBottom < footerHeight) {
      this.bottomOffset = (footerHeight - distanceFromBottom) + (isMobile ? 10 : 20);
    } else {
      this.bottomOffset = isMobile ? 20 : 32;
    }
  }
}
