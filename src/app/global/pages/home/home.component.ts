import { Component } from '@angular/core';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  selectedCategory: string | null = null;
  showChildMenu: boolean = false;

  menuCategories = [
    {
      id: 1,
      name: 'Menú Degustación',
      description:
        'Menú especial con una selección de platos gourmet para una experiencia gastronómica completa.',
      price: 100,
    },
    {
      id: 2,
      name: 'Menú Ejecutivo',
      description:
        'Menú diario con opciones variadas para el almuerzo de trabajo, o la cena',
      price: 15,
    },
    {
      id: 3,
      name: 'Menú Infantil',
      description:
        'Menú con opciones adaptadas para niños, incluyendo platos pequeños y saludables.',
      price: 8,
    },
  ];

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

  toggleCategory(category: string): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
  }

  getFilteredItems(): MenuItem[] {
    return this.selectedCategory
      ? this.menuItems.filter((item) => item.category === this.selectedCategory)
      : [];
  }

  toggleChildMenu(): void {
    this.showChildMenu = !this.showChildMenu;
  }
}
