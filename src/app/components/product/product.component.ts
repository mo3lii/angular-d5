import { ProductApiService } from './../../services/product-api.service';
import { ProductService } from './../../services/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: IProduct[];
  constructor(
    public ProdService: ProductService,
    public apiService: ProductApiService
  ) {
    this.products = [];
  }
  ngOnInit(): void {
    this.products = this.ProdService.getAll();
    this.apiService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {},
    });
  }
  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });

        this.apiService.remove(id).subscribe({
          next: () => {
            this.apiService.getAll().subscribe({
              next: (data) => {
                this.products = data;
              },
              error: () => {},
            });
          },
        });
      }
    });
  }
}
