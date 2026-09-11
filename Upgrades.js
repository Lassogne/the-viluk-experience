import {Bank} from './Bank.js'

export class Upgrading{
    
    #bank;

    constructor(){
        this.#bank = new Bank();
    }
    
    buyUpgrade(id){
    const upgrade = Upgrades.find(u => u.id === id);
        if (this.#bank.funds >= upgrade.cost) {
            this.#bank.subtract(upgrade.cost);
            document.getElementById("upgrade"+id).remove();
            console.log("Upgrade: "+id+", Bought.");
            upgrade.bought = true;
        } else {
            console.log("Not enough funds: "+this.#bank.funds+"/"+upgrade.cost);
        }
        document.getElementById("availableUpgrades").textContent = this.availableUpgrades;
    }
    async createButton(id){
        const upgrade = Upgrades.find(u => u.id === id);
        const template = await fetch('/HTML Templates/upgradeTemplate.html');
        const html = await template.text();

        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;

        const button = wrapper.firstElementChild;

        // Mapping section
        if(upgrade.effect == 0) {

        }

        button.id = "upgrade"+id;
        button.querySelector("#upgradeTitleID").textContent = upgrade.title;
        button.querySelector("#upgradeDescriptionID").textContent = upgrade.description;
        button.querySelector("#upgradeCostID").textContent = this.formatCost(upgrade.cost);
        button.querySelector("#upgradeEffectID").textContent = upgrade.effect;
        button.querySelector("#upgradeIconID").src = upgrade.icon;
        button.querySelector("#upgradeThemeID").src = upgrade.theme;

        button.addEventListener("click", () => this.buyUpgrade(upgrade.id));
        document.getElementById("ownedFunds").addEventListener("change",this.#bank, () => console.log("test"));

        document.getElementById("upgradeContainer").appendChild(button);
        
        document.getElementById("availableUpgrades").textContent = this.availableUpgrades;
    }
    formatCost(cost){
        if(cost < 1_000){ // Range: 0 - 999
            return cost;
        }
        if(cost < 1_000_000){ // Range: 1.000 - 999.999
            return (cost / 1_000).toFixed(3).replace(".", ".");
        }
        if(cost < 1_000_000_000){ // Range: 1 million - 999 million
            return (cost / 1_000_000).toFixed(3) + " million";
        }
        if(cost < 1_000_000_000_000){ // Range: 1 billion - 999 billion
            return (cost / 1_000_000_000).toFixed(3) + " billion";
        }
        if(cost < 1_000_000_000_000_000){ // Range: 1 trillion - 999 trillion
            return (cost / 1_000_000_000_000).toFixed(3) + " trillion";
        }
    }
    get availableUpgrades(){
        return document.getElementById("upgradeContainer").children.length;
    }
    get manualEfficiency(){
        return;
    }
    get autoEfficiency(){
        return;
    }
}

// id               = Index number
// bought           = If the upgrade has been bought or not
// created          = If the upgrade has been created or not
// visibleThreshold = When the upgrade should is shown

export const Upgrades = [
    {
        id: 0,
        bought: false,
        created: false,
        visibleThreshold: 0,
        title: 'Axe',
        icon: "Graphics/Upgrades/AluObject.svg",
        theme: "Graphics/Upgrades/Themes/Axe.svg",
        description: 'Unlocks the ability to cut wood',
        cost: 100,
        effect: 0
    },
    {
        id: 1,
        bought: false,
        created: false,
        visibleThreshold: 0,
        title: 'Pickaxe',
        icon: "Graphics/Upgrades/AluObject.svg",
        theme: "Graphics/Upgrades/Themes/Pickaxe.svg",
        cost: 100,
        description: 'Unlock the ability to mine stone',
        effect: 0
    },
    {
        id: 2,
        bought: false,
        created: false,
        visibleThreshold: 0,
        title: 'Hammer',
        icon: "Graphics/Upgrades/AluObject.svg",
        theme: "Graphics/Upgrades/Themes/Hammer.svg",
        cost: 100,
        description: 'Unlocks the ability to upgrade your buildings',
        effect: 0
    },
    {
        id: 3,
        bought: false,
        created: false,
        visibleThreshold: 1250,
        title: 'Conveyor Belt',        
        icon: "Graphics/Upgrades/GreenObject.svg",
        cost: 2500,
        description: 'Increases Production speed by',
        effect: 50
    },
    {
        id: 4,
        bought: false,
        created: false,
        visibleThreshold: 2500,
        title: '6 axis Robot',
        icon: "Graphics/Upgrades/BlueObject.svg",
        cost: 5000,
        description: 'Increases Production speed by',
        effect: 50
    },
    {
        id: 5,
        bought: false,
        created: false,
        visibleThreshold: 2500,
        title: 'Mark',
        icon: "Graphics/Upgrades/PurpleObject.svg",
        cost: 5000,
        description: 'Se Mark det virker!',
        effect: 50
    },
    {
        id: 6,
        bought: false,
        created: false,
        visibleThreshold: 5000,
        title: 'Super computer',
        icon: "Graphics/Upgrades/RedObject.svg",
        cost: 10000,
        description: 'Hacks FBI in no time',
        effect: 50
    },
    {
        id: 7,
        bought: false,
        created: false,
        visibleThreshold: 7500,
        title: 'Laser drill',
        icon: "Graphics/Upgrades/RainbowObject.svg",
        cost: 15000,
        description: 'Drills rock like butter',
        effect: 50
    }
]