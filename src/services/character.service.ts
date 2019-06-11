import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Character} from './../app/models/character'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private _http: HttpClient) { }

  public getCharacters() {
      return this._http.get('./../assets/character.json');
  }
  public getMovies(char: Character) {
    return this._http.get(char.url);
  }
  public getMovieName(url: string) {
    return this._http.get(url);
  }
}
