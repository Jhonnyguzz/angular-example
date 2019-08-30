import { Component, OnInit } from '@angular/core';
import { Image } from '../image'
import { IMAGES } from '../mock-images';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  url = "http://blogs.sugoi.com.pe/shigure/wp-content/uploads/2018/12/ELSA_02.jpg";
  images: Image[];
  selectedImage: Image;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getImages();
  }

  onSelect(image: Image): void {
    this.selectedImage = image;
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => this.images = images);
  }

}
