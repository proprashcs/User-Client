import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { ToastModule } from 'ng2-toastr';
import { NgxPaginationModule } from 'ngx-pagination';



import {
  MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule,
  MatCardModule, MatToolbarModule, MatTooltipModule, MatPaginatorModule, MatCheckboxModule,
  MatRadioModule, MatIconModule, MatFormFieldModule
} from '@angular/material';
import { NameRoutingModule, routedComponents } from './distribtion.router';
import { DialogExampleComponent } from './refreshment/display-content/dialog-example.component';
import { DemoserviceService } from '../services/demoservice.service';
import { GlobalService } from '../config/global.service';
import { DistributionService } from './services/distribution.service';
import { PlaylistService } from './services/playlist.service';
import { RefreshmentService } from './services/refreshment.service';

import { NewtransactionComponent } from './distribution/newtransaction/newtransaction.component';
import { ViewtransactionComponent } from './distribution/viewtransaction/viewtransaction.component';
import { ConfirmationDialogComponent } from '../../app/public/confirmation-dialog/confirmation-dialog.component';
import { NewplaylistComponent } from './playlist/newplaylist/newplaylist.component';
import { ViewinnercontentComponent } from './refreshment/viewinnercontent/viewinnercontent.component';

@NgModule({
  imports: [CommonModule, NameRoutingModule,
    FormsModule, DragulaModule, ToastModule.forRoot(),
    NgxPaginationModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule,
    MatProgressSpinnerModule, MatCardModule, MatToolbarModule,
    MatTooltipModule, MatPaginatorModule, MatCheckboxModule, MatRadioModule, MatIconModule,
    MatFormFieldModule],


  entryComponents: [DialogExampleComponent, NewtransactionComponent,
    ViewtransactionComponent, ConfirmationDialogComponent,
    NewplaylistComponent, ViewinnercontentComponent],
  exports: [],
  declarations: [routedComponents, DialogExampleComponent, NewtransactionComponent,
    ViewtransactionComponent, ConfirmationDialogComponent, NewplaylistComponent,
    ViewinnercontentComponent],
  providers: [DemoserviceService, GlobalService, DistributionService, PlaylistService, RefreshmentService],
})
export class distributionModule { }
