#! /usr/bin/env node
import inquirer from "inquirer";
// ------------------------------------Game Variables------------------------------------
let enemies = ["Zombie", "Skeleton", "Alien", "Dragon"];
let enemyMaxHealth = 80;
let enemyMaxDamagetoPlayer = 35;
// ---------------------------==------Player Variables----------------------------------
let playerMaxHealth = 100;
let playerMaxDamagetoEnemy = 50;
let playerHealthPotions = 3;
let healthPotionEnergy = 25;
let HealthPotionDropChances = 50;
// -----------------------------Use class to store player name---------------------------
class playerInfo {
    playerName;
    constructor(playerName) {
        this.playerName = playerName;
    }
}
// -----------------------------Use inquirer to store player name-----------------------
let playerData = await inquirer.prompt({
    type: "input",
    name: "info",
    message: "Enter Your Name: "
});
let storeName = new playerInfo(playerData.info);
// ----------------------------------Welcome Player-------------------------------------
console.log(`\n\t\tHey ${storeName.playerName}` + " Welcome to DeadZone! \n");
// ----------------------------------Countdown Start------------------------------------
// Array of countdown messages
let countDown = ["Get Ready", 3, 2, 1, "\nGo"];
// Function to print countdown messages with a delay
function delayCome(items, delayCome) {
    return new Promise((resolve) => {
        // Loop through each item in the countdown array
        for (let start = 0; start < countDown.length; start++) {
            //printing of each item with a delay
            setTimeout(() => {
                console.log(` ${countDown[start]}..`);
                // Check if the current item is the last one in the array
                if (start === items.length - 1) {
                    resolve();
                }
                ;
            }, start * delayCome);
        }
    });
}
delayCome(countDown, 700).then(async () => {
    // -----------------------------------Game Start----------------------------------------
    Game: while (true) {
        let enemiesHealth = Math.floor(Math.random() * enemyMaxHealth + 1);
        let randomEnemy = Math.floor(Math.random() * enemies.length);
        let enemy = enemies[randomEnemy];
        console.log(`\n# ${enemy} has been appeared #`);
        console.log(`\n${storeName.playerName} your health is: ${playerMaxHealth}`);
        console.log(`\n${enemy} health is: ${enemiesHealth}`);
        // ------------------------------------enemy appearred-----------------------------------
        while (enemiesHealth > 0) {
            // -----------------------------use inquirer to show choices ----------------------------   
            let choices = await inquirer.prompt({
                type: "list",
                name: "recieve",
                message: "Choice depends on you",
                choices: ["1. Attack", "2. Drink health potion", "3. Run.."],
            });
            //-------------------------------player choose attck --------------------------------------  
            if (choices.recieve === "1. Attack") {
                let playerAttack = Math.floor(Math.random() * playerMaxDamagetoEnemy + 1);
                let enemyAttack = Math.floor(Math.random() * enemyMaxDamagetoPlayer + 1);
                enemiesHealth -= playerAttack;
                playerMaxHealth -= enemyAttack;
                console.log(`\nYou strike the ${enemy} for ${playerAttack} Damage`);
                console.log(`\n${enemy} strike on you for ${enemyAttack} Damage`);
                console.log(`\n${storeName.playerName} your remaining health is: ${playerMaxHealth}`);
                console.log(`\n${enemy} remaining health is: ${enemiesHealth}`);
            }
            // --------------------------------player choose drink potion---------------------------------
            else if (choices.recieve === "2. Drink health potion") {
                if (playerHealthPotions > 0) {
                    playerMaxHealth += healthPotionEnergy;
                    playerHealthPotions--;
                    console.log(`\n${storeName.playerName} your health is increase by ${healthPotionEnergy}`);
                    console.log(`\n${storeName.playerName} you have now ${playerMaxHealth} health`);
                    console.log(`\n${storeName.playerName} you have now ${playerHealthPotions} potion left `);
                }
                else {
                    console.log(`\nYou have no health potion left, Defeat enemy for a chance to get health potion`);
                }
            }
            // -----------------------------------player choose run----------------------------------------
            else if (choices.recieve === "3. Run..") {
                console.log(`${storeName.playerName} you run away from ${enemy}`);
                continue Game;
            }
            // -----------------------------------player not survive----------------------------------------
            if (playerMaxHealth < 1) {
                console.log("\nyou are no longer to fight, Your health is low");
                break;
            }
            // -----------------------------------enemy not survive ----------------------------------------
            if (enemiesHealth < 1) {
                console.log(`\n${enemy} has been defeated And ${storeName.playerName} You Survive!`);
                // -----------------------------------Potion drop chance----------------------------------------
                let randomChance = Math.floor(Math.random() * 100 + 1);
                if (randomChance > HealthPotionDropChances) {
                    playerHealthPotions++;
                    console.log(`\n${enemy} has dropped a health potion`);
                    console.log(`\nYou have now ${playerHealthPotions} Health potion`);
                }
            }
        } //while loop 2
        // ----------------------------------Player not survice exit-------------------------------------
        if (playerMaxHealth < 1) {
            break;
        }
        // --------------------------------------continue or exit ---------------------------------------
        let userChoice = await inquirer.prompt({
            type: "list",
            name: "confirm",
            message: "What would you like to do next",
            choices: ["Continue..", "Exit.."],
        });
        // ---------------------------------------------Continue-----------------------------------------
        if (userChoice.confirm === "Continue..") {
            console.log("You Continue on your adventure ");
            continue Game;
        }
        // ----------------------------------------------Exit--------------------------------------------
        else if (userChoice.confirm === "Exit..") {
            console.log("You successfuly Exit");
            break;
        }
        ;
    } // while loop
});
