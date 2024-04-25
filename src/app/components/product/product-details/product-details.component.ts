import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../Models/iproduct';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../../services/product-api.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  prodId?: number;
  prod?: IProduct;
  constructor(
    public productService: ProductApiService,
    public route: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.prodId = this.activatedRoute.snapshot.params['id'];
    if (this.prodId) {
      this.productService.getById(this.prodId).subscribe({
        next: (product) => {
          this.prod = product;
        },
      });
    }
  }
}
