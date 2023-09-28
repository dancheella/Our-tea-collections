import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  searchForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  onSearch() {
    const query = this.searchForm.get('query')?.value;
    this.router.navigate(['/catalog'], { queryParams: { search: query } });
  }

  resetSearch() {
    if (this.router.url === '/catalog' || this.router.url.startsWith('/catalog?')) {
      this.searchForm.get('query')?.setValue('');
      this.router.navigate(['/catalog']);
    }
  }
}
