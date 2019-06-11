import { Component, OnInit } from '@angular/core';
import { CharacterService } from './../../services/character.service';
import { Character, Characters } from '../models/character';
import { Profile } from '../models/profile';
import { MovieDetail } from './../models/movieDetails';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
  
})
export class CharacterComponent implements OnInit {

  public characters: Array<Character>;
  public profile: Profile;
  public movieUrl: Array<string>;
  public movieNames: Array<MovieDetail>;
  public showMovie: Boolean;
  errorResponse: any;
  errorMessage: string;
  showError: boolean;
  selectedCharacter: Character;

  constructor(private _charService: CharacterService) {
    this.movieNames = [];
    this.showMovie = false;
    this.movieUrl = [];
    this.showError = false;
   }
//service is getting data from API/json file
  ngOnInit() {
    this._charService.getCharacters().subscribe((res: Characters) => {
        this.characters = res.characters;
    });
  }  

  getMovies(char: Character) {
    this.movieNames = [];
    this.selectedCharacter = char;
    this._charService.getMovies(char).subscribe((res: Profile)=> {
      this.showMovie = true;
      this.showError = false;
      this.profile = res;
      this.movieUrl = this.profile.films;
      this.getMovieNames();
    }, error => {
      this.errorMessage = error.error.detail;
      this.showError = true;
    });
  }
  

  getMovieNames() {
    for(let i = 0; i < this.movieUrl.length; i++) {
      this._charService.getMovieName(this.movieUrl[i]).subscribe((res: MovieDetail)=> {
        this.movieNames.push(res);
      }, error => {
        this.errorMessage = error.error.detail;
        this.showError = true;
      });
    }
  }

}
