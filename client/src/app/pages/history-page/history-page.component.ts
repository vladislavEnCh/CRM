import { IOrder, IFilter } from './../../shared/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.services';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  offset = 0;
  limit = 3;
  orders: IOrder[] = [];
  loading = false;
  filter = {};
  constructor(private ordersServ: OrdersService) {}

  ngOnInit(): void {
    this.fetch();
  }
  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit,
    });
    this.ordersServ.fetch(params).subscribe((order: any) => {
      this.orders = this.orders.concat(order);
      this.loading = false;
    });
  }
  loadMore() {
    this.offset += this.limit;
    this.loading = true;
    this.fetch();
  }
  applyFilter(filter: IFilter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.fetch();
  }
}
