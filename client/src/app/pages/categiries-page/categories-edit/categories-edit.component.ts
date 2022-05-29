import { ICategories } from './../../../shared/interfaces/interface';
import { MaterialSevice } from 'src/app/shared/services/material.sevice';
import { CategiriesService } from './../../../shared/services/categories.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  @ViewChild('input') inputRef!: ElementRef;
  isNew: boolean = true;
  image!: File;
  forms!: FormGroup;
  imagePreview: any;
  category!: ICategories;

  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private categoryServ: CategiriesService
  ) {}

  ngOnInit(): void {
    MaterialSevice.updateText();
    this.forms = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
    this.forms.disable();
    this.rout.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoryServ.getById(params['id']);
          }

          return of(null);
        })
      )
      .subscribe(
        (category) => {
          if (category) {
            this.category = category;
            this.forms.patchValue({
              name: category.name,
            });
            this.imagePreview = category.imageSrc;
          }
          this.forms.enable();
        },
        (error) => {
          MaterialSevice.toast(error.error.message);
        }
      );
  }
  saveChange() {
    let obs$;
    this.forms.disable();
    if (this.isNew) {
      obs$ = this.categoryServ.create(this.forms.value.name, this.image);
    } else {
      obs$ = this.categoryServ.update(
        this.category._id,
        this.forms.value.name,
        this.image
      );
    }
    obs$.subscribe(
      (category) => {
        this.forms.enable();
        MaterialSevice.toast('Сохранено');
      },
      (error) => {
        this.forms.enable();
        MaterialSevice.toast(error);
      }
    );
  }
  trigerClick() {
    this.inputRef.nativeElement.click();
  }
  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  deleteCategory() {
    const decision = window.confirm(
      `вы уверены, что хотите удалить категорию ${this.category.name}?`
    );
    if (decision) {
      this.categoryServ.delete(this.category._id).subscribe(
        (respons) => {
          MaterialSevice.toast('Готово!');
        },
        (error) => MaterialSevice.toast(error),
        () => this.router.navigate(['/categories'])
      );
    }
  }
}
