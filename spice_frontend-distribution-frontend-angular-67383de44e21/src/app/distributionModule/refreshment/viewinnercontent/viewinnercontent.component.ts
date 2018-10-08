import { Component, OnInit, Inject, ViewContainerRef, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { DragulaService } from 'ng2-dragula';
import * as autoScroll from 'dom-autoscroller';
import { RefreshmentService } from '../../services/refreshment.service'
import { InnerSearchItems } from '../../models/refreshmentModel'
import dragula from 'dragula';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-viewinnercontent',
  templateUrl: './viewinnercontent.component.html',
  styleUrls: ['./viewinnercontent.component.css']
})
export class ViewinnercontentComponent implements OnInit, OnDestroy {
  facility = [];
  delItem: object;
  displayDataSelection = [];
  query: string;
  seacrhContainerData = [];
  showRecordStatus: boolean = false;
  public data = [];
  search :InnerSearchItems;
  newItem : any;
  reportTypes = [];
  selectedReport:any;
  displayData:any;
  transId:any;
  showAddItemSection=false;
  showDisplayListItem = true;
  displaySearchData =[];
  showSavePostion: boolean = false;
  pageTitle = "View detail";
  finalJson : any;

  //Spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showLoader: boolean = true;
  scroll: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ViewinnercontentComponent>,
    private refreshmentService:RefreshmentService,
    private dragulaService: DragulaService,
    public toastr: ToastsManager, vRef: ViewContainerRef,
  ) {
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
    this.scroll = autoScroll('window',
      {
        margin: 30,
        maxSpeed: 25,
        scrollWhenOutside: false,

        autoScroll: function () { // don't use () => {} syntax, we want to keep the 'this'
          // Only scroll when the pointer is down, and there is a child being dragged.
          return this.down;
        }
      });


    console.log(this.dialogData)
      // get Transaction data By ID
    var service = this.dialogData.service;
    this.refreshmentService.getItemList(service, this.dialogData.itemDetail).subscribe(data => {
      console.log(data);
      this.displayData = data;
      this.showLoader=false;
    }, err => {console.log(err);
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

  addItem() {
  this.pageTitle = "Search Item";
  this.showAddItemSection = true;
  this.showDisplayListItem = false;


  }

  backPage(){
  this.pageTitle = "View Detail";
  this.showAddItemSection = false;
  this.showDisplayListItem = true;
  }

  searchItem(query){

    console.log(this.dialogData.itemDetail);
    console.log(query);
    //this.showLoader = true;
   this.search = this.dialogData.itemDetail;
   this.search.search = query;
   this.refreshmentService.searchItem(this.dialogData.service,this.search).subscribe((res: any) => {
      this.showRecordStatus = true;
      console.log(res);

      if (res[0].status == false) {
        this.displaySearchData = [];

      }
      else {
        this.displaySearchData = res;
      }
      this.showLoader=false;
    });
  }

  addNewItem(){
    this.newItem = this.dialogData.itemDetail;
    this.newItem.resourceId = this.facility;
    console.log(this.newItem);
    this.refreshmentService.addNewItem(this.dialogData.service, this.newItem).subscribe((res: any) => {
      //this.showRecordStatus = true;
      console.log(res);
       if (res.status == false) {
         //this.displaySearchData = [];

       }
       else {
         //this.displaySearchData = res;
        this.toastr.success(res.message, 'Success!');
        this.pageTitle = "View Detail";
        this.showAddItemSection = false;
        this.showDisplayListItem = true;
        var service = this.dialogData.service;
    this.refreshmentService.getItemList(service, this.dialogData.itemDetail).subscribe(data => {
      console.log(data);
      this.displayData = data;
      //this.showLoader=false;
    }, err => {console.log(err);
    });
       }
      // this.showLoader=false;
    });

  }

  saveDisplayPosition(){
   console.log(this.displayData);

   //this.loaderService.display(true);
    this.displayDataSelection = [];
    this.displayData.forEach((value, index) => {
      this.displayDataSelection.push(value);
    })
    const data = this.displayDataSelection.map((value) => {
      return value.item_resource_id;
    })

    this.finalJson = this.dialogData.itemDetail;
    this.finalJson.resourceCodeId = data;

    console.log(this.finalJson);

    this.refreshmentService.saveItemPosition(this.dialogData.service, this.finalJson).subscribe((res: any) => {
     // this.toastr.success(res.message, 'Success!');
      this.showSavePostion = false;
      //this.loaderService.display(false);
    }
    , err => {
        //this.toastr.error(err.message, 'Error!');

      })

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

  deleteItem(item){
    console.log(item);
    console.log(this.dialogData.itemDetail);
  this.delItem = {
      id: this.dialogData.itemDetail.id,
      typeId: item.item_type_id,
      countryId: this.dialogData.itemDetail.countryId,
      resourceId: [item.item_resource_id]
    }
    console.log(this.delItem);
    this.refreshmentService.deleteItem(this.dialogData.service, this.delItem).subscribe((res: any) => {
     // this.toastr.success(res.message, 'Success!');
      //this.showSavePostion = false;
      //this.loaderService.display(false);
    alert("item Deleted Successfully");
    var service = this.dialogData.service;
    this.refreshmentService.getItemList(service, this.dialogData.itemDetail).subscribe(data => {
      console.log(data);
      this.displayData = data;
      //this.showLoader=false;
    }, err => {console.log(err);
    });

    }
    , err => {
        //this.toastr.error(err.message, 'Error!');

      })
  }

}
