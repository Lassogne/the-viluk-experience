import {Bank} from './Bank.js'

export class MaterialStorage{

    #bank;
    #upgradePrice = 100;
    #material;
    #level = 0;
    #maxStorage = 5;

    constructor(){
        if(!!MaterialStorage.instance){
            return MaterialStorage.instance;
        }
        MaterialStorage.instance = this;

        this.#material = [];
        this.#bank = new Bank();

        this.updateUI();
        return this;
    }

    addMaterial(material){
        this.#material.push(material);
        this.updateUI();
    }

    upgradeStorage(){
        if(this.#bank.funds < this.upgradePrice) return false;
        this.#bank.subtract(this.upgradePrice);
        this.#level ++;        
        this.updateUI();
    }

    get maxStorage(){
        if (this.#level == 0)
            return this.#maxStorage;
        else {
            return this.#level * 100;
        }
    }

    get storageUsed(){
        let storageUsed = 0;
        for (let i = 0; i < this.#material.length; i++){
            storageUsed += this.#material[i].storageUsed;
        }
        return storageUsed;
    }

    get storageAvaliable(){
        return this.maxStorage - this.storageUsed;
    }

    get upgradePrice(){
        if(this.#level == 0) {
            return this.#upgradePrice;
        } else { 
            return (this.#upgradePrice * this.#level) ** 2;
        }
    }

    updateUI(){
        document.getElementById("currentStorage").textContent = this.storageUsed;
        document.getElementById("maxStorage").textContent = this.maxStorage;
        document.getElementById("storageLevel").textContent = this.#level;
        document.getElementById("storagePrice").textContent = this.upgradePrice;
    }
}