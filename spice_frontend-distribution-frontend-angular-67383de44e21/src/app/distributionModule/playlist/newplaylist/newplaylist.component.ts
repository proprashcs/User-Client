import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { DemoserviceService } from '../../../services/demoservice.service';
import { PlaylistService } from '../../services/playlist.service';
import { Countries } from '../../models/playlistModel';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-newplaylist',
  templateUrl: './newplaylist.component.html',
  styles: [`
  .example-margin{
    margin-left: 201px;
    height: 50px;}
    .example-full-width{width:84%;}
    `]
})
export class NewplaylistComponent implements OnInit {

  serviceNames: any;
  countryNames: Countries[];
  selectedCountry: any[] = [];
  selectedList:number;

  playListTypes: any;
  addNewItem: Object;
  playListFrom: FormGroup;
  id: number;
  header:string;

  browseFileData: any[] = [];
  validResourceCodelength: number = 0;
  invalidResourceCodeLength: number = 0;
  totalResourceCodeLength: number = 0;
    validResourceCode = [];
     invalidResourceCode = [];

  constructor(private formBuilder: FormBuilder, private Activatedroute: ActivatedRoute, private playlistService: PlaylistService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<NewplaylistComponent>) {

    this.playListFrom = formBuilder.group({
      'usageRights': [null, [Validators.required]],
      'playListType': [null, [Validators.required]],
      'name': [null, [Validators.required]],
      'imageCode': [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      'resourceCode': [null, [Validators.required]],
      'description': [null]
    });
  }

  ngOnInit() {
    console.log(this.dialogData);
    if (this.dialogData._playlistData != 0) {
      this.header="Edit playList";
      console.log(this.dialogData._playlistData.playListCountry);
      this.selectedCountry = this.dialogData._playlistData.playListCountry;
      //this.playListFrom.controls['usageRights'].setValue(this.dialogData._playlistData.playListCountry);
      this.playListFrom.controls['name'].setValue(this.dialogData._playlistData.playList.name);
      this.playListFrom.controls['imageCode'].setValue(this.dialogData._playlistData.playList.imageCode);
      this.playListFrom.controls['description'].setValue(this.dialogData._playlistData.playList.desc);
      this.playListFrom.controls["playListType"].disable();
      this.selectedList=this.dialogData._playlistData.playList.playListType;
      const data = this.dialogData._playlistData.playListResourceCode.map((value) => {
        //console.log(value.resourceCode);
        return value.resourceCode;
      })
      this.playListFrom.controls['resourceCode'].setValue(data);

      this.validResourceCode=data;

      //this.playListFrom.controls['desc'].setValue(this.dialogData._playlistData.playlist.playListType);
      //this.playListFrom.controls['resourceCode'].setValue(this.dialogData._playlistData.playlist.desc);


    }
    else{
         this.header="Add new playList";
    }

    // Get Countries
    this.playlistService.getAllCountries().subscribe(data => {

      this.countryNames = data;
      //this.loaderService.display(false);

    }, err => {
      console.log(err);
    });

    // Get playListType

    this.playlistService.getplayListType().subscribe(data => {

      this.playListTypes = data;
      console.log(this.playListTypes);
      //this.loaderService.display(false);

    }, err => {
      console.log(err);
    });

  }

  // addItem(selectedCountry, selectedList, playlistName, imageCode, resourceCode, description) {

  //   this.addNewItem = [{

  //     id: '',
  //     name: playlistName,
  //     playListType: selectedList,
  //     dayTime: '',
  //     imageCode: imageCode,
  //     description: description,
  //     resourceCode: resourceCode,
  //     usageRights: selectedCountry
  //   }]

  //   this.dialogRef.close(this.addNewItem);
  // }

  onSubmit(form: NgForm) {
    if (form.valid) {
     if (this.dialogData._playlistData != 0) {
      this.addNewItem = {

        id: this.dialogData._playlistData.playList.id,
        name: form.value.name,
        playListType: this.dialogData._playlistData.playList.playListType,
        dayTime: '',
        imageCode: form.value.imageCode,
        description: form.value.description,
        resourceCode:  this.validResourceCode,
        usageRights: form.value.usageRights
      }
     }
    else{
       this.addNewItem = {

        id: '',
        name: form.value.name,
        playListType: form.value.playListType,
        dayTime: '',
        imageCode: form.value.imageCode,
        description: form.value.description,
        resourceCode:  this.validResourceCode,
        usageRights: form.value.usageRights
      }
    }

      this.dialogRef.close(this.addNewItem);
    }

  }

  validateResource(event) {

  this.invalidResourceCode=[];
   this.validResourceCode=[];
    var text = event.target.value;

    // console.log(event.target.value);

    var format = /^[0-9 ,\s]*$/;
    if (format.test(text)) {
      // var commaSeperatedText = text.replace(/\n/g, ",").replace(/\s+/g, ", ").replace(/,(?=[^,]*$)/, '');

      var commaSeperatedText = text.replace(/\n/g, ",").replace(/\s+/g, ", ");


      this.browseFileData = commaSeperatedText.split(",");

      this.browseFileData = this.browseFileData.map(function (e) {
        return e.trim();
      });

      this.browseFileData = this.browseFileData.filter(v => v != '');



      this.browseFileData = this.browseFileData.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      })

      this.browseFileData.forEach( value=> {
        if (value.length != 10) {
         this.invalidResourceCode.push(value)
        } else {
          this.validResourceCode.push(value);
        }
      });

      this.totalResourceCodeLength=this.browseFileData.length;
      this.validResourceCodelength=this.validResourceCode.length;
      this.invalidResourceCodeLength=this.invalidResourceCode.length;

    }

  }



}
