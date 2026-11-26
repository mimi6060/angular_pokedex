import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

interface MoveDetailResponse {
  id: number;
  name: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  priority: number;
  damage_class: {
    name: string;
    url: string;
  };
  type: {
    name: string;
    url: string;
  };
  effect_entries: Array<{
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
  generation: {
    name: string;
    url: string;
  };
  target: {
    name: string;
    url: string;
  };
}

@Component({
  selector: 'lib-move-detail',
  standalone: true,
  templateUrl: './move-detail.html',
  styleUrl: './move-detail.css',
  imports: [CommonModule, RouterModule]
})
export class MoveDetail {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  
  readonly moveDetail = signal<MoveDetailResponse | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const moveName = params['moveName'];
      if (moveName) {
        this.loadMoveDetail(moveName);
      }
    });
  }

  private async loadMoveDetail(moveName: string) {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await this.http.get<MoveDetailResponse>(
        `https://pokeapi.co/api/v2/move/${moveName}`
      ).toPromise();
      
      this.moveDetail.set(response || null);
    } catch (err) {
      this.error.set('Failed to load move details');
      console.error('Error loading move:', err);
    } finally {
      this.loading.set(false);
    }
  }

  getEnglishEffect(): string {
    const move = this.moveDetail();
    if (!move?.effect_entries) return '';
    
    const englishEntry = move.effect_entries.find(
      entry => entry.language.name === 'en'
    );
    return englishEntry?.effect || '';
  }

  getEnglishFlavorText(): string {
    const move = this.moveDetail();
    if (!move?.flavor_text_entries) return '';
    
    const englishEntry = move.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    return englishEntry?.flavor_text || '';
  }

  goBack() {
    this.location.back();
  }

  formatMoveName(name: string): string {
    return name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC'
    };
    return typeColors[type] || '#68A090';
  }

  getDamageClassIcon(damageClass: string): string {
    switch (damageClass) {
      case 'physical': return '⚔️';
      case 'special': return '✨';
      case 'status': return '🔄';
      default: return '❓';
    }
  }
}
