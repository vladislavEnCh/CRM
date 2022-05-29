import { Observable } from 'rxjs';
import { CategiriesService } from 'src/app/shared/services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-category',
  templateUrl: './order-category.component.html',
  styleUrls: ['./order-category.component.scss'],
})
export class OrderCategoryComponent implements OnInit {
  categries$!: Observable<any>;

  constructor(private catroryServ: CategiriesService) {}

  ngOnInit(): void {
    this.categries$ = this.catroryServ.fetchCategories();
  }
}
