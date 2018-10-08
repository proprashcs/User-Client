import { Component, OnInit, ViewChild, Inject, ViewContainerRef, OnDestroy } from '@angular/core';
import { DialogExampleComponent } from './dialog-example.component';
import { ViewinnercontentComponent } from '../viewinnercontent/viewinnercontent.component';
import { ConfirmationDialogComponent } from '../../../public/confirmation-dialog/confirmation-dialog.component';
import { DemoserviceService } from '../../../services/demoservice.service';
import { DragulaService } from 'ng2-dragula';
import { RefreshmentModel } from '../../../models/loginModel';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { LoaderService } from '../../../services/loader.service';
import dragula from 'dragula';
import { Countries } from '../../models/refreshmentModel';

import * as autoScroll from 'dom-autoscroller';


// import { DataSource } from '@angular/cdk';
import { MatPaginator } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-display-content',
  templateUrl: './display-content.component.html',
  styleUrls: ['./display-content.component.css']
})

export class DisplayContentComponent implements OnInit, OnDestroy {
  displayDataSelection = [];
  delItem: object;
  viewItm: object;
  // finalDisplayData=[];
  confirmMessage: string;
  private displayData: Array<Object> = [];
  serviceNames: any;
  selectedService: string;
  selectedSection: Number;
  selectedCountry: number;

  sectionName: any;
  countryNames: Countries[];
  sowContainer: boolean = false;
  showSavePostion: boolean = false;
  showCountry: boolean = false;

  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  scroll: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private demoserviceServic: DemoserviceService, public dialog: MatDialog, private dragulaService: DragulaService, public toastr: ToastsManager, vRef: ViewContainerRef, private loaderService: LoaderService) {
    this.toastr.setRootViewContainerRef(vRef);

    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {

      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });


  }

  ngOnInit() {
    // let drake = dragula();
    // this.dragulaService.add('another-bag', drake);
    this.scroll = autoScroll(window,
      {
        margin: 30,
        maxSpeed: 25,
        scrollWhenOutside: false,

        autoScroll: function () { // don't use () => {} syntax, we want to keep the 'this'
          // Only scroll when the pointer is down, and there is a child being dragged.
          return this.down;
        }
      });


    this.demoserviceServic.getAllService().subscribe(data => {

      this.serviceNames = data;
      this.loaderService.display(false);

    }, err => {
      console.log(err);
    });

  }

  ngOnDestroy() {
    this.dragulaService.destroy('bag');
    this.scroll.destroy();
  }

  private hasClass(el: any, name: string): any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }


  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args: any): void {

    let [e] = args;
    this.showSavePostion = true;
    this.addClass(e, 'ex-moved');


  }
  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-overservice');
  }

  getCountry(selectedService) {
    this.loaderService.display(true);
    this.showCountry = false;
    this.selectedSection = null;
    this.selectedCountry = null;

    this.sowContainer = false;
    this.demoserviceServic.getCountries(selectedService).subscribe((res: Countries[]) => {
      this.countryNames = res;
      if (this.countryNames.length > 1) {
        this.showCountry = true;
        this.loaderService.display(false);
      }
      else if (this.countryNames.length == 0)
        this.loaderService.display(false);

      else {
        this.selectedCountry = this.countryNames[0].countryId;
        this.getSections(selectedService, this.countryNames[0].countryId)
      }

    }, err => {
      console.log(err);
    })

  }
  getSections(selectedService, countryId) {
    this.sowContainer = false;
    this.selectedSection = null;
    this.loaderService.display(true);

    this.demoserviceServic.getSections(selectedService, countryId).subscribe(data => {
      this.sectionName = data;
      this.loaderService.display(false);
    }, err => {

    })
  }
  displayContainerData(serviceName, containerId) {
    this.displayData = [];
    this.showSavePostion = false;
    this.loaderService.display(true);
    this.demoserviceServic.getContainerItems(serviceName, containerId).subscribe((res: any) => {
      //  console.log(res);
      this.displayData = res;
      if(this.displayData.length==0)
      this.sowContainer = true;
      this.loaderService.display(false);

    });
  }


  //selectedValue: string;

  openDialog() {

    let dialogRef = this.dialog.open(DialogExampleComponent, { disableClose: true, data: { service: this.selectedService, sectionId: this.selectedSection } });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loaderService.display(true);
        this.demoserviceServic.addNewItem(result).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');
          this.displayContainerData(this.selectedService, this.selectedSection);
        });
      }

    });
  }
  // confirmation delete dialog
  deleteItem(item) {

    this.delItem = [{
      service: this.selectedService,
      sectionId: this.selectedSection,
      itemTypeId: item.item_type_id,
      itemId: [item.item_id]
    }]
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: true, height: '240px', width: '450px', data: { dragData: item } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {


        this.demoserviceServic.deleteItem(this.delItem).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');

          this.displayContainerData(this.selectedService, this.selectedSection);
        }, err => {
          this.toastr.error(err.message, 'Error!');

        });
      }

    });

  }

    // View Inner Content dialog
  viewItem(item) {
    console.log(item);
    this.viewItm = {
      id: item.item_resource_id,
      countryId: this.selectedCountry,
      typeId: item.item_type_id
    }
    this.dialog.open(ViewinnercontentComponent, {
      disableClose: true, data: {service:this.selectedService, itemDetail:this.viewItm },
      height: 'auto',
      width: '900px',
    });
  }

  saveDisplayPosition() {

    this.loaderService.display(true);
    this.displayDataSelection = [];
    this.displayData.forEach((value, index) => {
      this.displayDataSelection.push(value);
    })
    const data = this.displayDataSelection.map((value) => {
      return value.item_id;

    })

    const finalJson = {
      service: this.selectedService,
      sectionId: this.selectedSection,
      itemId: data
    }



    this.demoserviceServic.setContainerItemPosition(finalJson).subscribe((res: any) => {
      this.toastr.success(res.message, 'Success!');
      this.showSavePostion = false;
      this.loaderService.display(false);
    }
      , err => {
        this.toastr.error(err.message, 'Error!');

      })

  }

}
