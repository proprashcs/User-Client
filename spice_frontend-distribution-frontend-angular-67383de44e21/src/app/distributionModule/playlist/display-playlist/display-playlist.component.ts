import { Component, OnInit, ViewChild, Inject, ViewContainerRef, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DragulaService } from 'ng2-dragula';
import { LoaderService } from '../../../services/loader.service';
import { DemoserviceService } from '../../../services/demoservice.service';
import { PlaylistService } from '../../services/playlist.service';
import { NewplaylistComponent } from '../newplaylist/newplaylist.component';
import { SearchItems, addCheck } from '../../../models/loginModel';

import dragula from 'dragula';
import * as autoScroll from 'dom-autoscroller';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-display-playlist',
  templateUrl: './display-playlist.component.html',
  styles: [`
  .example-margin{
    margin-left: 201px;
    height: 50px;}
    .example-full-width{width:70%;}
    `]
})
export class DisplayPlaylistComponent implements OnInit, OnDestroy {
  displayDataSelection = [];
  serviceNames: any;
  selectedService: string;
  facility = [];
  displayPlaylist = [];
  displayData: Array<Object> = [];
  playListResourceCode :Array<Object> = [];
  playListData : any;
  playListCountry :any;

  addNewItem: Object;
  query: string;
  seacrhContainerData = [];
  showRecordStatus: boolean = false;
  showSavePostion: boolean = false;
  sowContainer: boolean = false;
  public data = [];

  search: SearchItems;
  selectedItemType: any = 5;

  //Spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showLoader: boolean = false;
  scroll: any;
  constructor(private demoserviceServic: DemoserviceService, private playlistService: PlaylistService, public toastr: ToastsManager, vRef: ViewContainerRef, private loaderService: LoaderService, private dragulaService: DragulaService, public dialog: MatDialog)
  {
    this.toastr.setRootViewContainerRef(vRef);
    this.search = new SearchItems();

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

  // Open Diloge new Playlist

    newPlaylistDialog() {
    let dialogRef = this.dialog.open(NewplaylistComponent, {data: {_playlistData:0 },
      disableClose: true,
      height: 'auto',
      width: '555px',
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        //this.loaderService.display(true);
        this.playlistService.insertPlayList(result, this.selectedService).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');
          // this.getAllTransaction();
          //this.p=1;
         // this.getAllTransaction();
        }, err => {

          this.toastr.error(err, 'Error!');
          this.loaderService.display(false);
        });
      }

    });
  }

  // Edit Playlist

    editPlaylistDialog() {
    let dialogRef = this.dialog.open(NewplaylistComponent, {data: {_playlistData:this.displayData },
      disableClose: true,
      height: 'auto',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log(result);

        this.playlistService.updatePlayList(this.selectedService,result).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');
          this.displayPlaylistData();
          //this.p=1;
         // this.getAllTransaction();
        }, err => {

          this.toastr.error(err, 'Error!');
          this.loaderService.display(false);
        });
      }

    });
  }

    searchPlaylist (query) {
    if(query.length >= 3){
    // this.loaderService.display(true);
    this.showLoader = true;
    this.search.service = this.selectedService;
    this.search.sectionId = 0;
    this.search.itemFlag = 3;
    this.search.search = query;
    this.displayPlaylist = [];

    this.playlistService.getSearchItem(this.search).subscribe((res: any) => {
      this.showRecordStatus = true;

      if (res[0].status == false) {
        this.displayPlaylist = [];

      }
      else {
        this.displayPlaylist = res;
      }
      this.showLoader=false;
    });
    }else{
      console.log("search length is less then 3");
    }
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

  displayPlaylistData() {
    this.showRecordStatus = false;
    this.displayData = [];
    this.showSavePostion = false;
    this.loaderService.display(true);
    this.playlistService.getPlayListinfo(this.selectedService,this.facility).subscribe((res: any) => {
      console.log(res);
      this.displayData = res;
      this.playListResourceCode = res.playListResourceCode;
      this.playListData = res.playList;
      this.playListCountry = res.playListCountry;
      if(this.displayData.length==0)
      this.sowContainer = true;
      this.loaderService.display(false);
    });
  }

  // Save Plalist data position
    saveDisplayPosition() {

    this.loaderService.display(true);
    this.displayDataSelection = [];
    this.playListResourceCode.forEach((value, index) => {
      this.displayDataSelection.push(value);
    })
    const data = this.displayDataSelection.map((value) => {
      //console.log(value.resourceCode);
      return value.resourceCode;

    })

    const countryData = this.playListCountry.map((value) => {
      //console.log(value.resourceCode);
      return value.countryId;

    })

    const finalJson = {
      //sectionId: this.selectedSection,
      id: this.playListData.id,
      name:this.playListData.name,
      playListType: this.playListData.playListType,
      dayTime:'',
      description:this.playListData.desc,
      imageCode:this.playListData.imageCode,
      usageRights:this.playListCountry,
      resourceCode: data
    }


    this.playlistService.updatePlayList(this.selectedService, finalJson).subscribe((res: any) => {
      this.toastr.success(res.message, 'Success!');
      this.showSavePostion = false;
      this.loaderService.display(false);
    }
      , err => {
        this.toastr.error(err.message, 'Error!');

      })

  }

}
