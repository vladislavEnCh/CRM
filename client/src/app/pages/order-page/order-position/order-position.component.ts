import { MaterialSevice } from 'src/app/shared/services/material.sevice';
import { IPosition } from './../../../shared/interfaces/interface';
import { OrderService } from './../order.service';
import { Observable, switchMap } from 'rxjs';
import { PositionService } from './../../../shared/services/position.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-position',
  templateUrl: './order-position.component.html',
  styleUrls: ['./order-position.component.scss'],
})
export class OrderPositionComponent implements OnInit {
  positions$!: Observable<any>;

  constructor(
    private rout: ActivatedRoute,
    private positioServ: PositionService,
    private orderServ: OrderService
  ) {}

  ngOnInit(): void {
    this.positions$ = this.rout.params.pipe(
      switchMap((params: Params) => {
        return this.positioServ.fetch(params['id']);
      })
    );
  }
  addToOrder(position: IPosition) {
    MaterialSevice.toast(`Добавлено х ${position.quantity}`);
    this.orderServ.add(position);
  }
}
