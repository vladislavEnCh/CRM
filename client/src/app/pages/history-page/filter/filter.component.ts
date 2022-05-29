import { MaterialSevice } from 'src/app/shared/services/material.sevice';
import { IFilter } from './../../../shared/interfaces/interface';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Output() onFilter: any = new EventEmitter();
  @ViewChild('start') startRef!: ElementRef;
  @ViewChild('end') endRef!: ElementRef;
  order!: number;
  start!: any;
  end!: any;
  isValid = true;
  constructor() {}

  ngOnInit(): void {}
  submitFIlter() {
    const filter: IFilter = {};

    if (this.order) {
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }
    this.onFilter.emit(filter);
  }
  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }
  ngAfterViewInit(): void {
    this.start = MaterialSevice.initDatePicker(
      this.startRef,
      this.validate.bind(this)
    );
    this.end = MaterialSevice.initDatePicker(
      this.endRef,
      this.validate.bind(this)
    );
  }
}
