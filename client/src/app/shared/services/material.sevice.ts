import { ElementRef, Injectable } from '@angular/core';

declare var M: any;
@Injectable({
  providedIn: 'root',
})
export class MaterialSevice {
  static toast(mess: string) {
    M.toast({ html: mess });
  }
  static updateText() {
    M.updateTextFields();
  }
  static initModal(ref: ElementRef) {
    return M.Modal.init(ref.nativeElement);
  }
  static initToolTip(ref: ElementRef) {
    return M.toolTip.init(ref.nativeElement);
  }
  static initDatePicker(ref: ElementRef, onClose: any) {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
    });
  }
}
