import { MaterialSevice } from 'src/app/shared/services/material.sevice';
import { ICategories } from './../../shared/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import { CategiriesService } from 'src/app/shared/services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categiries-page',
  templateUrl: './categiries-page.component.html',
  styleUrls: ['./categiries-page.component.scss'],
})
export class CategiriesPageComponent implements OnInit {
  categorys$!: Observable<ICategories[]>;
  constructor(private categoryServise: CategiriesService) {}

  ngOnInit(): void {
    MaterialSevice.updateText();
    this.categorys$ = this.categoryServise.fetchCategories();
  }
  updateInput() {}
}
