import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {


  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

    ngOnDestroy(): void {
    document.body.style.overflow = '';
  }


}
