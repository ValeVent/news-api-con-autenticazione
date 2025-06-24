import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { NewsTableComponent } from '../../components/news-table/news-table.component';

interface SearchForm {
  keyword: FormControl<string>;
}
@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [ReactiveFormsModule, NewsTableComponent],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css',
})
export class NewsPageComponent {
  searchForm: FormGroup<SearchForm> = new FormGroup({
    keyword: new FormControl<string>('', { nonNullable: true }),
  });
  
  articles: any[] = [];
  noResults = false;

  constructor(private newsService: NewsService) {}

  onSearch(): void {
    const { keyword } = this.searchForm.getRawValue(); //restituisce tutti i valori del form come oggetto. Con destructuring estrae solo il valore del campo keyword
    const trimmedKeyword = keyword.trim(); // rimuove eventuali spazi all’inizio e alla fine del testo

    if (!trimmedKeyword) {
      console.warn('Inserisci una parola chiave valida.');
      return;
    }

    this.newsService.getNewsByKeyword(trimmedKeyword).subscribe((res) => {
      this.articles = res.articles;

      if (res.totalResults === 0) {
        console.warn('Nessun articolo trovato');
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    });
  }

}
