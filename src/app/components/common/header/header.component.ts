import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  searchForm: FormGroup;

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  onSearch() {
    const query = this.searchForm.get('query')?.value;
    this.router.navigate(['/catalog'], { queryParams: { search: query } });
  }

  resetSearch() {
    this.searchForm.get('query')?.setValue('');
    this.router.navigate(['/catalog']);
  }
}
