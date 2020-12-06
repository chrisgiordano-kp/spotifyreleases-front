import { Injectable } from '@angular/core';
import { AlbumType } from 'interface'

@Injectable({
  providedIn: 'root'
})
export class ReleasetypeService {

  constructor() {
   }

   getType(value: number){
      return AlbumType[value];
   }
}
