import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MenuModel } from '@models/menu.model';
import { TranslateModule } from '@ngx-translate/core';
import { MenuService } from '@services/theme/menu.service';

@Component({
    selector: 'app-horizontal-menu',
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        TranslateModule
    ],
    templateUrl: './horizontal-menu.component.html',
    styleUrls: ['./horizontal-menu.component.scss'],
    providers: [MenuService]
})
export class HorizontalMenuComponent implements OnInit {

    @Input('menuParentId') menuParentId: number;

    menuItems: Array<MenuModel>;

    constructor(
        private readonly menuService: MenuService
    ) {
    }

    ngOnInit(): void {
        this.menuItems = this.menuService.getHorizontalMenuItems();
        this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);
    }

}
