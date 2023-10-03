import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {OrderService} from "../../shared/services/order.service";
import {TitleService} from "../../shared/services/title.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  formVisible = true; // видимость формы
  errorMessageVisible = false; // видимость сообщения об ошибке
  isSubmitting = false; // кнопка
  private subscriptionOrder: Subscription | null = null;


  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я-]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я-]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я-]+$')]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(6)]],
    product: { value: '', disabled: true },
    address: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я0-9\\s\\-\\/]+$')]],
    comment: [''],
  })

  constructor(private titleService: TitleService,
              private fb: FormBuilder,
              private orderService: OrderService) {
  }

  ngOnInit() {
    if (this.titleService.product) {
      this.checkoutForm.get('product')?.setValue(this.titleService.product);
    }
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder() {
    this.isSubmitting = true;

    this.subscriptionOrder =  this.orderService.createOrder({
      name: this.checkoutForm.get('name')?.value || '',
      last_name: this.checkoutForm.get('last_name')?.value || '',
      phone: this.checkoutForm.get('phone')?.value || '',
      country: this.checkoutForm.get('country')?.value || '',
      zip: this.checkoutForm.get('zip')?.value || '',
      product: this.checkoutForm.get('product')?.value || '',
      address: this.checkoutForm.get('address')?.value || '',
      comment: this.checkoutForm.get('comment')?.value || '',
    })
      .pipe(
        tap(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success && !response.message) {
            this.formVisible = false;
            this.errorMessageVisible = false;
          } else {
            this.errorMessageVisible = true;
            setTimeout(() => {
              this.errorMessageVisible = false;
            }, 3000);
          }
        }
      });
  }
}
