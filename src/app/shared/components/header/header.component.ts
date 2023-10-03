import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})

export class HeaderComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  isCatalogPage: boolean = false;
  private subscriptionRoute: Subscription | null = null;

  constructor(private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  ngOnInit() {
    this.subscriptionRoute = this.router.events
      .subscribe(() => {
        this.isCatalogPage = this.router.url === '/catalog' || this.router.url.startsWith('/catalog?');
      });
  }

  ngOnDestroy() {
    this.subscriptionRoute?.unsubscribe();
  }

  onSearch() {
    const query = this.searchForm.get('query')?.value;
    if (this.router.url === '/catalog') {
      this.router.navigate(['/catalog'], {queryParams: {search: query}});
    }
  }

  resetSearch() {
    if (this.router.url === '/catalog' || this.router.url.startsWith('/catalog?')) {
      this.searchForm.get('query')?.setValue('');
      this.router.navigate(['/catalog']);
    }
  }
}
