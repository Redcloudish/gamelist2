import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://localhost/api/games';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all games from the backend
  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new game to the backend
  addGame(gameData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, gameData);
  }

  // Update an existing game
  updateGame(gameData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, gameData);
  }

  // Delete a game
  deleteGame(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
