import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { Image } from './image'
import { IMAGES } from './mock-images';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  API_URL = "http://localhost:8000";
  private images: Array<Image> = [];

  constructor(private messageService: MessageService,
    private httpClient: HttpClient) { }

  /*getImages(): Observable<Image[]> {
    this.messageService.add('ImageService: Feteched images');
    return of(IMAGES);
  }*/

  /*getImage(id: number): Observable<Image> {
    this.messageService.add(`fetched image id=${id}`);
    return of(IMAGES.find(image => image.id === id));
  }*/

  getImages(): Observable<Image[]> {
    this.messageService.add('ImageService: fetched images'); 
    this.images = [];
    this.httpClient.get(`${this.API_URL}/gallery/`).subscribe((data:  Array<any>) => {
      data.forEach( dataItem => {
          let image1 = new Image();
          image1.id = dataItem.pk;
          image1.name = dataItem.fields.name;
          image1.url = dataItem.fields.url;
          image1.description = dataItem.fields.description;
          image1.imageFile = dataItem.fields.imageFile;
          this.images.push(image1);
          console.log(image1);
      });
    });
    return of(this.images);
  }

  getImage(id: number): Observable<Image> {
    this.messageService.add(`fetched image id=${id}`);
    return of(this.images.find(image => image.id === id));
  }
 

}
