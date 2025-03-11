import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import grapesjs from 'grapesjs';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'timeengine-spa';

  ngOnInit(): void {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '100%',
      width: 'auto',
    });
  }
}
