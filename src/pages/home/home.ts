import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
import { ScannerPage } from '../scanner/scanner';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
    constructor(private navCtrl: NavController, private holdingsProvider: HoldingsProvider) {
 
    }
    openScan(){
      this.navCtrl.push(ScannerPage);
    }//opens scanner page
 
    openAbout(){
      this.navCtrl.push(AboutPage);
    }//opens about page

    ionViewDidLoad(): void {
        this.holdingsProvider.loadHoldings();
    }
 
    addHolding(): void {
        this.navCtrl.push('AddHoldingPage');
    }
 
    goToCryptonator(): void {
        window.open('https://www.cryptonator.com/api', '_system');
    }//opens window
 
    refreshPrices(refresher): void {
        this.holdingsProvider.retrievePrices(refresher);
        //refresh prices
    }
 
}