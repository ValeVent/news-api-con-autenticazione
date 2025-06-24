import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewsResponse } from '../../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'https://newsapi.org/v2/everything';
  private apiKey = 'd837f48ed2fe4fe094706057da58575c';

  constructor(private http: HttpClient) {}

  // Serve per recuperare le notizie relative a una parola chiave specifica (keyword), filtrate per la data fissa e ordinate per popolarità
  getNewsByKeyword(keyword: string): Observable<INewsResponse> {
    // const fromDate = '2024-12-01'; // imposto una data fissa per il filtro delle notizie (l'API non permette di farlo gratuitamente, per cui lo commento)
    const today = new Date().toISOString().split('T')[0]; // restituisce la data in formato ISO YYYY-MM-DD e split estrae solo la parte della data

    const params = new HttpParams() // costruisce un oggetto HttpParams con i parametri della richiesta GET
      .set('q', keyword)
      // .set('from', fromDate)
      // .set('to', today)
      .set('sortBy', 'popularity')
      .set('apiKey', this.apiKey)
      // .set('language', 'it'); // imposto la lingua italiana. Non lo faccio perchè le testate italiane ti costringono ad abbonarti per poterle leggere, quindi non ha senso farlo in questo esempio

    return this.http.get<INewsResponse>(this.apiUrl, { params }); // Fa una richiesta HTTP GET all’apiUrl (es. https://newsapi.org/v2/everything) passando i parametri.
  }
}
