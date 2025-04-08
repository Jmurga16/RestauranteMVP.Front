import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  CategoriaHttpService,
  MenuHttpService,
  PlatoHttpService,
} from '../../services';
import { IPlato2 } from '../../models/plato2Interface';
import { ICategoria2 } from '../../models/categoria2.interface';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
@Component({
  selector: 'app-plato',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './plato.component.html',
  styleUrl: './plato.component.css',
})
export class PlatoComponent {
  // Removed redundant declaration of selectedCategory
  showChildMenu: boolean = false;

  constructor(
    private platoHttpService: PlatoHttpService,
    private categoriaHttpService: CategoriaHttpService
  ) {}

  menuItems: IPlato2[] = [];
  filteredItems: IPlato2[] = [];
  categories: ICategoria2[] = [];

  searchControl = new FormControl('');
  selectedCategory = new FormControl('');
  minPriceControl = new FormControl('');
  maxPriceControl = new FormControl('');

  ngOnInit(): void {
    this.getPlatos();
    this.getCategories();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilters());

    // Set up other filters
    this.selectedCategory.valueChanges.subscribe(() => this.applyFilters());
    this.minPriceControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.applyFilters());
    this.maxPriceControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.applyFilters());
  }

  getPlatos() {
    this.platoHttpService.getAll().subscribe({
      next: (response: any) => {
        if (response) {
          this.menuItems = response;
          this.filteredItems = this.menuItems;
        }
      },
    });
  }
  getCategories() {
    this.categoriaHttpService.getAll().subscribe({
      next: (response: any) => {
        if (response) {
          this.categories = response;
          console.log(this.categories);
        }
      },
    });
  }
  applyFilters(): void {
    let result = this.menuItems;
    console.log(result);

    // Filter by search term
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.nombre.toLowerCase().includes(searchTerm) ||
          item.descripcion.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    const category = this.selectedCategory.value;
    console.log(category);

    if (category) {
      result = result.filter((item) => item.categoriaId === Number(category));
    }

    // Filter by min price
    const minPrice = this.minPriceControl.value;
    if (minPrice !== null && minPrice !== '') {
      result = result.filter((item) => item.precio >= Number(minPrice));
    }

    // Filter by max price
    const maxPrice = this.maxPriceControl.value;
    if (maxPrice !== null && maxPrice !== '') {
      result = result.filter((item) => item.precio <= Number(maxPrice));
    }

    this.filteredItems = result;
  }

  resetFilters(): void {
    this.searchControl.setValue('');
    this.selectedCategory.setValue('');
    this.minPriceControl.setValue('');
    this.maxPriceControl.setValue('');
    this.filteredItems = this.menuItems;
  }
  mostrarIngredientes() {}
  modalActivo: number = -1;

  ingredientesComunes: string[] = [
    'Tomate',
    'Queso',
    'Lechuga',
    'Pan',
    'Carne',
  ];

  abrirModal(index: number) {
    this.modalActivo = index;
  }

  cerrarModal() {
    this.modalActivo = -1;
  }
}
