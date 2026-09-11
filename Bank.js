export class Bank {
    
    #funds = 500;   // Starting funds

    constructor() {
        if(!!Bank.instance) {
            return Bank.instance;
        }
        Bank.instance = this;
        document.getElementById("ownedFunds").textContent = this.formattedFunds;
        return this;
    }

    add(amount) {
        this.#funds += amount;
        document.getElementById("ownedFunds").textContent = this.formattedFunds;
    }
    
    subtract(amount) {
        this.#funds -= amount;
        document.getElementById("ownedFunds").textContent = this.formattedFunds;
    }
    read() {
        return this.#funds;
    }
    get funds(){
        return this.#funds;
    }
    get formattedFunds(){
        if(this.#funds < 1_000){ // Range: 0 - 999
            return this.#funds;
        }
        if(this.#funds < 1_000_000){ // Range: 1.000 - 999.999
            return (this.#funds / 1_000).toFixed(3).replace(".", ".");
        }
        if(this.#funds < 1_000_000_000){ // Range: 1 million - 999 million
            return (this.#funds / 1_000_000).toFixed(3) + " million";
        }
        if(this.#funds < 1_000_000_000_000){ // Range: 1 billion - 999 billion
            return (this.#funds / 1_000_000_000).toFixed(3) + " billion";
        }
        if(this.#funds < 1_000_000_000_000_000){ // Range: 1 trillion - 999 trillion
            return (this.#funds / 1_000_000_000_000).toFixed(3) + " trillion";
        }
    } 
    
}