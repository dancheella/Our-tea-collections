import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription, timer} from "rxjs";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('popup') popup!: TemplateRef<any>;
  private timerSubscription: Subscription | null = null;

  constructor(private router: Router, private modalService: NgbModal) { }

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

  }

  ngAfterViewInit() {
    this.timerSubscription = timer(10000).subscribe(() => {
      if (!this.hasUserLeft()) {
        this.modalService.open(this.popup, { centered: true });
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
    this.modalService.dismissAll();
    this.router.navigate(['/catalog']);
  }
}
