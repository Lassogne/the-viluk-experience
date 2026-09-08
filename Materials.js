import {MaterialStorage} from './MaterialStorage.js'
import {Bank} from './Bank.js'

export class Materials {
    
    #bank;
    #basePrice;
    #sellPrice;
    #totalAmount = 0;
    #storage;
    #itemAmount = 0;
    #unitSize = 1;

    constructor(basePrice, sellPrice) {
        this.#bank = new Bank();
        this.#storage = new MaterialStorage();
        this.#basePrice = basePrice;
        this.#sellPrice = sellPrice;

        this.#storage.addMaterial(this);        
    }

    buy(){
        if(this.#bank.funds < this.price) return false;
        if(this.#storage.storageAvaliable < this.#unitSize) return false;

        this.#bank.subtract(this.price);
        this.#itemAmount++;
        this.#totalAmount++;
        this.#storage.updateUI();
        
        return true;
    }
    collect() {
        if(this.#storage.storageAvaliable < this.#unitSize) return false;

        this.#itemAmount++;
        this.#totalAmount++;
        this.#storage.updateUI();
        
        return true;
    }
    sell() {
        if(this.#itemAmount < this.#unitSize) return false;
        
        this.#itemAmount--;
        this.#totalAmount--;
        this.#bank.add(this.#sellPrice);
        this.#storage.updateUI();

        return true;
    }
    get price(){return this.#basePrice}

    get storageUsed(){return this.#itemAmount * this.#unitSize;}

    get itemAmount(){return this.#itemAmount;}
}