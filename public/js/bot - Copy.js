document.getElementById('name_site').innerHTML = 'WAX LEGACY BOT v2.3';
document.getElementById('version_up').innerHTML = 'Update 2.3 : officeland > auto sleep@70% of success rate | ex: Junior 65% it sleep at 45.5%';

const {
    TaskTimer
} = tasktimer;
const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://api.wax.alohaeos.com', // https://api.wax.alohaeos.com https://wax.pink.gg https://api.waxsweden.org https://wax.blokcrafters.io https://api.wax.alohaeos.com https://wax.eosphere.io https://wax.eu.eosamsterdam.net https://chain.wax.io
    tryAutoLogin: true,
    waxSigningURL: "https://all-access.wax.io",
    waxAutoSigningURL: "https://api-idm.wax.io/v1/accounts/auto-accept/"
});

const fwToolsColor = {
    "Wood": "Sienna",
    "Food": "DodgerBlue",
    "Gold": "Gold"
};
const fwMembersColor = {
    "Bronze Member": "Khaki",
    "Silver Member": "Silver",
    "Gold Member": "Yellow"
};
const nftPandaColor = {
    "earth": "Sienna",
    "water": "DodgerBlue",
    "fire": "Crimson",
    "wind": "MediumSeaGreen"
};
const nftPandaWeapon = {
    "0": "Common",
    "1": "Uncommon",
    "2": "Rare",
    "3": "Epic",
    "4": "Legendary",
    "5": "Mythic"
};
const nftPandaFEED = 1000;
const fwRepair = 2;
const fwRecover = 46;
let toolconf;
let cropconf;
let mbconf;

const dropdownlistPandaFoodList = document.getElementById("pandaFoodList");
const dropdownlistPandaFoodUnit = document.getElementById("pandaFoodUnit");
const pandaFoodList = ["common", "uncommon", "rare", "epic", "legendary", "mythic"];
const pandaFoodPrice = [0.11, 0.22, 0.6, 1, 4, 12];
const pandaFoodUnit = [1, 5, 10, 20];
pandaFoodList.forEach(element => {
    let option = document.createElement("OPTION");
    option.innerHTML = element;
    option.value = element;
    dropdownlistPandaFoodList.options.add(option);
});

pandaFoodUnit.forEach(element => {
    let option = document.createElement("OPTION");
    option.innerHTML = element;
    option.value = element;
    dropdownlistPandaFoodUnit.options.add(option);
});
const officelandJoblist = {
    "intern": 2,
    "junior": 3,
    "senior": 4,
    "leader": 5,
    "manager": 6,
    "boss": 6
};
const officelandColor = {
    "intern": "Silver",
    "junior": "MediumSeaGreen",
    "senior": "Gold",
    "leader": "MediumOrchid",
    "manager": "OrangeRed",
    "boss": "DarkSlateBlue"
};
const officelandRarityRates = {
    "intern": 50,
    "junior": 60,
    "senior": 70,
    "leader": 85,
    "manager": 98,
    "boss": 100
};
const officelandSuccessRateSleep = 70;

async function login() {
    try {
        const userAccount = await wax.login();
        document.getElementById('updater').value = userAccount;
        await getCurrentMessage();
        document.title = userAccount;
        console.log("LOGIN SUCCESS!");
        toolconf = await getTableAll("farmersworld", "toolconfs", 100);
        cropconf = await getTableAll("farmersworld", "cropconf", 100);
        mbconf = await getTableAll("farmersworld", "mbsconf", 100);
        await getUsage();
        document.getElementById("waxthb").innerHTML = "₩";
    } catch (e) {
        document.getElementById('response').append(e.message);
    }
}

async function getUsage() {
    let get_account;
    try {
        get_account = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://api.waxsweden.org/v2/state/get_account?account=' + wax.userAccount))
            .then(response => response.json());
        get_account = JSON.parse(get_account.contents);
    } catch {
        get_account = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://api.wax.alohaeos.com/v2/state/get_account?account=' + wax.userAccount))
            .then(response => response.json());
        get_account = JSON.parse(get_account.contents);
    }
    const cpuUsage = Math.floor(100 * get_account.account.cpu_limit.used / get_account.account.cpu_limit.max);
    const waxInWallet = get_account.account.core_liquid_balance.split(" ")[0];
    let sInnerHTML = "<div class='progress' style='height: 25px; width: 75%; background-color: Silver;'><div class='badge d-inline bg-secondary text-white' style='font-size: medium;'>" + parseFloat(waxInWallet).toFixed(2) + " WAX</div>&nbsp;<div class='progress-bar' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='" + cpuUsage + "' style='width-max: 100%; width: " + cpuUsage * 0.75 + "%; background-color: rgb(0, 0, 205); font-size: medium;'><b>CPU: " + cpuUsage + "%</b></div></div>";
    document.getElementById("usage").innerHTML = sInnerHTML;
}

//////////////////////////////////GOTOFARMERSWORLD///////////////////////
async function Farmersworld_main() {
    if (!document.getElementById("fwCheck").checked) {
        return;
    }

    const fwRepair = parseFloat(document.getElementById('repair_set').value);
    const fwRecover = parseFloat(document.getElementById('recov_set').value);
    const fwRecover_value = parseFloat(document.getElementById('recov_set_value').value);
    //const fwfDepo_set = parseFloat(document.getElementById('fwf_set').value);
    //const fwgDepo_set = parseFloat(document.getElementById('fwg_set').value);
    const balance = await getTableRows("farmersworld", "accounts", wax.userAccount);
    const fee = await getTableRows("farmersworld", "config", "");
    document.getElementById('fee').innerHTML = fee.fee;

    let balanceGold = 0;
    let balanceFood = 0;
    let balanceWood = 0;
    balance.balances.forEach(item => {
        if (item.includes("GOLD"))
            balanceGold = item.split(" ")[0];
        else if (item.includes("FOOD"))
            balanceFood = item.split(" ")[0];
        else if (item.includes("WOOD"))
            balanceWood = item.split(" ")[0];
    });

    let fww_out = 0;
    let fwf_out = 0;
    let fwg_out = 0;
    get_tokens = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://api.waxsweden.org/v2/state/get_tokens?account=' + wax.userAccount))
        .then(response => response.json());
    get_tokens = (JSON.parse(get_tokens.contents)).tokens;

    get_tokens.forEach(item => {
        if (item.symbol.includes("FWW"))
            fww_out = item.amount.toFixed(4)
        else if (item.symbol.includes("FWF"))
            fwf_out = item.amount.toFixed(4)
        else if (item.symbol.includes("FWG"))
            fwg_out = item.amount.toFixed(4)
    });

    document.getElementById('fwoutgame').innerHTML = "<b>Out game : <img src='/js/FWWtoken.png' width='18'> <span id='fww_out'>" + fww_out + "</span> | <img src='/js/FWFtoken.png' width='18'> <span id='fwf_out'>" + fwf_out + "</span> | <img src='/js/FWGtoken.png' width='18'> <span id='fwg_out'>" + fwg_out + "</span></b>";
    document.getElementById('fwingame').innerHTML = "<b>Ingame : <img src='/js/FWW.png' width='20'></img> <span id='fww_in'>" + parseFloat(balanceWood).toFixed(4) + "</span> |&nbsp;<img src='/js/FWF.png' width='20'></img> <span id='fwf_in'>" + parseFloat(balanceFood).toFixed(4) + "</span> |&nbsp;<img src='/js/FWG.png' width='20'></img> <span id='fwg_in'>" + parseFloat(balanceGold).toFixed(4) + "</span></b>";

    let sInnerHTML = "";
    sInnerHTML += "<b><input type='button' onclick='re_energy(value)' class='btn btn-primary btn-sm' value='Energy: " + balance.energy + "/" + balance.max_energy + "'></b><br>";
    sInnerHTML += "<br>Tools<br>";

    sInnerHTML += await fwTools(balanceGold, balance);

    sInnerHTML += "<br>Member<br>";
    sInnerHTML += await fwMembers();
    sInnerHTML += "<br>FarmPlot<br>";
    sInnerHTML += await fwCrops();
    document.getElementById('resFarmersworld').innerHTML = sInnerHTML;

    if (balance.energy <= fwRecover) {
        let recover = balanceFood.split(".")[0] * 5;
        if (recover == 0) {
            console.log('FADE1 - Need more food..');
            document.getElementById('log').innerHTML = "FarmersWorld : กรุณาเติม FOOD เพิ่ม..";
            $.ajax({
                type: "POST",
                url: "/submit",
                data: {
                    detail: `FW => Need more 🐟\n ${balanceFood} remains!\n` +
                        `Energy ${balance.energy}/${balance.max_energy}`
                }
            });
            return;
        }

        if (recover < (fwRecover_value - balance.energy)) {
            console.log('FADE2 - Recovery.. please wait.');
            let config = {
                actions: [{
                    account: 'farmersworld',
                    name: 'recover',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        energy_recovered: recover
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`${recover.toFixed(0)} ENERGY, RECOVERY SUCCESS!` + " Please refill food more.");
                document.getElementById('log').innerHTML = "FarmersWorld : เติมพลังงานสำเร็จ! กรุณาเติม FOOD เพิ่มอีก..";
            } else {
                console.log(`${recover.toFixed(0)} ENERGY, RECOVERY FAILED! ${ret}`);
            }
        }
        if (recover >= (fwRecover_value - balance.energy)) {
            console.log('FADE3 - Recovery.. please wait.');
            recover = fwRecover_value - balance.energy;
            let config = {
                actions: [{
                    account: 'farmersworld',
                    name: 'recover',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        energy_recovered: recover
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`${recover.toFixed(0)} ENERGY, RECOVERY SUCCESS!`);
                document.getElementById('log').innerHTML = "FarmersWorld : เติมพลังงานสำเร็จ!";
            } else {
                console.log(`${recover.toFixed(0)} ENERGY, RECOVERY FAILED! ${ret}`);
            }
        }
    }
}

///////////////////////////////// GET TOKENS

async function getTokensPrices() {
    await getUsage();

    let prices = await fetch("https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=2300&convert_id=2809");
    prices = await prices.json();
    document.getElementById("waxthb").innerHTML = "&nbsp;₩: " + parseFloat(prices.data[2300].quote[2809].price).toFixed(2) + " &nbsp;";

    let BAM = await fetch("https://wax.alcor.exchange/api/markets/155").then(res => res.json());
    document.getElementById('pandaBalance').innerHTML = "<div class='d-inline-block w-100'>&nbsp;<div class='badge rounded-pill bg-light text-dark'><img src='/js/BAM.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;" + parseFloat(BAM.last_price).toFixed(4) + " WAX</div></div>";

    let Ocoin = await fetch("https://wax.alcor.exchange/api/markets/258").then(res => res.json());
    document.getElementById('officelandBalance').innerHTML = "<div class='d-inline-block w-100'>&nbsp;<div class='badge rounded-pill bg-light text-dark'><img src='/js/OCOIN.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;" + parseFloat(Ocoin.last_price).toFixed(4) + " WAX</div></div>";

    let FWW = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.alcor.exchange/api/markets/104/'))
        .then(response => response.json());
    FWW = JSON.parse(FWW.contents);

    let FWF = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.alcor.exchange/api/markets/105/'))
        .then(response => response.json());
    FWF = JSON.parse(FWF.contents);

    let FWG = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.alcor.exchange/api/markets/106/'))
        .then(response => response.json());
    FWG = JSON.parse(FWG.contents);

    document.getElementById('fwBalance').innerHTML = "<div class='d-inline-block w-100'>&nbsp;<div class='badge rounded-pill bg-light text-dark'><img src='/js/FWWtoken.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;<span id='fww'>" + parseFloat(FWW.last_price).toFixed(4) + "</span> WAX</div>&nbsp;<div class='badge rounded-pill bg-light text-dark'><img src='/js/FWFtoken.png' style='height: 15px;align-items: center;vertical-align: middle;'></img>&nbsp;<span id='fwf'>" + parseFloat(FWF.last_price).toFixed(4) + "</span> WAX</div>&nbsp;<div class='badge rounded-pill bg-light text-dark'><img src='/js/FWGtoken.png' style='height: 15px;align-items: center;vertical-align: middle;'></img>&nbsp;<span id='fwg'>" + parseFloat(FWG.last_price).toFixed(4) + "</span> WAX</div></div>";

}

async function fwMembers() {
    let sInnerHTML = "";
    const mbs = await getTableRows_byIndex("farmersworld", "mbs", wax.userAccount, '2', 'name');
    mbs.forEach(async element => {
        const mbName = mbconf.rows.find(elem => elem.template_id === element.template_id);

        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 130px; background-color: " + fwToolsColor[mbName.type] + ";'>" + mbName.name + "</div>&emsp;<div class='badge' style='width: 120px;'>&emsp;</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(element.next_availability - Date.now() / 1000) + "</div></div><br>";
        if (element.next_availability - Date.now() / 1000 < 0) {
            let config = {
                actions: [{
                    account: 'farmersworld',
                    name: 'mbsclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        asset_id: element.asset_id
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Id ${ element.asset_id}, HARVEST SUCCESS!`);
                document.getElementById('log').innerHTML = "FarmersWorld : เคลมเมมเบอร์สำเร็จ!";
                $.ajax({
                    type: "POST",
                    url: "/submit",
                    data: {
                        detail: `FW => Member Id ${element.asset_id},🪓 HARVEST SUCCESS!\n`
                    }
                });
            } else {
                console.log(`Id ${ element.asset_id}, HARVEST FAILED! ${ret}`);
            }
        }
    });
    return sInnerHTML;
}

async function fwCrops() {
    let sInnerHTML = "";
    const crops = await getTableRows_byIndex("farmersworld", "crops", wax.userAccount, '2', 'name');
    if (crops.length < 8) {
        const building = await getTableRows_byIndex("farmersworld", "buildings", wax.userAccount, '2', 'name');
        building.forEach(async element => {
            if (element.next_availability - Date.now() / 1000 < 0 && element.next_availability != 0) {
                let config = {
                    actions: [{
                        account: 'farmersworld',
                        name: 'bldclaim',
                        authorization: [{
                            actor: wax.userAccount,
                            permission: 'active',
                        }],
                        data: {
                            owner: wax.userAccount,
                            asset_id: element.asset_id
                        },
                    }]
                };
                let ret = await sign(config);
                if (ret == true) {
                    console.log(`Id ${element.asset_id}, BUILD SUCCESS!`);
                    document.getElementById('log').innerHTML = "FarmersWorld : ปลูกสร้างสำเร็จ! " + crops.length + "/8";
                } else {
                    console.log(`Id ${element.asset_id}, BUILD FAILED! ${ret}`);
                }
            }

            if (element.name == "Farm Plot" && element.slots_used < 8) {
                let seed = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?page=1&limit=1000&template_whitelist=298595&collection_name=farmersworld&owner=" + wax.userAccount).then(response => response.json());
                if (seed.data.length == 0) {
                    seed = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?page=1&limit=1000&template_whitelist=298596&collection_name=farmersworld&owner=" + wax.userAccount).then(response => response.json());
                }
                if (seed.data.length == 0) {
                    return;
                }
                let config = {
                    actions: [{
                        account: 'atomicassets',
                        name: 'transfer',
                        authorization: [{
                            actor: wax.userAccount,
                            permission: 'active',
                        }],
                        data: {
                            from: wax.userAccount,
                            to: "farmersworld",
                            asset_ids: [seed.data[0].asset_id],
                            memo: "stake"
                        },
                    }]
                };
                let ret = await sign(config);
                if (ret == true) {
                    console.log(`Id ${seed.data[0].asset_id}, STAKE CROPS SUCCESS!`);
                    document.getElementById('log').innerHTML = "FarmersWorld : ลงเมล็ดสำเร็จ!";
                } else {
                    console.log(`Id ${seed.data[0].asset_id}, STAKE CROPS FAILED! ${ret}`);
                }
            }
        });
    }

    crops.forEach(async element => {
        const cropName = cropconf.rows.find(elem => elem.template_id === element.template_id);
        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge bg-warning text-dark' style='width: 130px;'>" + cropName.name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + element.times_claimed + "/42</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(element.next_availability - Date.now() / 1000) + "</div></div><br>";

        if (element.next_availability - Date.now() / 1000 < 0) {
            let config = {
                actions: [{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: element.asset_id
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Id ${ element.asset_id}, HARVEST SUCCESS!`);
                document.getElementById('log').innerHTML = "FarmersWorld : รดน้ำสำเร็จ! " + element.times_claimed + "/42";
            } else {
                console.log(`Id ${ element.asset_id}, HARVEST FAILED! ${ret}`);
            }
        }
    });
    return sInnerHTML;
}

async function fwTools(balanceGold, balance) {
    let sInnerHTML = "";
    const tools = await getTableRows_byIndex("farmersworld", "tools", wax.userAccount, '2', 'name');
    tools.sort(function(a, b) {
        return a.template_id - b.template_id;
    });
    tools.forEach(async element => {
        const toolName = toolconf.rows.find(elem => elem.template_id === element.template_id);

        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 130px; background-color: " + fwToolsColor[toolName.type] + ";'>" + toolName.template_name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + element.current_durability + "/" + element.durability + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(element.next_availability - Date.now() / 1000) + "</div>&emsp;<font size='-1'><button type='submit' class='myButton' value='" + element.asset_id + "' onclick='re_pair(value);'>REPAIR</button></font></div><br>";

        if (element.next_availability - Date.now() / 1000 < 0) {
            let config = {
                actions: [{
                    account: 'farmersworld',
                    name: 'claim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        asset_id: element.asset_id
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Id ${ element.asset_id}, HARVEST SUCCESS!`);
                document.getElementById('log').innerHTML = "FarmersWorld : " + toolName.template_name + " เคลมสำเร็จ!";
                $.ajax({
                    type: "POST",
                    url: "/submit",
                    data: {
                        detail: `FW => Id ${element.asset_id},🪓 HARVEST SUCCESS!\n` +
                            `current_durability: ${element.current_durability}/${element.durability}\n` +
                            `Energy ${balance.energy}/${balance.max_energy}`
                    }
                });
            } else {
                console.log(`Id ${ element.asset_id}, HARVEST FAILED! ${ret}`);
            }
        }

        if (element.current_durability < fwRepair) {
            let goldNeed = (element.durability - element.current_durability) / 5;
            if (goldNeed > balanceGold.split(".")[0]) {
                if (fwg_out > fwgDepo_set) {
                    console.log('FWG OUT ALREADY DEPOSIT...');
                } else if (fwg_out < fwgDepo_set) {
                    console.log('FWG ALREADY BUY...');
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/submit",
                        data: {
                            detail: `FW => Need more 🎟️\n ${balanceGold} remains!\n` +
                                `current_durability: ${element.current_durability}/${element.durability}`
                        }
                    });
                }
                return;
            }

            let config = {
                actions: [{
                    account: 'farmersworld',
                    name: 'repair',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        asset_owner: wax.userAccount,
                        asset_id: element.asset_id
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Id ${ element.asset_id}, REPAIR SUCCESS!`);
                document.getElementById('log').innerHTML = "FarmersWorld : " + toolName.template_name + " ซ่อมอุปกรณ์สำเร็จ";
            } else {
                console.log(`Id ${ element.asset_id}, REPAIR FAILED! ${ret}`);
            }
        }
    });
    return sInnerHTML;
}

//////////////////////////// FARMERSWORLD ADD FUNCTION

async function deposit() {
    var inputVal1 = (parseFloat(document.getElementById("deposit").value)).toFixed(4);
    const inputVal = "[\"" + inputVal1 + " " + document.getElementById("de_tokens").value + "\"]";
    let config = {
        actions: [{
            account: 'farmerstoken',
            name: 'transfers',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                from: wax.userAccount,
                to: 'farmersworld',
                quantities: JSON.parse(inputVal),
                memo: 'deposit',
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`DEPOSIT ${inputVal1} ${document.getElementById("de_tokens").value} DONE!`);
        document.getElementById('log').innerHTML = "FarmersWorld : ฝาก " + inputVal1 + " " + document.getElementById("de_tokens").value + " สำเร็จ";
    } else {
        console.log(`DEPOSIT FAILED`);
    }
}

async function with_dr() {
    var inputVal1 = (parseFloat(document.getElementById("with_dr").value)).toFixed(4);
    const inputVal = "[\"" + inputVal1 + " " + document.getElementById("wi_tokens").value + "\"]";
    var fee_put = document.getElementById('fee').innerHTML;
    let config = {
        actions: [{
            account: 'farmersworld',
            name: 'withdraw',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                owner: wax.userAccount,
                quantities: JSON.parse(inputVal),
                fee: fee_put,
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`WITHDRAW ${inputVal1} ${document.getElementById("wi_tokens").value} DONE!`);
        document.getElementById('log').innerHTML = "FarmersWorld : ถอน " + inputVal + " " + document.getElementById("wi_tokens").value + " สำเร็จ";
    } else {
        console.log(`WITHDRAW FAILED`);
    }
}

async function sell() {
    var inputVal1 = (parseFloat(document.getElementById("sell").value)).toFixed(4);
    const inputVal = inputVal1 + " " + document.getElementById("se_tokens").value;
    let config = {
        actions: [{
            account: 'farmerstoken',
            name: 'transfer',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                from: wax.userAccount,
                to: 'alcordexmain',
                quantity: inputVal,
                memo: '0.00000000 WAX@eosio.token',
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`SELL ${inputVal1} ${document.getElementById("se_tokens").value} DONE!`);
        document.getElementById('log').innerHTML = "FarmersWorld : ขาย " + inputVal + " " + document.getElementById("se_tokens").value + " สำเร็จ";
    } else {
        console.log(`SELL FAILED`);
    }
}

async function buy() {
    var inputVal1 = (parseFloat(document.getElementById("buy").value)).toFixed(8);
    const inputVal = inputVal1 + " WAX";
    var inputTokens = "0.0000 " + document.getElementById("by_tokens").value + "@farmerstoken";
    let config = {
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                from: wax.userAccount,
                to: 'alcordexmain',
                quantity: inputVal,
                memo: inputTokens,
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`BUY ${inputVal1} WAX on ${document.getElementById("by_tokens").value} DONE!`);
        document.getElementById('log').innerHTML = "FarmersWorld : ซื้อ " + document.getElementById("by_tokens").value + " โดย " + inputVal + " สำเร็จ";
    } else {
        console.log(`BUY FAILED`);
    }
}

async function re_energy(value) {
    recove = ((value.split(" ")[1]).split("/")[1]) - ((value.split(" ")[1]).split("/")[0]);
    console.log('Recovery ' + recove + ' energy please wait..');
    let config = {
        actions: [{
            account: 'farmersworld',
            name: 'recover',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                owner: wax.userAccount,
                energy_recovered: recove,
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`RECOVERY ${recove} ENERGY DONE!`);
        document.getElementById('log').innerHTML = "FarmersWorld : บังคับเติมพลังงานสำเร็จ!";
    } else {
        console.log(`RECOVERY ENERGY FAILED`);
    }
}

async function re_pair(value) {
    console.log('Repair tool ' + value + ' please wait..');
    let config = {
        actions: [{
            account: 'farmersworld',
            name: 'repair',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                asset_owner: wax.userAccount,
                asset_id: value,
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`REPAIR TOOL ${value} DONE!`);
        document.getElementById('log').innerHTML = "FarmersWorld : บังคับซ่อมอุปกรณ์สำเร็จ!";
    } else {
        console.log(`REPAIR TOOL ${value} FAILED`);
    }
}

//////////////////////////// OTHER

async function sign(configTranscat) {
    if (!wax.api) {
        return document.getElementById('response').innerHTML = '* Login first *';
    }

    const updater = document.getElementById('updater').value;
    const message = document.getElementById('message').value;
    const fail = document.getElementById('fail').checked;

    try {
        const result = await wax.api.transact(configTranscat, {
            blocksBehind: 3,
            expireSeconds: 30
        });

        document.getElementById('response').innerText = JSON.stringify(result);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    } catch (e) {
        document.getElementById('response').innerText = e.message;
        return e.message;
    }
}

async function getTableRows_byIndex(code, tableName, bound, index, key_type) {
    if (typeof(code) != "string" ||
        typeof(bound) != "string" ||
        typeof(tableName) != "string" ||
        typeof(index) != "string" ||
        typeof(key_type) != "string") {
        return false;
    }
    let result;
    try {
        result = await wax.api.rpc.get_table_rows({
            json: true,
            code: code,
            scope: code,
            table: tableName,
            index_position: index,
            key_type: key_type,
            lower_bound: bound,
            upper_bound: bound,
            reverse: false,
        });
    } catch (e) {
        document.getElementById('response').innerHTML = e.message;
        console.log("ERROR FOR: " + code + ", " + tableName + ", " + bound);
    }
    return result.rows;
}

async function getTableRows(code, tableName, bound, limit = 1) {
    if (typeof(code) != "string" ||
        typeof(bound) != "string" ||
        typeof(tableName) != "string") {
        return false;
    }
    let result;
    try {
        result = await wax.api.rpc.get_table_rows({
            json: true,
            code: code,
            scope: code,
            table: tableName,
            lower_bound: bound,
            upper_bound: bound,
            limit: limit,
            reverse: false,
            show_payer: false
        });
    } catch (e) {
        document.getElementById('response').append(e.message);
        console.log("ERROR FOR: " + code + ", " + tableName + ", " + bound);
    }
    return result.rows[0];
}

async function getTableAll(code, tableName, limit = 100) {
    let result;
    try {
        result = await wax.api.rpc.get_table_rows({
            json: true,
            code: code,
            scope: code,
            table: tableName,
            lower_bound: "",
            upper_bound: "",
            limit: limit,
            reverse: false,
            show_payer: false
        });
    } catch (e) {
        document.getElementById('response').append(e.message);
        console.log("ERROR FOR: " + code + ", " + tableName);
    }
    return result;
}

//////////////////////////////////GOTONFTPANDA///////////////////////
async function getPanda() {

    if (!document.getElementById("pandaCheck").checked) {
        return;
    }

    let sInnerHTML = "";

    var call_panda = "https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=100&order=desc&sort=asset_id";
    //var call_panda = "https://atomic.hivebp.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=100&order=desc&sort=asset_id";
    //var call_panda = "https://atomic.3dkrender.com/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=100&order=desc&sort=asset_id";
    let jsonFood = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(call_panda)).then(response => response.json());
    let FoodID = JSON.parse(jsonFood.contents);

    //let jsonFood = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=200&order=desc&sort=asset_id");
    //let jsonFood = await fetch("https://atomic.3dkrender.com/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=200&order=desc&sort=asset_id");
    //let jsonFood = await fetch("https://atomic.hivebp.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=200&order=desc&sort=asset_id");
    //let FoodID = await jsonFood.json();
    sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge bg-success text-white' style='width: 150px;'>FOOD: " + Object.keys(FoodID.data).length + "</div></div>";

    let res = await getTableRows("nftpandawofg", "usersnew", wax.userAccount);
    if (!res) {
        console.log("GET PANDA ERROR");
        return;
    }

    for (let i = 0; i < res.max_slots; i++) {
        let ret = await getTableRows("nftpandawofg", 'nftsongamec', res.slots_count[i].toString());
        const namePanda = ret.name_pa.split("-")[1];

        if (ret.rarity == '0') {
            var rare_panda = 'COMMON';
        } else if (ret.rarity == '1') {
            var rare_panda = 'PROMO';
        } else if (ret.rarity == '2') {
            var rare_panda = 'UNCOMMON';
        } else if (ret.rarity == '3') {
            var rare_panda = 'RARE';
        } else if (ret.rarity == '4') {
            var rare_panda = 'EPIC';
        } else if (ret.rarity == '5') {
            var rare_panda = 'LEGENDARY';
        } else {
            var rare_panda = 'MYTHIC';
        };

        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 120px; background-color: " + nftPandaColor[ret.element] + ";'>" + namePanda + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + rare_panda + "</div>&emsp;";
        if (ret.weapon != "0") {
            let getWeapon = await getTableRows("nftpandawofg", 'nftweapons', ret.weapon);
            sInnerHTML += "<div class='badge text-white' style='width: 130px; background-color: " + nftPandaColor[getWeapon.element] + ";'><img src='/js/PngItem_2767388.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;" + nftPandaWeapon[getWeapon.rarity] + "</div>&emsp;";
        } else {
            sInnerHTML += "<div class='badge bg-secondary text-white' style='width: 130px;'>None</div>&emsp;";
        }

        sInnerHTML += "<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(ret.timer - Date.now() / 1000) + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + ret.energy / 100 + "/100</div></div><br>";
        if (ret.timer - Date.now() / 1000 < 0) {
            let config = {
                actions: [{
                    account: 'nftpandawofg',
                    name: 'printrand',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        username: wax.userAccount,
                        assoc_id: res.slots_count[i],
                        signing_value: Math.floor(Math.random() * 18446744073709551616)
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Id ${res.slots_count[i]}, HARVEST SUCCESS!`);
                document.getElementById('log').innerHTML = "PandaNFT : " + namePanda + " ผจญภัยสำเร็จ!";
            } else {
                console.log(`Id ${res.slots_count[i]}, HARVEST FAILED! ${ret}`);
            }
        }


        if (ret.energy < nftPandaFEED) {

            var call_panda = "https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=100&order=desc&sort=asset_id";
            //var call_panda = "https://atomic.hivebp.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=100&order=desc&sort=asset_id";
            //var call_panda = "https://atomic.3dkrender.com/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=100&order=desc&sort=asset_id";
            let jsonFood = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(call_panda)).then(response => response.json());
            let FoodID = JSON.parse(jsonFood.contents);

            //let jsonFood = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=100&order=desc&sort=asset_id");
            //let jsonFood = await fetch("https://atomic.hivebp.io/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=100&order=desc&sort=asset_id");
            //let jsonFood = await fetch("https://atomic.3dkrender.com/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=100&order=desc&sort=asset_id");
            //let FoodID = await jsonFood.json();
            console.log(FoodID.data[0].asset_id);
            let config = {
                actions: [{
                    account: 'atomicassets',
                    name: 'transfer',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        from: wax.userAccount,
                        to: "nftpandawofg",
                        asset_ids: [FoodID.data[0].asset_id],
                        memo: "eatpanda " + res.slots_count[i] + " " + FoodID.data[0].asset_id
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Id ${res.slots_count[i]}, FEED SUCCESS!`);
                document.getElementById('log').innerHTML = "PandaNFT : " + namePanda + " ให้อาหารสำเร็จ!";
            } else {
                console.log(`Id ${res.slots_count[i]}, FEED FAILED! ${ret}`);
            }
        }
    }
    document.getElementById('resnftPanda').innerHTML = sInnerHTML;
}

async function pandaBuyFood() {
    const foodRarity = dropdownlistPandaFoodList.options[dropdownlistPandaFoodList.selectedIndex].text;
    const foodAmount = dropdownlistPandaFoodUnit.options[dropdownlistPandaFoodUnit.selectedIndex].text;
    const foodPrice = pandaFoodPrice[dropdownlistPandaFoodList.selectedIndex];

    const _quantity = parseFloat(foodAmount * foodPrice).toFixed(4) + " BAM";
    const _memo = "buyeat " + foodRarity + " " + foodAmount + " ";

    let config = {
        actions: [{
            account: 'nftpandabamb',
            name: 'transfer',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                from: wax.userAccount,
                to: "nftpandawofg",
                quantity: _quantity,
                memo: _memo
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`BUY PANDA FOOD DONE!`);
        document.getElementById('log').innerHTML = "PandaNFT : ซื้ออาหารสำเร็จ!";
    } else {
        console.log(`BUY PANDA FOOD FAILED`);
    }
}
//////////////////////////////////GOTOOFFICELAND///////////////////////
async function Officeland_task() {
    let sInnerHTML = "";
    if (!document.getElementById("officelandCheck").checked) {
        return;
    }

    let officelandBalance = await getTableRows("officegameio", "balances", wax.userAccount);
    // document.getElementById('officelandBalance').innerHTML = officelandBalance.quantity;
    // document.getElementById('resofficeland').innerHTML = `Ocoin: ${Ocoin.last_price}<br>`;
    sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge bg-warning text-white' style='width: 180px;'>" + officelandBalance.quantity + "</div>&emsp;<div class='badge bg-primary text-white' style='width: 220px;'>SLEEP 70% of SUCCESS RATE</div></div>";

    let res = await getTableRows("officegameio", "publicspace", wax.userAccount);
    if (!res) {
        console.log("GET STAFF ERROR");
        return;
    }
    res = res.asset_ids.filter(x => x != 0);

    for (let i = 0; i < res.length; i++) {
        let ret = [];
        ret = await getTableRows_byIndex("officegameio", 'taskassign', res[i].toString(), "2", "i64");

        var call_office = "https://wax.api.atomicassets.io/atomicmarket/v1/assets/";
        //var call_office = "https://atomic.hivebp.io/atomicassets/v1/assets/";
        //var call_office = "https://atomic.3dkrender.com/atomicassets/v1/assets/";
        let template_id = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(call_office + res[i].toString())).then(response => response.json());
        template_id = JSON.parse(template_id.contents);

        //let template_id = await fetch("https://wax.api.atomicassets.io/atomicmarket/v1/assets/" + res[i].toString()).then(response => response.json());
        //let template_id = await fetch("https://atomic.hivebp.io/atomicassets/v1/assets/" + res[i].toString()).then(response => response.json());
        //let template_id = await fetch("https://atomic.3dkrender.com/atomicassets/v1/assets/" + res[i].toString()).then(response => response.json());
        const decreaseSR = await getTableRows_byIndex("officegameio", "assetsts", template_id.data.asset_id, "1", "i64");
        if (ret.length == 0) {
            const decreaseSR = await getTableRows_byIndex("officegameio", "assetsts", template_id.data.asset_id, "1", "i64");
            let jobNum = officelandJoblist[template_id.data.data.rarity];
            if (((officelandRarityRates[template_id.data.data.rarity] - decreaseSR[0].asset_data.decrease_sr) / officelandRarityRates[template_id.data.data.rarity]) * 100 < officelandSuccessRateSleep)
                jobNum = 7;
            let config = {
                actions: [{
                    account: 'officegameio',
                    name: 'assigntask',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        player: wax.userAccount,
                        task_id: jobNum,
                        asset_id: res[i].toString()
                    },
                }]
            };
            let ret_sign = await sign(config);
            if (ret_sign == true) {
                console.log(`Id ${res[i].toString()}, GO WORK SUCCESS!`);
                document.getElementById('log').innerHTML = "OfficeLand : ออกไปทำงานแล้ว!";
            } else {
                console.log(`Id ${res[i].toString()}, GO WORK FAILED! ${ret}`);
            }
            continue;
        }

        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 120px; background-color: " + officelandColor[template_id.data.data.rarity] + ";'>" + template_id.data.data.name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + parseFloat(officelandRarityRates[template_id.data.data.rarity] - decreaseSR[0].asset_data.decrease_sr).toFixed(2) + "%</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(ret[0].task_end - Date.now() / 1000) + "</div></div><br>";

        if (ret[0].task_end - Date.now() / 1000 < 0) {
            let config = {
                actions: [{
                    account: 'officegameio',
                    name: 'taskfinished',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        player: wax.userAccount,
                        taskassign_id: ret[0].taskassign_id.toString()
                    },
                }]
            };
            let ret_sign = await sign(config);
            if (ret_sign == true) {
                console.log(`Id ${res[i].toString()}, FINISHED TASK!`);
                document.getElementById('log').innerHTML = "OfficeLand : ทำงานสำเร็จแล้ว!";
            }
        }
    }

    res = await getTableRows("officegameio", 'waitclaims', wax.userAccount);
    res = res.claim_datas[0]
    if ((Date.now() / 1000 - res.finish_time) / 86400 > 5.01) {
        let config = {
            actions: [{
                account: 'officegameio',
                name: 'claim',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    player: wax.userAccount,
                    finish_id: res.finish_id.toString()
                },
            }]
        };
        let ret_sign = await sign(config);
        if (ret_sign == true) {
            console.log("Task Id " + res.finish_id + ", CLAIMED REWARD! " + (parseFloat(res.reward)).toFixed(4) + " OCOIN");
            document.getElementById('log').innerHTML = "OfficeLand : เคลม " + (parseFloat(res.reward)).toFixed(4) + " OCOIN สำเร็จ!";
        }
    }
    document.getElementById('resofficeland').innerHTML = sInnerHTML;
}

async function getCurrentMessage() {
    const res = await wax.rpc.get_table_rows({
        json: true,
        code: 'test.wax',
        scope: 'test.wax',
        table: 'messages',
        lower_bound: wax.userAccount,
        upper_bound: wax.userAccount,
    });

    const message = res.rows[0] ? res.rows[0].message : `<No message is set for ${wax.userAccount}>`;
    document.getElementById('current').textContent = message;
}

// --------------------------------------------Run at init---------------------------------------//
document.getElementById('message').value = Math.random().toString(36).substring(2);
login();

const count = 10;
const timerMain = new TaskTimer(1000);
timerMain.add([{
        id: 'FarmersWorld',
        tickInterval: 31,
        totalRuns: 0,
        callback(task) {
            Farmersworld_main();
        }
    },
    {
        id: 'nftPanda',
        tickInterval: 61,
        totalRuns: 0,
        callback(task) {
            getPanda();
        }
    },
    {
        id: 'officeland',
        tickInterval: 71,
        totalRuns: 0,
        callback(task) {
            Officeland_task();
        }
    },
    {
        id: 'tokenPrice',
        tickInterval: 121,
        totalRuns: 0,
        callback(task) {
            getTokensPrices();
        }
    }

]);
timerMain.start()

function sec2time(timeInSeconds) {
    var pad = function(num, size) {
            return ('000' + num).slice(size * -1);
        },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60),
        milliseconds = time.slice(-3);
    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}