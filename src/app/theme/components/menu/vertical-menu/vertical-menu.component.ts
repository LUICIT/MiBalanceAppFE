import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuModel } from '@models/menu.model';
import { TranslateModule } from '@ngx-translate/core';
import { MenuService } from '@services/theme/menu.service';
import { LayoutAlignDirective, LayoutDirective } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-vertical-menu',
    imports: [
        RouterModule,
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        LayoutAlignDirective,
        LayoutDirective
    ],
    templateUrl: './vertical-menu.component.html',
    styleUrls: ['./vertical-menu.component.scss'],
    providers: [MenuService]
})
export class VerticalMenuComponent implements OnInit {

    @Input('menuParentId') menuParentId: number;

    menuItems: Array<MenuModel>;

    constructor(
        private readonly menuService: MenuService
    ) {
    }

    ngOnInit() {
        this.menuItems = this.menuService.getVerticalMenuItems();
        this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);
    }

    onClick(menuId: number) {
        this.menuService.toggleMenuItem(menuId);
        this.menuService.closeOtherSubMenus(this.menuService.getVerticalMenuItems(), menuId);
    }

}
