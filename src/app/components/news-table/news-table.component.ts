import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CleanContentPipe } from "../../pipes/cleanContent.pipe";

@Component({
  selector: 'app-news-table',
  standalone: true,
  imports: [CommonModule, CleanContentPipe],
  templateUrl: './news-table.component.html',
  styleUrl: './news-table.component.css'
})
export class NewsTableComponent {

  @Input() articles: any[] = [];

  get sortedArticles(): any[] {   // getter: metodo che sembra una proprietà, ma esegue del codice ogni volta che viene "letto"
    return this.articles.slice().sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }

}

