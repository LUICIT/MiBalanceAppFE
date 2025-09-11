import {Routes} from "@angular/router";
import {AccountComponent} from "./account.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            },
            // {path: 'my-properties', component: MyPropertiesComponent},
            // {path: 'my-properties/:id', component: EditPropertyComponent},
            // {path: 'favorites', component: FavoritesComponent},
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    }
];
