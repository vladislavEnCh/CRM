import { OrdersService } from './../../shared/services/orders.services';
import { IOrder, IOrderPosition } from './../../shared/interfaces/interface';
import { OrderService } from './order.service';
import { MaterialSevice } from 'src/app/shared/services/material.sevice';
import { NavigationEnd, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isRoot!: boolean;
  @ViewChild('modal') modalRef!: ElementRef;
  modal!: any;
  loading: boolean = false;
  constructor(
    private rout: Router,
    public order: OrderService,
    private ordersServ: OrdersService
  ) {}

  ngOnInit(): void {
    this.isRoot = this.rout.url == '/order';
    this.rout.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.rout.url == '/order';
      }
    });
  }
  ngAfterViewInit(): void {
    this.modal = MaterialSevice.initModal(this.modalRef);
  }
  ngOnDestroy(): void {
    this.modal.destroy();
  }
  open() {
    this.modal.open();
  }
  cancel() {
    this.modal.close();
  }
  submit() {
    this.loading = true;
    this.modal.close();
    const order: IOrder = {
      list: this.order.list.map((item) => {
        delete item._id;
        return item;
      }),
    };
    this.ordersServ.create(order).subscribe(
      (orders) => {
        MaterialSevice.toast('заказ был добавлен');
        this.order.clear();
      },
      (error) => {
        MaterialSevice.toast(error.error.message);
      },
      () => {
        this.modal.close();
        this.loading = false;
      }
    );
  }
  removePosition(item: IOrderPosition) {
    this.order.remove(item);
  }
}
