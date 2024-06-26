// src/app/components/product-add/product-add.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class ProductAddComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.productService.addProduct(productData).subscribe(() => {
        console.log('Product added successfully');
        // Geçici bir route'a gidip tekrar geri dön
        this.router.navigate(['/products'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['']);
        });
      });
    }
  }
}

