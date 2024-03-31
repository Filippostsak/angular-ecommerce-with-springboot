import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.productService
      .getProductList()
      .pipe(
        catchError((error) => {
          console.error('Error fetching products:', error);
          return throwError(() => new Error('Error fetching products'));
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }
}
