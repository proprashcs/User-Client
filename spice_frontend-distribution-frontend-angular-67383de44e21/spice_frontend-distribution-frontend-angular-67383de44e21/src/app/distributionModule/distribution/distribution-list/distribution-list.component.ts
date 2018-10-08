import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NewtransactionComponent } from '../newtransaction/newtransaction.component';
import { ViewtransactionComponent } from '../viewtransaction/viewtransaction.component';
import { DistributionService } from '../../services/distribution.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoaderService } from '../../../services/loader.service';



@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  styleUrls: ['./distribution-list.component.css']
})
export class DistributionListComponent implements OnInit {

  distributionList = [];
  pageNumber: number = 0;
  p:number=1;
  constructor(private distributionService: DistributionService, public dialog: MatDialog, private toastr: ToastsManager, private vRef: ViewContainerRef, private loaderService: LoaderService) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    // get Transactions list data
    setTimeout(() => {
      this.loaderService.display(true);
      this.getAllTransaction(this.pageNumber, 15, 'id', 'desc');
    }, 0);
  }



  getAllTransaction1() {

    this.distributionService.getAllTransactions().subscribe(data => {
      this.distributionList = data;
      this.loaderService.display(false);

    }, err => {

      this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
    });
  }
  getAllTransaction(page, size, sortBy, orderBy) {

    this.distributionService.getAllTransactionsBySorting(page, size, sortBy, orderBy).subscribe((data: any) => {

      this.distributionList = data;
      this.loaderService.display(false);

    }, err => {

      this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
    });
  }

  newTransactionDialog() {
    let dialogRef = this.dialog.open(NewtransactionComponent, {
      disableClose: true,
      height: '400px',
      width: '555px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.display(true);
        this.distributionService.createTransaction(result).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');
          // this.getAllTransaction();
          this.p=1;
           this.getAllTransaction(0, 15, 'id', 'desc');
        }, err => {

          this.toastr.error(err, 'Error!');
          this.loaderService.display(false);
        });
      }

    });
  }

  viewTransactionDialog(item) {
    this.dialog.open(ViewtransactionComponent, {
      disableClose: true, data: { transactionId: item.id },
      height: 'auto',
      width: '800px',
    });
  }
  refeshTransaction() {
    this.loaderService.display(true);
    this.getAllTransaction(this.pageNumber, 15, 'id', 'desc');
  }
  pageChanged(ev) {
    this.p=ev;
    this.loaderService.display(true);
    this.pageNumber = ev-1;
    this.getAllTransaction(this.pageNumber, 15, 'id', 'desc');


  }
}
