import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
 
interface Holding {
    crypto: string,
    currency: string,
    amount: number,
    value?: number
}
// interface with variables
 
@Injectable()
export class HoldingsProvider {
 
    public holdings: Holding[] = [];
    //array for holding
 
    constructor(private http: HttpClient, private storage: Storage) {
        //constructor calling httpclient and storage
    }
 
    addHolding(holding: Holding): void {
 
        this.holdings.push(holding);
        this.retrievePrices();
        this.recordHoldings();
    }
 
    removeHolding(holding): void {
 
        this.holdings.splice(this.holdings.indexOf(holding), 1);
        this.retrievePrices();
        this.recordHoldings();
    }
 
    recordHoldings(): void {
        this.storage.set('cryptoHoldings', this.holdings);
    }
    loadHoldings(): void {
 
        this.storage.get('cryptoHoldings').then(holdings => {
 
            if(holdings !== null){
                this.holdings = holdings;
                this.retrievePrices();
            }
        });
 
    }
 
    checkHolding(holding): Observable<any> {
        //check that combination exists
        return this.http.get('https://api.cryptonator.com/api/ticker/' + holding.crypto + '-' + holding.currency);
    }
 
    retrievePrices(refresher?): void {
        
        let requests = [];
 
        for(let holding of this.holdings){
 
            let request = this.http.get('https://api.cryptonator.com/api/ticker/' + holding.crypto + '-' + holding.currency);
            //sends request using cryptonator's api to get value of cryptocurrencies
            requests.push(request);
 
        }
 
        forkJoin(requests).subscribe(results => {
 //forkjoin https://www.learnrxjs.io/operators/combination/forkjoin.html
            results.forEach((result: any, index) => {
 
                this.holdings[index].value = result.ticker.price;
 
            });
 
            if(typeof(refresher) !== 'undefined'){
                refresher.complete();
            }
 
            this.recordHoldings();
 
        }, err => {
 
            if(typeof(refresher) !== 'undefined'){
                refresher.complete();
            }
 
        });
 
    }
 
}