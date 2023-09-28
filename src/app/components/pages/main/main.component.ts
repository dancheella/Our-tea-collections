import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription, timer} from "rxjs";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit, OnDestroy {
  private timerSubscription: Subscription | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    $('.slider').slick({
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      draggable: true
    });

    $('#accordion').accordion({
      heightStyle: 'content',
      collapsible: true
    });

    this.timerSubscription = timer(10000).subscribe(() => {
      if (!this.hasUserLeft()) {
        $('#popupModal').modal('show');
      }
    });
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }

  private hasUserLeft() {
    return false;
  }

  redirectToCatalog() {
    $('#popupModal').modal('hide');
    this.router.navigate(['/catalog']);
  }
}
