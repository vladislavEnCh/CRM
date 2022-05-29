import { IOrder } from './../../../shared/interfaces/interface';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MaterialSevice } from 'src/app/shared/services/material.sevice';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  @Input() orders!: IOrder[];
  @ViewChild('modal') modalRef!: ElementRef;
  modal: any;
  selectedOrder!: IOrder;
  constructor() {}

  ngOnInit(): void {}
  computePrice(order: IOrder): number {
    return order.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }
  selectOrder(order: IOrder) {
    this.selectedOrder = order;
    this.modal.open();
  }
  ngAfterViewInit(): void {
    this.modal = MaterialSevice.initModal(this.modalRef);
  }
  closeModal() {
    this.modal.close();
  }
}
