import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';

import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  imports: [],
  templateUrl: './model-delete.component.html',
  styleUrl: './model-delete.component.scss'
})
export class ModelDeleteComponent {
  activeModal = inject(NgbActiveModal);
}