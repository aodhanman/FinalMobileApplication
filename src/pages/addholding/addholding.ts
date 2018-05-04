import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
 
@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-add-holding',
    templateUrl: 'addholding.html'
})
export class AddHoldingPage {
 
    private cryptoCode: string;
    private displayCurrency: string;
    private totalHolding;
 
    constructor(private navCtrl: NavController, private holdingsProvider: HoldingsProvider) {
 
    }
 
    addHolding(): void {
 
    
 
        let holding = {
           crypto: this.cryptoCode,
           currency: this.displayCurrency,
           amount: this.totalHolding || 0
       };
       // sets value to amount entered

       this.holdingsProvider.checkHolding(holding).subscribe((result) => {

            if(result.success){
                this.holdingsProvider.addHolding(holding);
                this.navCtrl.pop();
                // navctrl pops back out
            } 
        }, (err) => {   
 
            
 
        });
 
    }
 
}