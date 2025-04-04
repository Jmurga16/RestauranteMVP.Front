import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

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
  imports: [ReactiveFormsModule],
  templateUrl: './plato.component.html',
  styleUrl: './plato.component.css',
})
export class PlatoComponent {
  // Removed redundant declaration of selectedCategory
  showChildMenu: boolean = false;

  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Brownie de Chocolate',
      description: 'Brownie con trozos de chocolate y nueces.',
      price: 6,
      image: 'assets/images/brownie.jpg',
      category: 'Menú Infantil',
    },
    {
      id: 2,
      name: 'Pizza Mozzarella',
      description: 'Pizza con salsa de tomate y queso',
      price: 8,
      image: 'assets/images/pizza.jpg',
      category: 'Menú Infantil',
    },
    {
      id: 3,
      name: 'Tiramisú',
      description: 'Postre clásico italiano con café y queso mascarpone',
      price: 10,
      image: 'assets/images/tiramisu.jpg',
      category: 'Menú Infantil',
    },
    {
      id: 4,
      name: 'Carpaccio de Res',
      description: 'Finas láminas de res con alcaparras y parmesano',
      price: 60,
      image: 'assets/images/carpaccio.jpg',
      category: 'Menú Degustación',
    },
    {
      id: 5,
      name: 'Risotto de Champiñones',
      description: 'Arroz cremoso con variedad de hongos frescos',
      price: 85,
      image: 'assets/images/risotto.jpg',
      category: 'Menú Degustación',
    },
    {
      id: 6,
      name: 'Lomo Saltado',
      description: 'Tiras de lomo fino salteadas con cebolla y tomate',
      price: 45,
      image: 'assets/images/lomo.jpg',
      category: 'Menú Ejecutivo',
    },
  ];
  filteredItems: MenuItem[] = this.menuItems;
  categories: string[] = [];

  searchControl = new FormControl('');
  selectedCategory = new FormControl('');
  minPriceControl = new FormControl('');
  maxPriceControl = new FormControl('');

  ngOnInit(): void {
    // Extract unique categories
    this.categories = Array.from(
      new Set(this.menuItems.map((item) => item.category))
    );

    // Set up search filtering with debounce
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

  applyFilters(): void {
    let result = this.menuItems;

    // Filter by search term
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    const category = this.selectedCategory.value;
    if (category) {
      result = result.filter((item) => item.category === category);
    }

    // Filter by min price
    const minPrice = this.minPriceControl.value;
    if (minPrice !== null && minPrice !== '') {
      result = result.filter((item) => item.price >= Number(minPrice));
    }

    // Filter by max price
    const maxPrice = this.maxPriceControl.value;
    if (maxPrice !== null && maxPrice !== '') {
      result = result.filter((item) => item.price <= Number(maxPrice));
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
}
