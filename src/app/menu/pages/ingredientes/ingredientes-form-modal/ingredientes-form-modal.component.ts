import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IIngredientes } from '../../../models';

@Component({
  selector: 'app-ingredientes-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './ingredientes-form-modal.component.html',
  styleUrl: './ingredientes-form-modal.component.css'
})
export class IngredientesFormModalComponent {

  @Input() isVisible: boolean = false;

  ingredientesForm: FormGroup

  @Input() action: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<IIngredientes>();


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.ingredientesForm = this.formBuilder.group({
      id: [null]
    })
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.ingredientesForm.valid) {
      this.save.emit(this.ingredientesForm.value);
      this.closeModal();
    }
  }
}
