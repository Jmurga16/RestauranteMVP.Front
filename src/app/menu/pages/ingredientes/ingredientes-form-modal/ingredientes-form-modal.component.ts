import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IIngredientes } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredientes-form-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredientes-form-modal.component.html',
  styleUrl: './ingredientes-form-modal.component.css'
})
export class IngredientesFormModalComponent implements OnInit, OnChanges {

  titleModal: string = "Nuevo Ingrediente"

  ingredientesForm: FormGroup

  @Input() isVisible: boolean = false;
  @Input() currentIngrediente?: IIngredientes;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<IIngredientes>();


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.ingredientesForm = this.initForm();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      ingredienteId: [null],
      nombre: [null, Validators.required],
      unidadMedida: [null, Validators.required],
      cantidadDisponible: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.currentIngrediente) {
      this.titleModal = "Editar Ingrediente"
      this.ingredientesForm.patchValue(this.currentIngrediente)
    }
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.ingredientesForm.valid) {
      this.save.emit(this.ingredientesForm.value);
      this.ingredientesForm.reset()
      this.closeModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentIngrediente']) {
      if (this.currentIngrediente) {
        this.titleModal = 'Editar Ingrediente';
        this.ingredientesForm.patchValue(this.currentIngrediente);
      }
      else {
        this.titleModal = 'Nuevo Ingrediente';
        this.ingredientesForm.reset();
      }
    }
  }

}
