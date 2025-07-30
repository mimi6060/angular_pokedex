import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { PokemonService } from '../../services/pokemon';
import { MoveDetailResponse } from '../../models/pokemon';
import {getTypeColor} from '../../tools/getTypeColor';
import { StatEmojiPipe } from '../../pipes/stat-emoji.pipe';

@Component({
  selector: 'lib-move-detail',
  standalone: true,
  templateUrl: './move-detail.html',
  styleUrl: './move-detail.css',
  imports: [CommonModule, RouterModule, StatEmojiPipe]
})
export class MoveDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly pokemonService = inject(PokemonService);
  
  readonly moveDetail = this.pokemonService.moveDetail;
  readonly loading = this.pokemonService.moveDetailLoading;
  readonly error = this.pokemonService.moveDetailError;

  constructor() {
    this.route.params.subscribe(params => {
      const moveName = params['moveName'];
      if (moveName) {
         this.pokemonService.getMoveDetail(moveName);
      }
    });
    
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

  getTypeColors(type: string): string {
    return getTypeColor(type);
  }

}
