import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCcLogo]'
})
export class CcLogoDirective {

  @HostBinding('src')
  imageSource;


  @Input()
  cardNumber: string;
  constructor() { }

  ngOnChanges() {
   
    this.imageSource = 'assets/card-types/' + this.getCardTypeFromNumber() + '.png';
  }


  getCardTypeFromNumber() {
    if (this.cardNumber) {
      if (this.cardNumber.startsWith("37")) {
        return 'AMERICAN_EXPRESS';
      } else if (this.cardNumber.startsWith('4')) {
        return 'VISA';
      } else if (this.cardNumber.startsWith('5')) {
        return 'MASTERCARD';
      }
    }
    return 'UNKNOWN';
  }

}
