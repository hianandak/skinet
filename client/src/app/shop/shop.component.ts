import { ShopParams } from './../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) SearchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  ShopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price:High To Low', value: 'priceDesc' },
  ];

  constructor(private ShopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.ShopService.getProducts(this.ShopParams).subscribe(
      (response) => {
        this.products = response.data;
        this.ShopParams.pageNumber = response.pageIndex;
        this.ShopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.ShopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.ShopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.ShopParams.brandId = brandId;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.ShopParams.typeId = typeId;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.ShopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if(this.ShopParams.pageNumber!== event)
    {
      this.ShopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.ShopParams.search = this.SearchTerm.nativeElement.value;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.SearchTerm.nativeElement.value = '';
    this.ShopParams = new ShopParams();
    this.getProducts();
  }
}
