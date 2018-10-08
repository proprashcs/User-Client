import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { DistributionService } from '../../services/distribution.service';
import { getdistributionTransactionResourceStatuses, getByTransactionId } from '../../models/distributionModel';


@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.css']
})
export class ViewtransactionComponent implements OnInit {

  reportTypes = [];
  selectedReport: any;
  transactionData: getByTransactionId[] = [];
  transId: any;
  selectedValue: any;
  fetchData = [];
  // Spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  // tslint:disable-next-line:no-inferrable-types
  showLoader: boolean = true;
  filtersData: getdistributionTransactionResourceStatuses[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ViewtransactionComponent>,
    private distributionService: DistributionService,
  ) {
    this.filtersData = [];
  }

  ngOnInit() {
    // get Transaction data By ID
    this.transId = this.dialogData.transactionId;
    this.distributionService.getByTransactionId(this.transId).subscribe(data => {
      this.transactionData = data;
      console.log(this.transactionData);
      this.showLoader = false;

      data.forEach(element => {
        // tslint:disable-next-line:max-line-length
        if (this.filtersData.findIndex(x => x.distribution_transaction_resource_status === element.distributionTransactionResourceStatuses.distribution_transaction_resource_status) === -1) {
          this.filtersData.push(element.distributionTransactionResourceStatuses);
        }
      });
      console.log(this.filtersData);

    }, err => {
      console.log(err);
    });

  }
  getFilterdStatusData() {
    if (this.selectedValue.length > 0) {
      this.transactionData = [];
      this.fetchData = [];
      // tslint:disable-next-line:max-line-length
      this.selectedValue.forEach(element => {
        // tslint:disable-next-line:max-line-length
        console.log(this.distributionService.getTransactionDataById().filter(statusData => statusData.distributionTransactionResourceStatuses.id == element));
        this.fetchData = (this.distributionService.getTransactionDataById().filter(statusData => statusData.distributionTransactionResourceStatuses.id == element));
        // this.transactionData.push( this.fetchData);
        this.transactionData = this.transactionData.concat(this.fetchData);
      });
    }
    // tslint:disable-next-line:one-line
    else {
      this.transactionData = this.distributionService.getTransactionDataById();
    }

  }

  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

    const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = '';
    // CSV += ReportTitle + '\r\n\n';
    if (ShowLabel) {
      let row = '';
      // tslint:disable-next-line:forin
      for (const index in arrData[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }
    for (let i = 0; i < arrData.length; i++) {
      let row = '';

      // tslint:disable-next-line:forin
      for (const index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV === '') {
      return;
    }

    // Generate a file name
    let fileName = 'Transaction_';
    fileName += ReportTitle.replace(/ /g, '_');
    const uri = 'data:text/csv;charset=utf-8,' + window['escape'](CSV);
    const link = document.createElement('a');
    link.href = uri;
    link.download = fileName + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  downloadLocalData() {
    var formData = [];
    var resourceCode = this.transactionData.filter((data) => {
      // tslint:disable-next-line:max-line-length
      console.log(data.remarks);
      // tslint:disable-next-line:curly
      if (data.remarks != null) {
        formData.push({
          id: data.id, resourceCode: data.resource_code,
          distribution_transaction_resource_status: data.distributionTransactionResourceStatuses.distribution_transaction_resource_status,
          remarks: data.remarks
        });
      }
      else {
        formData.push({
          id: data.id, resourceCode: data.resource_code,
          distribution_transaction_resource_status: data.distributionTransactionResourceStatuses.distribution_transaction_resource_status,
          remarks: ''
        });
      }
    });


    this.JSONToCSVConvertor(formData, 'Report', true);

  }
  downloadArtistDetails() {
    this.distributionService.downloadArtist(this.transId).subscribe(data => {
      const fileBlob = data.blob();
      const blob = new Blob([fileBlob], {
        type: 'data:text/csv;charset=utf-8'
      });
      const url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = url;
      link.download = 'artistDetails' + '.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    });
  }

}
