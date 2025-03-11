import { Component, OnInit } from '@angular/core';

declare var grapesjs: any;

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  ngOnInit() {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '100vh',
      width: 'auto',
      storageManager: false,
      plugins: ['gjs-preset-webpage'],
    });
  }
}
