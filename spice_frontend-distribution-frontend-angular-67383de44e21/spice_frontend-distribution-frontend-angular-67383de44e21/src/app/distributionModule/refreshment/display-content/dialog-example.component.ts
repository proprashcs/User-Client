import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { DemoserviceService } from '../../../services/demoservice.service';
import { SearchItems, addCheck } from '../../../models/loginModel';


@Component({
  selector: 'app-dialog-example',
  templateUrl: 'dialog-data-example-dialog.html',
  styles: [`
  .example-margin{
    margin-left: 201px;
    height: 50px;}
    .example-full-width{width:84%;}
    `]
})
export class DialogExampleComponent implements OnInit {

  facility = [];
  displayData = [];

  addNewItem: Object;
  query: string;
  seacrhContainerData = [];
  showRecordStatus: boolean = false;

  public data = [];

  search: SearchItems;
  selectedItemType: any = 5;

  //Spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showLoader: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<DialogExampleComponent>,
    private demoserviceService: DemoserviceService
  ) {
    this.search = new SearchItems();

  }

  ngOnInit() {
    console.log(this.dialogData)
  }
  searchitem(itemTypeid, query) {
    // this.loaderService.display(true);
    this.showLoader = true;
    this.search.service = this.dialogData.service;
    this.search.sectionId = this.dialogData.sectionId
    this.search.itemFlag = itemTypeid;
    this.search.search = query;
    this.displayData = [];

    this.demoserviceService.getSearchItem(this.search).subscribe((res: any) => {
      this.showRecordStatus = true;

      if (res[0].status == false) {
        this.displayData = [];

      }
      else {
        this.displayData = res;
      }
      this.showLoader=false;
    });
  }

  addItem() {

    this.addNewItem = [{

      service: this.dialogData.service,
      sectionId: this.dialogData.sectionId,
      itemTypeId: this.selectedItemType,
      itemId: this.facility
    }]

    this.dialogRef.close(this.addNewItem);
  }

  onChange(gridData: Array<any>, isChecked: boolean) {

    if (this.facility.length > 0) {
      this.facility.splice(0, 1);
      if (isChecked)
        this.facility.push(gridData);
    }
    else {
      this.facility.push(gridData);

    }
  }

  radioOnChange(data) {
    this.showRecordStatus = false;
    this.query = '';
    this.facility = [];
  }

}
