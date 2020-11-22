import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import * as data from '../assets/data/example.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spotifyreleases';

  public items: any[];
  public filtered: any[];

  constructor(private client: HttpClient) {
  }

  async ngOnInit() {
    this.items = data.albums.items;
    this.filtered = this.items;
    console.log(this.items);
  }


  onSelectorChange(e){
    this.filtered = e.value == 'all' ? this.items : this.items.filter(i => i.album_type == e.value);
  }
}
