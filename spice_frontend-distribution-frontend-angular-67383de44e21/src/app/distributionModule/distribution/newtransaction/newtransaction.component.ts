import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
//import { DemoserviceService } from '../../../services/demoservice.service'
import { DistributionService } from '../../services/distribution.service'
// import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import{DistributionTypes} from '../../models/distributionModel';


@Component({
  selector: 'app-newtransaction',
  templateUrl: './newtransaction.component.html',
  styleUrls: ['./newtransaction.component.css']
})
export class NewtransactionComponent implements OnInit {
  serviceNames: any;
  sourceNames = [];
  typeNames :DistributionTypes[];
  actionNames = [];
  browseFileData = [];
  addNewItem: Object;
  browseStatus: boolean = true;
  validTextFileStatus: boolean = true;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  textFileValidationMessage: string = '<ul><li>Avoid special character</li><li>Avoid alphabets</li><li>Please check the length of resource code</li></ul>'

  constructor(private distributionService: DistributionService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<NewtransactionComponent>) {
    // this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {

    // get distribution Source Data
    this.distributionService.getDistributionService(1,2).subscribe(data => {

      this.serviceNames = data;
    }, err => {
      console.log(err);
    });

    // get distribution Source Data
    this.distributionService.getDistributionSources().subscribe(data => {

      this.sourceNames = data;
    }, err => {
      console.log(err);
    });

    // get distribution Action Data
    this.distributionService.getDistributionActions().subscribe(data => {

      this.actionNames = data;
    }, err => {
      console.log(err);
    });

    // get distribution Types Data
    this.distributionService.getDistributionTypes().subscribe((data:DistributionTypes[]) => {
    this.typeNames = data;
    }, err => {
      console.log(err);
    });

  }
  openFile(event) {
    let input = event.target;
    this.browseFileData = [];
    this.validTextFileStatus = true;
    if (event.target.files[0].type == 'text/plain') {
      this.browseStatus = true;

      for (var index = 0; index < input.files.length; index++) {
        let reader = new FileReader();
        reader.onload = () => {
          var text = reader.result;
          var format = /^[0-9 ,\s]*$/;
          if (format.test(text)) {
            var commaSeperatedText = text.replace(/\n/g, ",").replace(/\s+/g, ", ").replace(/,(?=[^,]*$)/, '');


            this.browseFileData = commaSeperatedText.split(",");
            this.browseFileData = this.browseFileData.map(function (e) {
              return e.trim();
            });
            this.browseFileData = this.browseFileData.filter(v => v != '');

            this.browseFileData = this.browseFileData.filter(function (elem, index, self) {
              return index == self.indexOf(elem);
            })
            this.browseFileData.forEach((value) => {
              if (value.length != 10) {

                this.validTextFileStatus = false;
                return false;
              }
            });
            if (!this.validTextFileStatus) {
              console.log("length error");
              // this.toastr.error(this.textFileValidationMessage, 'Error!', { enableHTML: true, toastLife: 10000, showCloseButton: true });
            }

          }
          else {
            this.validTextFileStatus = false;
            // this.toastr.error(this.textFileValidationMessage, 'Error!', { enableHTML: true, toastLife: 10000, showCloseButton: true });

          }



        }
        reader.readAsText(input.files[index]);
      };
    }
    else {
      console.log("inside else");
      this.browseStatus = false;
    }

  }
  addItem(selectedService, selectedSource, selectedAction, selectedType) {
    if (selectedType == 1) {
      this.addNewItem = [{
        service_id: selectedService,
        distribution_action_id: selectedAction,
        distribution_type_id: selectedType,
        distribution_source_id: selectedSource,
        distributionTransactionReleases: this.browseFileData
      }];
    }
    else if (selectedType == 2) {
      this.addNewItem = [{
        service_id: selectedService.id,
        service:selectedService.service,
        distribution_action_id: selectedAction,
        distribution_type_id: selectedType,
        distribution_source_id: selectedSource,
        distributionTransactionResources: this.browseFileData
      }];
    }
    this.dialogRef.close(this.addNewItem[0]);

  }
}
