import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/iproduct';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../../services/product-api.service';

@Component({
  selector: 'app-productd-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './productd-edit.component.html',
  styleUrl: './productd-edit.component.css',
})
export class ProductdEditComponent implements OnInit {
  prod: any;
  prodId: any = 0;

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    price: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(9999),
    ]),
    quantity: new FormControl(null, [
      Validators.required,
      Validators.min(6),
      Validators.max(9999),
    ]),
  });
  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ProductApiService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.prodId = params['id'];
        this.name.setValue('');
        this.price.setValue(null);
        this.quantity.setValue(null);
      },
    });
    if (this.prodId != 0) {
      this.apiService.getById(this.prodId).subscribe({
        next: (p) => {
          this.prod = p;
          this.name.setValue(this.prod.name);
          this.price.setValue(this.prod.price);
          this.quantity.setValue(this.prod.quantity);
        },
      });
    }
  }
  get name() {
    return this.productForm.controls['name'];
  }
  get price() {
    return this.productForm.controls['price'];
  }
  get quantity() {
    return this.productForm.controls['quantity'];
  }
  prodOperation() {
    if (this.productForm.valid) {
      if (this.prodId == 0) {
        this.apiService.add(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
        });
      } else {
        this.apiService.update(this.prodId, this.productForm.value).subscribe({
          next: () => this.router.navigate(['/products']),
        });
      }
    }
  }
}
