import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuModel } from '@models/menu.model';
import { DomHandlerService } from './dom-handler.service';
import { horizontalMenuItems, verticalMenuItems } from '../../theme/utils/menu.data';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(
        private readonly domHandlerService: DomHandlerService,
        private readonly location: Location,
        private readonly router: Router,
    ) {
    }

    public getVerticalMenuItems(): Array<MenuModel> {
        return verticalMenuItems;
    }

    public getHorizontalMenuItems(): Array<MenuModel> {
        return horizontalMenuItems;
    }

    public expandActiveSubMenu(menu: Array<MenuModel>) {
        let url = this.location.path();
        let routerLink = decodeURIComponent(url);
        let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
        if (activeMenuItem[0]) {
            let menuItem = activeMenuItem[0];
            while (menuItem.parentId != 0) {
                menuItem = menu.filter(item => item.id == menuItem.parentId)[0];
                this.toggleMenuItem(menuItem.id);
            }
        }
    }

    public toggleMenuItem(menuId: number) {
        let menuItem = this.domHandlerService.winDocument.getElementById('menu-item-' + menuId);
        let subMenu = this.domHandlerService.winDocument.getElementById('sub-menu-' + menuId);
        if (subMenu) {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
                menuItem.classList.remove('expanded');
            } else {
                subMenu.classList.add('show');
                menuItem.classList.add('expanded');
            }
        }
    }

    public closeOtherSubMenus(menu: Array<MenuModel>, menuId: number) {
        let currentMenuItem = menu.filter(item => item.id == menuId)[0];
        menu.forEach(item => {
            if ((item.id != menuId && item.parentId == currentMenuItem.parentId) || (currentMenuItem.parentId == 0 && item.id != menuId)) {
                this.menuItem(item);
            }
        });
    }

    public closeAllSubMenus() {
        verticalMenuItems.forEach((item: MenuModel) => {
            this.menuItem(item);
        });
    }

    // symplify this function
    public menuItem(item: MenuModel) {
        let subMenu = this.domHandlerService.winDocument.getElementById('sub-menu-' + item.id);
        let menuItem = this.domHandlerService.winDocument.getElementById('menu-item-' + item.id);
        if (subMenu) {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
                menuItem.classList.remove('expanded');
            }
        }
    }

}
