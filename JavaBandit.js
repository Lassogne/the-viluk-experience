//---------------------------------------------------------------------------\\
//                                Factory                                    \\
//---------------------------------------------------------------------------\\

// Import of classes
import {Bank} from './Bank.js';
import {Materials} from './Materials.js';
import {MaterialStorage} from './MaterialStorage.js'
import {Upgrading} from './Upgrades.js';
import {Upgrades} from './Upgrades.js';

// Definitions
const storage = new MaterialStorage();
const upgrades = new Upgrading();
const bank = new Bank();

// Materials defined
const wood = new Materials(20,1);
document.getElementById("woodPrice").textContent = wood.price;
const stone = new Materials (300,5);
document.getElementById("stonePrice").textContent = stone.price;
const marble = new Materials (1000,50);
document.getElementById("marblePrice").textContent = marble.price;

function upgradeEffects() {
    setInterval(() => {
        for (let i = 0; i < (Upgrades.length); i++) {
            if (Upgrades[i].created && !Upgrades[i].bought) {
                if (bank.funds < Upgrades[i].cost) {
                    document.getElementById("upgrade"+i).querySelector(".upgradeCostText").style.color = "red";                
                    document.getElementById("upgrade"+i).style.opacity = "0.5";  
                    document.getElementById("upgrade"+i).style.cursor = "default";   
                } else {
                    document.getElementById("upgrade"+i).querySelector(".upgradeCostText").style.color = "#F6D76A";           
                    document.getElementById("upgrade"+i).style.opacity = "1";          
                    document.getElementById("upgrade"+i).style.cursor = "pointer";
            }
            }
        }
    }, 100)
}
upgradeEffects();

function showUpgrade() {
    setInterval(() => {
        for (let i = 0; i < (Upgrades.length); i++) {
            if (!Upgrades[i].created && (Upgrades[i].visibleThreshold <= bank.funds)) {
                upgrades.createButton(i);
                Upgrades[i].created = true;
            }
        }
    }, 100)
}
showUpgrade();

function upgradeStorage() {
    storage.upgradeStorage();
}

// Material handling
function collectWood() {
    if (!wood.collect()) return;
    document.getElementById("woodStorage").textContent = wood.storageUsed;    
}

function collectStone() {
    if (!stone.collect()) return;
    document.getElementById("stoneStorage").textContent = stone.storageUsed;    
}

function buyWood() {
    if (!wood.buy()) return;
    document.getElementById("woodStorage").textContent = wood.storageUsed;
}

function sellWood() {
    if(!wood.sell()) return;
    document.getElementById("woodStorage").textContent = wood.storageUsed;    
}

function sellStone() {
    if(!stone.sell()) return;
    document.getElementById("stoneStorage").textContent = stone.storageUsed;    
}

function buyStone() {
    if (!stone.buy()) return;
    document.getElementById("stoneStorage").textContent = stone.storageUsed;
}

function buyMarble() {
    if (!marble.buy()) return;
    document.getElementById("marbleStorage").textContent = marble.storageUsed;
}

function add(amount){
    bank.add(amount);
}

function subtract(amount){
    if (bank.funds >= amount) {
        bank.subtract(amount);
    }
}

// Export of functions to HTML
window.upgradeStorage = upgradeStorage;

window.buyWood = buyWood;
window.buyStone = buyStone;
window.buyMarble = buyMarble;

window.sellWood = sellWood;
window.sellStone = sellStone;

window.collectWood = collectWood;
window.collectStone = collectStone;

window.add = add;
window.subtract = subtract;