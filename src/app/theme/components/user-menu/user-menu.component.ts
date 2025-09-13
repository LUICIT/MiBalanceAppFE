import { Component, OnInit } from '@angular/core';
import { LayoutAlignDirective, LayoutDirective, ShowHideDirective } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { BidiModule } from '@angular/cdk/bidi';
import { Settings, SettingsService } from '@services/theme/settings.service';
import { MaterialModule } from "../../../modules/material.module";
import { environment } from "../../../../environments/environment";
import { UserService } from "@services/system/user.service";
import { UserModel } from "@models/user.model";
import { lastValueFrom } from "rxjs";
import { AuthService } from "@services/web-services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-user-menu',
    imports: [
        RouterModule,
        LayoutAlignDirective,
        LayoutDirective,
        ShowHideDirective,
        MaterialModule,
        TranslateModule,
        BidiModule,
    ],
    templateUrl: './user-menu.component.html'
})
export class UserMenuComponent implements OnInit {

    settings: Settings;
    user: UserModel;

    imageProfile = 'images/others/user.jpg';

    constructor(
        private readonly settingsService: SettingsService,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router
    ) {
        this.settings = this.settingsService.settings;
    }

    ngOnInit() {
        this.userService.user.subscribe(user => {
            if (user) {
                this.user = user;
            }
            if (this.user?.avatar_path) {
                this.imageProfile = environment.baseUrl + this.user.avatar_path;
            }
        });
    }

    logout(): void {
        lastValueFrom(this.authService.logout()).then(response => {
            this.snackBar.open(response.data, '×', {
                panelClass: 'error',
                verticalPosition: 'bottom',
                duration: 3000
            });
            this.userService.clearUser();
            this.router.navigate(['login']).then(r => r);
        }).catch(error => {
            this.snackBar.open(error.error.message, '×', {
                panelClass: 'error',
                verticalPosition: 'bottom',
                duration: 5000
            });
        });
    }

}
