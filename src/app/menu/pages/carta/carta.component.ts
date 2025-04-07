import { Component, OnInit } from '@angular/core';
import { IMenu, IMenuPlato, IPlato } from '../../models';
import { MenuHttpService, PlatoHttpService } from '../../services';

@Component({
  selector: 'app-carta',
  imports: [],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css',
})
export class CartaComponent implements OnInit {
  selectedMenu: number | null = null;
  showChildMenu: boolean = false;

  menuList: IMenu[] = [];
  cartaList: IMenuPlato[] = [];
  platoList: IPlato[] = [];

  menuDemo: IMenu[] = [
    {
      id: 1,
      menuId: 1,
      nombre: 'Menú Degustación',
      descripcion:
        'Menú especial con una selección de platos gourmet para una experiencia gastronómica completa.',
    },
    {
      id: 2,
      menuId: 2,
      nombre: 'Menú Ejecutivo',
      descripcion:
        'Menú diario con opciones variadas para el almuerzo de trabajo, o la cena',
    },
    {
      id: 3,
      menuId: 3,
      nombre: 'Menú Infantil',
      descripcion:
        'Menú con opciones adaptadas para niños, incluyendo platos pequeños y saludables.',
    },
  ];

  menuItems: IMenuPlato[] = [
    {
      menu: {
        id: 1,
        menuId: 1,
        nombre: 'Menú Infantil',
        descripcion: 'Menú especial para niños',
      },
      plato: {
        id: 1,
        nombre: 'Brownie de Chocolate',
        descripcion: 'Brownie con trozos de chocolate y nueces.',
        foto: 'assets/images/brownie_chocolate.jpg',
        dificultad: 'Fácil',
        precio: 6,
        categoria: {
          id: 3,
          nombre: 'Postres',
          descripcion: 'Opciones dulces para terminar la comida.',
        },
      },
    },
    {
      menu: {
        id: 1,
        menuId: 1,
        nombre: 'Menú Infantil',
        descripcion: 'Menú especial para niños',
      },
      plato: {
        id: 2,
        nombre: 'Pizza Mozzarella',
        descripcion: 'Pizza con salsa de tomate y queso',
        foto: 'assets/images/pizza_mozza.jpg',
        dificultad: 'Fácil',
        precio: 8,
        categoria: {
          id: 2,
          nombre: 'Platos Principales',
          descripcion: 'Platos fuertes para el almuerzo o cena.',
        },
      },
    },
    {
      menu: {
        id: 1,
        menuId: 1,
        nombre: 'Menú Infantil',
        descripcion: 'Menú especial para niños',
      },
      plato: {
        id: 3,
        nombre: 'Tiramisú',
        descripcion: 'Postre clásico italiano con café y queso mascarpone',
        foto: 'assets/images/tiramisu.jpg',
        dificultad: 'Media',
        precio: 10,
        categoria: {
          id: 3,
          nombre: 'Postres',
          descripcion: 'Opciones dulces para terminar la comida.',
        },
      },
    },
    {
      menu: {
        id: 2,
        menuId: 2,
        nombre: 'Menú Degustación',
        descripcion: 'Experiencia gourmet con varios tiempos',
      },
      plato: {
        id: 4,
        nombre: 'Carpaccio de Res',
        descripcion: 'Finas láminas de res con alcaparras y parmesano',
        foto: 'assets/images/cheesecake.jpg',
        dificultad: 'Alta',
        precio: 60,
        categoria: {
          id: 1,
          nombre: 'Entradas',
          descripcion: 'Pequeñas porciones para comenzar.',
        },
      },
    },
    {
      menu: {
        id: 2,
        menuId: 2,
        nombre: 'Menú Degustación',
        descripcion: 'Experiencia gourmet con varios tiempos',
      },
      plato: {
        id: 5,
        nombre: 'Risotto de Champiñones',
        descripcion: 'Arroz cremoso con variedad de hongos frescos',
        foto: 'assets/images/lasagna_bolonesa.jpg',
        dificultad: 'Alta',
        precio: 85,
        categoria: {
          id: 2,
          nombre: 'Platos Principales',
          descripcion: 'Platos fuertes para el almuerzo o cena.',
        },
      },
    },
    {
      menu: {
        id: 3,
        menuId: 3,
        nombre: 'Menú Ejecutivo',
        descripcion: 'Opciones rápidas y nutritivas para el día',
      },
      plato: {
        id: 6,
        nombre: 'Lomo Saltado',
        descripcion: 'Tiras de lomo fino salteadas con cebolla y tomate',
        foto: 'assets/images/paella_mixta.jpg',
        dificultad: 'Media',
        precio: 45,
        categoria: {
          id: 2,
          nombre: 'Platos Principales',
          descripcion: 'Platos fuertes para el almuerzo o cena.',
        },
      },
    },
  ];

  constructor(
    private menuHttpService: MenuHttpService,
    private platoHttpService: PlatoHttpService
  ) {}
  ngOnInit(): void {
    this.getMenus();
  }

  toggleMenu(menuId: number): void {
    if (this.selectedMenu === menuId) {
      this.selectedMenu = null;
    } else {
      this.selectedMenu = menuId;
      //this.getPlatos()
    }
  }

  getFilteredItems(): any[] {
    return this.selectedMenu
      ? this.menuItems.filter((item) => item.menu?.menuId === this.selectedMenu)
      : this.menuItems;
  }

  toggleChildMenu(): void {
    this.showChildMenu = !this.showChildMenu;
  }

  getMenus() {
    this.menuHttpService.getAll().subscribe({
      next: (response) => {
        if (response) {
          this.menuList = response;
        }
      },
    });
  }

  getPlatos() {
    this.platoHttpService.getAll().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response) {
          this.menuItems = response;
        }
      },
    });
  }
}
