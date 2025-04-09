import { Component, OnInit } from '@angular/core';
import { IngredientesHttpService } from '../../services';
import { IIngredientes } from '../../models';
import { CommonModule } from '@angular/common';
import { IngredientesFormModalComponent } from './ingredientes-form-modal/ingredientes-form-modal.component';

@Component({
  selector: 'app-ingredientes',
  imports: [CommonModule, IngredientesFormModalComponent],
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.css'
})
export class IngredientesComponent implements OnInit {

  ingredientesListTotal: IIngredientes[] = [];
  ingredientesList: IIngredientes[] = [];

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  isModalVisible = false;
  currentIngrediente?: IIngredientes;

  constructor(
    private ingredientesHttpService: IngredientesHttpService
  ) {

  }

  ngOnInit(): void {
    this.getIngredientes()
  }

  getIngredientes() {
    this.ingredientesHttpService.getAll().subscribe({
      next: (response) => {
  
        this.ingredientesListTotal = response
        this.updatePagination()
      }
    });
  }

  updatePagination() {
    this.totalItems = this.ingredientesListTotal.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    const isExactMultiple = this.totalItems % this.pageSize === 0;

    if (isExactMultiple && this.currentPage > this.totalPages) {
      this.setPage(this.currentPage - 1);
    } else {
      this.setPage(this.currentPage);
    }

  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.ingredientesList = this.ingredientesListTotal.slice(startIndex, endIndex);
  }

  get fromIndex() {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get toIndex() {
    const max = this.currentPage * this.pageSize;
    return max > this.totalItems ? this.totalItems : max;
  }

  get pagesArray() {
    return Array.from({ length: this.totalPages });
  }

  openModalForm(item?: IIngredientes) {
    console.log(item)
    this.currentIngrediente = item;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  saveIngredientes(ingredient: IIngredientes) {
    this.ingredientesHttpService.save(ingredient).subscribe({
      next: (response) => {
        console.log(response)
        this.getIngredientes();
      }
    });
  }

  deleteIngrediente(id: number) {

    this.ingredientesHttpService.delete(id).subscribe({
      next: () => {
        this.getIngredientes()
      }
    });
  }

}
