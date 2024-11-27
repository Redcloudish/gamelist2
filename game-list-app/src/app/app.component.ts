import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Game {
  id: number;
  title: string;
  genre: string;
  release_year: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  games: Game[] = [];
  newGame: Game = { id: 0, title: '', genre: '', release_year: 0 };
  editGame: Game | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames(): void {
    this.http.get<Game[]>('http://localhost/api/games.php').subscribe({
      next: (data) => (this.games = data),
      error: (err) => console.error('Error fetching games:', err),
    });
  }

  addGame(): void {
    this.http.post('http://localhost/api/games.php', this.newGame).subscribe({
      next: () => {
        this.fetchGames();
        this.newGame = { id: 0, title: '', genre: '', release_year: 0 };
      },
      error: (err) => console.error('Error adding game:', err),
    });
  }

  deleteGame(id: number): void {
    this.http
      .request('DELETE', 'http://localhost/api/games.php', { body: { id } })
      .subscribe({
        next: () => this.fetchGames(),
        error: (err) => console.error('Error deleting game:', err),
      });
  }

  selectGameForEdit(game: Game): void {
    this.editGame = { ...game };
  }

  updateGame(): void {
    if (this.editGame) {
      this.http.put('http://localhost/api/games.php', this.editGame).subscribe({
        next: () => {
          this.fetchGames();
          this.editGame = null;
        },
        error: (err) => console.error('Error updating game:', err),
      });
    }
  }

  cancelEdit(): void {
    this.editGame = null;
  }
}
