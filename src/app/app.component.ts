import { Component, OnInit } from '@angular/core';
import { ReleaseClient, ReleaseDto } from 'interface';
import { ReleasetypeService } from './services/releasetype.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spotifyreleases';

  public items: ReleaseDto[];
  public filtered: ReleaseDto[];

  public filter: string;
  public order: string;
  public asc: string;
  public pageNumber: number;
  public isLoading: boolean;


  constructor(private client: ReleaseClient,
    public releaseTypeService: ReleasetypeService) {
  }

  async ngOnInit() {
    this.filter = "";
    this.asc = "asc";
    this.order = "";
    this.pageNumber = 0;    
    await this.LoadMoreAlbums();
   
  }

  async LoadMoreAlbums() {
    try{
      this.isLoading = true;
    const result = await this.client.getReleases(this.filter, this.order, this.pageNumber + 1 , 4, this.asc).toPromise();

    if (result.data){
      this.pageNumber = result.pageNumber;  
      if (this.items){
        this.items =  [...this.items, ...result.data];
      }else{
        this.items = [...result.data];
      }   
     
      this.filtered = this.items;
    }   

    console.log(result);
  }catch(e){
    console.error(e);
  }

  this.isLoading = false;
}
  


  onSelectorChange(e){
    this.filtered = e.value == 'all' ? this.items : this.items.filter(i => i.releaseType == e.value);
  }
}
