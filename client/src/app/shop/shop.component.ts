import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
products:IProduct[];

  constructor(private ShopService : ShopService) { }

  ngOnInit(): void {
    this.ShopService.getProducts().subscribe( response => {
      this.products = response.data;
    },error =>{
      console.log(error);
    });
  }
}