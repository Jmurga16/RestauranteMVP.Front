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

  constructor(
    private menuHttpService: MenuHttpService,
    private platoHttpService: PlatoHttpService
  ) {

  }

  ngOnInit(): void {
    this.getMenus();
    this.getCarta()
  }

  toggleMenu(menuId: number): void {
    if (this.selectedMenu === menuId) {
      this.selectedMenu = null;
    } else {
      this.selectedMenu = menuId;      
    }
  }

  getFilteredItems(): any[] {
    return this.selectedMenu
      ? this.cartaList
        .filter(item => item.menuId === this.selectedMenu)
        .flatMap(item => item.platos) 
      : this.cartaList.flatMap(item => item.platos);
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
          this.platoList = response;
        }
      },
    });
  }

  getCarta() {
    this.menuHttpService.getMenuPlato().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.cartaList = response;
        }
      },
    });
  }

}
