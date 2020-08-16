import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
    imports:[
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatBadgeModule,
        MatTabsModule,
        MatListModule,
        MatSidenavModule
    ],
    exports:[
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatBadgeModule,
        MatTabsModule,
        MatListModule,
        MatSidenavModule
    ]
})

export class MaterialModule {}