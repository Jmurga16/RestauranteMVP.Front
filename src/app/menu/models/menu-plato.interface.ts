import { IMenu } from "./menu.interface";
import { IPlato } from "./plato.interface";

export interface IMenuPlato {
    menuId?: number,
    platoId?: number,
    menus?: IMenu,
    platos?: IPlato,
}