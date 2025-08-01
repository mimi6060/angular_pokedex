import { Routes } from '@angular/router';
import { MoveDetail, PokemonList } from 'pokemon';
import { PokemonDetail } from 'pokemon';

export const routes: Routes = [
    { path: '', component: PokemonList},
    { path: 'pokemons', component: PokemonList },
    { path: 'pokemons/:offset', component: PokemonList },
    { path: 'details/:name', component: PokemonDetail },
    { path: 'details/:name/:offset', component: PokemonDetail },
    { path: 'move/:moveName', component: MoveDetail },
    { path: '**', redirectTo: 'pokemons' }
];






