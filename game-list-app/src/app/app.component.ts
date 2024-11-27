import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from './game.service';  // Assuming you have a GameService for API calls

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newGame: any = { title: '', genre: '', release_year: '', image: '' };
  editGame: any = null;
  games: any[] = [];
  selectedFile: File | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getGames();  // Get the list of games on component load
  }

  // Get all games from the backend
  getGames() {
    this.gameService.getGames().subscribe(
      (games) => {
        this.games = games;  // Assign fetched games to games array
        console.log('Games loaded:', games);  // Debugging output
      },
      (error) => {
        console.error('Error loading games:', error);  // Log if there's an error
      }
    );
  }

  // Add a new game
  addGame(f: NgForm) {
    if (f.invalid) return;

    const formData = new FormData();
    formData.append('title', this.newGame.title);
    formData.append('genre', this.newGame.genre);
    formData.append('release_year', this.newGame.release_year);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.gameService.addGame(formData).subscribe(
      () => {
        this.getGames();  // Refresh the list after adding a game
        this.newGame = { title: '', genre: '', release_year: '', image: '' };  // Clear form
      },
      (error) => {
        console.error('Error adding game:', error);  // Log any errors while adding a game
      }
    );
  }

  // Update an existing game
  updateGame() {
    const formData = new FormData();
    formData.append('id', this.editGame.id);
    formData.append('title', this.editGame.title);
    formData.append('genre', this.editGame.genre);
    formData.append('release_year', this.editGame.release_year);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.gameService.updateGame(formData).subscribe(
      () => {
        this.getGames();  // Refresh the list after updating
        this.editGame = null;  // Reset form
      },
      (error) => {
        console.error('Error updating game:', error);  // Log any errors while updating
      }
    );
  }

  // File upload handler
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Set the game to edit mode
  selectGameForEdit(game: any) {
    this.editGame = { ...game };  // Pre-fill the form with the game's current values
  }

  // Cancel editing
  cancelEdit() {
    this.editGame = null;
  }

  // Delete a game
  deleteGame(id: number) {
    this.gameService.deleteGame(id).subscribe(
      () => {
        this.getGames();  // Refresh the list after deleting
      },
      (error) => {
        console.error('Error deleting game:', error);  // Log any errors while deleting
      }
    );
  }
}
