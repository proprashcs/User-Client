import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistributionListComponent } from './distribution/distribution-list/distribution-list.component';
import { DisplayContentComponent } from './refreshment/display-content/display-content.component';
import { DisplayPlaylistComponent } from './playlist/display-playlist/display-playlist.component';

const routes: Routes = [
    { path: 'dashboard', component: DistributionListComponent },
    { path: 'distribution', component: DistributionListComponent },
    { path: 'refreshment', component: DisplayContentComponent },
    { path: 'playlist', component: DisplayPlaylistComponent },
    { path: 'playlist/:id', component: DisplayPlaylistComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NameRoutingModule { }

export const routedComponents = [DistributionListComponent,DisplayContentComponent,DisplayPlaylistComponent];