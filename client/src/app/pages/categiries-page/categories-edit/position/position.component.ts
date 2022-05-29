import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialSevice } from 'src/app/shared/services/material.sevice';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId!: any;
  @ViewChild('modal') modalRef!: ElementRef;
  positions: any = [];
  loading = false;
  modal: any;
  modalForm!: FormGroup;
  positionId = null;

  constructor(private positionServ: PositionService) {}

  ngOnInit(): void {
    this.modalForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
    this.loading = true;
    this.positionServ.fetch(this.categoryId).subscribe((position) => {
      this.positions = position;
      this.loading = false;
    });
  }
  ngOnDestroy() {
    this.modal.destroy();
  }
  ngAfterViewInit(): void {
    this.modal = MaterialSevice.initModal(this.modalRef);
  }
  selectPosition(position: any) {
    this.positionId = position._id;
    this.modalForm.patchValue({
      name: position.name,
      cost: position.cost,
    });
    this.modal.open();
    MaterialSevice.updateText();
  }
  onAddPosition() {
    this.positionId = null;
    this.modalForm.reset();
    this.modal.open();
  }
  onCancel() {
    this.modal.close();
  }
  onDeletePosition(event: Event, position: any) {
    event.stopPropagation();
    this.positionServ.delete(position).subscribe(
      (response: any) => {
        const idx = this.positions.findIndex(
          (pos: any) => pos._id == position._id
        );
        this.positions.splice(idx, 1);
        MaterialSevice.toast(response.message);
      },
      (error) => MaterialSevice.toast(error.error.message)
    );
  }
  saveData() {
    const posit: any = {
      name: this.modalForm.value.name,
      cost: this.modalForm.value.cost,
      category: this.categoryId,
    };
    if (this.positionId) {
      posit._id = this.positionId;
      this.positionServ.udate(posit).subscribe(
        (position: any) => {
          const idx = this.positions.findIndex(
            (pos: any) => pos._id == position._id
          );
          this.positions[idx] = position;
          MaterialSevice.toast('Сохранено');
        },
        (error) => {
          this.modalForm.enable();
          MaterialSevice.toast(error.error.message);
        },
        () => {
          this.modal.close();
          this.modalForm.enable();
          this.modalForm.reset();
        }
      );
    } else {
      this.positionServ.create(posit).subscribe(
        (position) => {
          MaterialSevice.toast('позиция создана');
          this.positions.push(position);
        },
        (error) => {
          this.modalForm.enable();
          MaterialSevice.toast(error.error.message);
        },
        () => {
          this.modal.close();
          this.modalForm.enable();
          this.modalForm.reset();
        }
      );
    }
  }
}
