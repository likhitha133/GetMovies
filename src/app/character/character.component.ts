import { Component, OnInit } from '@angular/core';
import { CharacterService } from './../../services/character.service';
import { Character, Characters } from '../models/character';
import { Profile } from '../models/profile';
import { MovieDetail } from './../models/movieDetails';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']

})
export class CharacterComponent implements OnInit {

  characters: Array<Character>;
  profile: Profile;
  movieUrl: string[] = [];
  movieNames = [];
  showMovie = false;
  errorResponse: any;
  errorMessage: string;
  showError = false;
  selectedCharacter: Character;
  


  constructor(private _charService: CharacterService) {
    
  }

  ngOnInit() {
    this._charService.getCharacters().subscribe((res: Characters) => {
      this.characters = res.characters;
    });
  }


  getMovies(char: Character) {
    this.movieNames = []; 
    this.selectedCharacter = char;
    this._charService.getMovies(char)
      .subscribe((res: Profile) => {
        this.showMovie = true;
        this.showError = false;
        this.profile = res; 
        this.movieUrl = this.profile.films; 
        this.getMovieNames();
      },
        error => this.errorHandling(error.error.detail)
      );
  }


  // for(let i = 0; i < this.movieUrl.length; i++) {
  //   this._charService.getMovieName(this.movieUrl[i]).subscribe((res: MovieDetail)=> {
  //     this.movieNames.push(res);
  //   }, error => {
  //     this.errorMessage = error.error.detail;
  //     this.showError = true;
  //   });
  // }




  getMovieNames() {
    this.movieUrl.map(movie =>
      this._charService.getMovieName(movie)
        .subscribe(
          detail => this.movieNames.push(detail),
          error => this.errorHandling(error.error.detail)
        )
    )
  };

  errorHandling(message: string) {
    this.errorMessage = message;
    this.showError = true;
  }

}
