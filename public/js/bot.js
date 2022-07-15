document.getElementById('name_site').innerHTML = "<img src='logo.png'>";
document.getElementById('version_up').innerHTML = "<b><font size='+2'>Update 2.6.1 : <a href='changelog.txt' target='_blank'>View more update here!</a></font></b>";

const {
    TaskTimer
} = tasktimer;

if(!localStorage.getItem('settings')){
var settings = {"endpoint":"http://api.waxsweden.org","fwrepair":"1","fwrecove":"60","fwat":"500","ofsleep":"60","line":"LINE TOKEN HERE","fwcheck":true,"fwcheck_crops":false,"fwcheck_coops":false,"fwcheck_crops_b":false,"fwcheck_coops_b":false,"fwcheck_cowshed_b":false,"auto_coins":"","acc_tran":"ex : user.wax","auto_coins1":"","pdcheck":true,"ofcheck":true};
} else {
	settings = JSON.parse(localStorage.getItem('settings'));
	console.log();
	document.getElementById('end_point').value = settings.endpoint;
	document.getElementById('repair_set').value = settings.fwrepair;
	document.getElementById('recov_set').value = settings.fwrecove;
	document.getElementById('recov_set_value').value = settings.fwat;
	document.getElementById('OfficeSleep').value = settings.ofsleep;
	document.getElementById('lineToken').value = settings.line;
	document.getElementById("fwCheck").checked = settings.fwcheck;
	document.getElementById("fwCrops").checked = settings.fwcheck_crops;
	document.getElementById("fwCoops").checked = settings.fwcheck_coops;
	document.getElementById("fwCrops_build").checked = settings.fwcheck_crops_b;
	document.getElementById("fwCoops_build").checked = settings.fwcheck_coops_b;
	document.getElementById("fwCowshed_build").checked = settings.fwcheck_cowshed_b;
	document.getElementById("fw_at_tran_in").value = settings.auto_coins;
	document.getElementById("fw_at_tran_in1").value = settings.auto_coins1;
	document.getElementById('tranfer_coins').value = settings.acc_tran;
	document.getElementById("pandaCheck").checked = settings.pdcheck;
	document.getElementById("officelandCheck").checked = settings.ofcheck;
}

async function save_setting() {
	var settings = {};
	settings.endpoint = document.getElementById('end_point').value;
	settings.fwrepair = document.getElementById('repair_set').value;
	settings.fwrecove = document.getElementById('recov_set').value;
	settings.fwat = document.getElementById('recov_set_value').value;
	settings.ofsleep = document.getElementById('OfficeSleep').value;
	settings.line = document.getElementById('lineToken').value;
	settings.fwcheck = document.getElementById("fwCheck").checked;
	settings.fwcheck_crops = document.getElementById("fwCrops").checked;
	settings.fwcheck_coops = document.getElementById("fwCoops").checked;
	settings.fwcheck_crops_b = document.getElementById("fwCrops_build").checked;
	settings.fwcheck_coops_b = document.getElementById("fwCoops_build").checked;
	settings.fwcheck_cowshed_b = document.getElementById("fwCowshed_build").checked;
	settings.auto_coins = document.getElementById('fw_at_tran_in').value;
	settings.auto_coins1 = document.getElementById('fw_at_tran_in1').value;
	settings.acc_tran = document.getElementById('tranfer_coins').value;
	settings.pdcheck = document.getElementById("pandaCheck").checked;
	settings.ofcheck = document.getElementById("officelandCheck").checked;
	console.log(settings);
	localStorage.setItem('settings',JSON.stringify(settings));
}

const api_atomic = ['https://wax.api.atomicassets.io', 'https://atomic.hivebp.io', 'https://atomic.3dkrender.com'];
var api_atomic_use = 'https://wax.api.atomicassets.io';

const wax = new waxjs.WaxJS({
    rpcEndpoint: settings.endpoint,
    tryAutoLogin: true,
    waxSigningURL: "https://all-access.wax.io",
    waxAutoSigningURL: "https://api-idm.wax.io/v1/accounts/auto-accept/"
});
// https://api.wax.alohaeos.com https://wax.pink.gg https://api.waxsweden.org https://wax.blokcrafters.io https://wax.eosphere.io https://wax.eu.eosamsterdam.net https://chain.wax.io https://wax.cryptolions.io https://wax.eosusa.news https://wax.dapplica.io https://api.wax.greeneosio.com //////// for call balances https://api.waxsweden.org https://wax.blokcrafters.io https://wax.eosphere.io https://wax.eosusa.news https://api.wax.greeneosio.com

const fwBuilding_conf = {
    "Cowshed": 12,
    "Coop": 8,
	"Farm Plot": 8
};
const fwBuilding_req = {
    "Cowshed": 300,
    "Coop": 250,
	"Farm Plot": 200
};
const fwToolsUse_food = {
    "Ancient Stone Axe": 4,
    "Stone Axe": 5,
	"Axe": 10,
	"Saw": 30,
	"Chainsaw": 60,
	"Fishing Rod": 0,
	"Fishing Net": 0,
	"Fishing Boat": 0,
    "Mining Excavator": 133
};
const fwToolsUse_gold = {
    "Ancient Stone Axe": 1,
    "Stone Axe": 3,
	"Axe": 5,
	"Saw": 15,
	"Chainsaw": 45,
	"Fishing Rod": 5,
	"Fishing Net": 20,
	"Fishing Boat": 32,
    "Mining Excavator": 5
};
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
const fwMembersStore = {
    "260628": [3600,"Wood"],
    "260629": [7200,"Wood"],
    "260631": [14400,"Wood"],
	"260635": [21600,"Wood"],
	"260636": [3600,"Food"],
	"260638": [7200,"Food"],
	"260639": [14400,"Food"],
	"260641": [21600,"Food"],
	"260642": [7200,"Gold"],
	"260644": [14400,"Gold"],
	"260647": [21600,"Gold"],
	"260648": [28800,"Gold"],
};
const fwFarmColor = {
    "Chicken Egg": "#F1C40F",
    "Chick": "#D4AC0D",
    "Chicken": "#B7950B",
	"Baby Calf": "#3498DB ",
	"Calf (FeMale)": "#2E86C1 ",
	"Calf (Male)": "#2E86C1 ",
	"Dairy Cow": "#2874A6 ",
	"Bull": "#2874A6 "
};
const fwFarmClaims = {
    "Chicken Egg": 9,
    "Chick": 16,
    "Chicken": 28,
	"Baby Calf": 6,
	"Calf (FeMale)": 16,
	"Calf (Male)": 16,
	"Dairy Cow": 6,
	"Bull": 0
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
const fwRepair = settings.fwrepair;
const fwRecover = settings.fwrecove;
const OfficeSleep = settings.ofsleep;
let toolconf;
let cropconf;
let mbconf;

const dropdownlistPandaFoodList = document.getElementById("pandaFoodList");
const dropdownlistPandaFoodUnit = document.getElementById("pandaFoodUnit");
const pandaFoodList = ["common", "uncommon", "rare", "epic", "legendary", "mythic"];
const pandaFoodPrice = [2800, 5600, 15000, 25000, 100000, 300000];
const pandaFoodUnit = [1, 5, 10, 20, 30, 50, 100];
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
const cofe = {
    "1": ["Latte","3.0000 OCOIN"],
    "2": ["Cappuccino","8.0000 OCOIN"],
	"3": ["Espresso","10.0000 OCOIN"],
	"4": ["Macchiato","12.0000 OCOIN"],
	"5": ["Affogato","15.0000 OCOIN"]
};
const officelandTemplate = {
    "342526": "intern","342534": "intern","343284": "intern","343289": "intern","343297": "intern","343304": "intern","344501": "intern","344509": "intern","344516": "intern","344528": "intern","342527": "junior","342535": "junior","343285": "junior","343291": "junior","343299": "junior","343306": "junior","344504": "junior","344510": "junior","344518": "junior","344529": "junior","342528": "senior","342542": "senior","343286": "senior","343293": "senior","343300": "senior","343307": "senior","344506": "senior","344511": "senior","344519": "senior","344531": "senior","342529": "leader","342547": "leader","343287": "leader","343294": "leader","343301": "leader","344483": "leader","344507": "leader","344513": "leader","344521": "leader","344532": "leader","342530": "manager","342552": "manager","343288": "manager","343296": "manager","343303": "manager","344491": "manager","344508": "manager","344515": "manager","344523": "manager","344533": "manager","390394": "boss",
};
const officelandName = {
    "342526": "Aaron","342534": "Albert","343284": "Alice","343289": "Damian","343297": "Ethan","343304": "Hanako","344501": "Kevin","344509": "Shiba","344516": "Sophie","344528": "Tomus","342527": "Aaron","342535": "Albert","343285": "Alice","343291": "Damian","343299": "Ethan","343306": "Hanako","344504": "Kevin","344510": "Shiba","344518": "Sophie","344529": "Tomus","342528": "Aaron","342542": "Albert","343286": "Alice","343293": "Damian","343300": "Ethan","343307": "Hanako","344506": "Kevin","344511": "Shiba","344519": "Sophie","344531": "Tomus","342529": "Aaron","342547": "Albert","343287": "Alice","343294": "Damian","343301": "Ethan","344483": "Hanako","344507": "Kevin","344513": "Shiba","344521": "Sophie","344532": "Tomus","342530": "Aaron","342552": "Albert","343288": "Alice","343296": "Damian","343303": "Ethan","344491": "Hanako","344508": "Kevin","344515": "Shiba","344523": "Sophie","344533": "Tomus","Smith": "boss",
};

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
		console.log(e.message);
		//if(e.message == 'Failed to fetch'){Change_RPC()};
    }
}

async function getUsage() {
    let get_account;
    try {
        get_account = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.eosusa.news/v2/state/get_account?account=' + wax.userAccount))
            .then(response => response.json());
        get_account = JSON.parse(get_account.contents);
    } catch {
        get_account = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.eosphere.io/v2/state/get_account?account=' + wax.userAccount))
            .then(response => response.json());
        get_account = JSON.parse(get_account.contents);
    }
	if (get_account == null) {
		try {
			get_account = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://api.waxsweden.org/v2/state/get_account?account=' + wax.userAccount))
				.then(response => response.json());
			get_account = JSON.parse(get_account.contents);
		} catch {
			get_account = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.blokcrafters.io/v2/state/get_account?account=' + wax.userAccount))
				.then(response => response.json());
			get_account = JSON.parse(get_account.contents);
		}
	}
    const cpuUsage = Math.floor(100 * get_account.account.cpu_limit.used / get_account.account.cpu_limit.max);
    const waxInWallet = get_account.account.core_liquid_balance.split(" ")[0];
    let sInnerHTML = "<div class='progress' style='height: 25px; width: 75%; background-color: Silver;'><div class='badge d-inline bg-secondary text-white' style='font-size: medium;'>" + parseFloat(waxInWallet).toFixed(2) + " WAX</div>&nbsp;<div class='progress-bar' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='" + cpuUsage + "' style='width-max: 100%; width: " + cpuUsage * 0.75 + "%; background-color: rgb(0, 0, 205); font-size: medium;'><b>CPU: " + cpuUsage + "%</b></div></div>";
    document.getElementById("usage").innerHTML = sInnerHTML;
}

var delayInMilliseconds = 10000;
setTimeout(function() {
	Farmersworld_main();
}, delayInMilliseconds);
var delayInMilliseconds = 15000;
setTimeout(function() {
	Officeland_task();
}, delayInMilliseconds);
var delayInMilliseconds = 20000;
setTimeout(function() {
	getPanda();
}, delayInMilliseconds);

//////////////////////////////////GOTOFARMERSWORLD///////////////////////
farm_coins = 0;
async function Farmersworld_main() {
    if (!document.getElementById("fwCheck").checked) {
        return;
    }

    const fwRepair = parseFloat(document.getElementById('repair_set').value);
    const fwRecover = parseFloat(document.getElementById('recov_set').value);
    const fwRecover_value = parseFloat(document.getElementById('recov_set_value').value);
    const balance = await getTableRows("farmersworld", "accounts", wax.userAccount);
    const fee = await getTableRows("farmersworld", "config", "");
	const mbfcoin = await getTableRows("farmersworld", "coinstake", wax.userAccount);
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
	//var get_tokens = "{tokens:[{symbol:FWW,amount:0},{symbol:FWF,amount:0},{symbol:FWG,amount:0}]}";
    //get_tokens = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://api.waxsweden.org/v2/state/get_tokens?account=' + wax.userAccount)).then(response => response.json());
    //get_tokens = (JSON.parse(get_tokens.contents)).tokens;
	//get_tokens = await fetch("https://api.waxsweden.org/v2/state/get_tokens?account="+ wax.userAccount)
	//get_tokens = get_tokens.tokens;
	
	//var url = "https://api.waxsweden.org/v2/state/get_tokens?account="+wax.userAccount;
	//var xhr = new XMLHttpRequest();
	//xhr.open("GET", url);
	//xhr.onreadystatechange = function () {
	//if (xhr.readyState === 4) {
	//	get_tokens = JSON.parse(xhr.responseText).tokens;
	//	console.log(get_tokens);
	//}};
	//xhr.send();
	
	//const get_tokens = {"tokens": [{"symbol": "FWW","amount": 0},{"symbol": "FWF","amount": 0},{"symbol": "FWG","amount": 0}]};
	let get_tokens;
	try{
			get_tokens = await fetch("https://api.waxsweden.org/v2/state/get_account?account="+wax.userAccount);
			get_tokens = await get_tokens.json();
	} catch{
			get_tokens = await fetch("https://wax.blokcrafters.io/v2/state/get_account?account="+wax.userAccount);
			get_tokens = await get_tokens.json();
	}
	
	if (get_tokens == null) {
		try{
			get_tokens = await fetch("https://wax.eosphere.io/v2/state/get_account?account="+wax.userAccount);
			get_tokens = await get_tokens.json();
		} catch{
			get_tokens = await fetch("https://wax.eosusa.news/v2/state/get_account?account="+wax.userAccount);
			get_tokens = await get_tokens.json();
		}
	}
	
	if (get_tokens == null) {
		try{
			get_tokens = await fetch("http://hyperion2.sentnl.io/v2/state/get_account?account="+wax.userAccount);
			get_tokens = await get_tokens.json();
		} catch{
			get_tokens = await fetch("http://wax.hivebp.io/v2/state/get_account?account="+wax.userAccount);
			get_tokens = await get_tokens.json();
		}
	}
	
	if (get_tokens == null) {
		try{
			get_tokens = await fetch("https://api.allorigins.win/get?url="+encodeURIComponent("https://api.wax.greeneosio.com/v2/state/get_account?account="+wax.userAccount)).then(response => response.json());
			get_tokens = JSON.parse(get_tokens.contents);
		} catch{
			console.log('API BLOCKED BY RPC!');
		}
	}
	//http://hyperion2.sentnl.io
	//http://wax.hivebp.io
	//http://apiwax.3dkrender.com
	//http://hyperion.tokengamer.io
	//http://hyperion-wax-mainnet.wecan.dev
	//http://wax.eosdublin.io
	//http://api.waxeastern.cn
	//http://api-wax.eosarabia.net
	
	get_tokens = get_tokens.tokens;
    get_tokens.forEach(item => {
        if (item.symbol.includes("FWW"))
            fww_out = item.amount.toFixed(4)
        else if (item.symbol.includes("FWF"))
            fwf_out = item.amount.toFixed(4)
        else if (item.symbol.includes("FWG"))
            fwg_out = item.amount.toFixed(4)
    });
	
	//document.getElementById('max_e').max = balance.max_energy;
	var input_e = document.getElementById("recov_set_value");
	input_e.setAttribute("max",balance.max_energy);
	//document.formName.max_e.setAttribute("max",balance.max_energy);
	let jsonfcoin = await fetch(api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=farmercoins&owner="+wax.userAccount+"&page=1&limit=1000&order=desc&sort=asset_id");
	let CoinsID = await jsonfcoin.json();
	//console.log(CoinsID);
	farm_coins = Object.keys(CoinsID.data).length;
    document.getElementById('fwoutgame').innerHTML = "<b>Out game : <img src='/js/FWWtoken.png' width='18'> <span id='fww_out'>" + fww_out + "</span> | <img src='/js/FWFtoken.png' width='18'> <span id='fwf_out'>" + fwf_out + "</span> | <img src='/js/FWGtoken.png' width='18'> <span id='fwg_out'>" + fwg_out + "</span></b>";
    document.getElementById('fwingame').innerHTML = "<b>Ingame : <img src='/js/FWW.png' width='20'></img> <span id='fww_in'>" + parseFloat(balanceWood).toFixed(4) + "</span> |&nbsp;<img src='/js/FWF.png' width='20'></img> <span id='fwf_in'>" + parseFloat(balanceFood).toFixed(4) + "</span> |&nbsp;<img src='/js/FWG.png' width='20'></img> <span id='fwg_in'>" + parseFloat(balanceGold).toFixed(4) + "</span> |&nbsp;<img src='js/fcoin.png' width='17'>&nbsp;"+farm_coins+", "+mbfcoin.amount+"</b>";
    let sInnerHTML = "";
    sInnerHTML += "<b><input type='button' onclick='re_energy(value)' class='btn btn-primary btn-sm' value='Energy: " + balance.energy + "/" + balance.max_energy + "'></b><br>";
    //sInnerHTML += "<br>Tools<br>";
    sInnerHTML += await fwTools(balance, balanceGold, balanceWood, balanceFood);
    //sInnerHTML += "<br>Member<br>";
    sInnerHTML += await fwMembers();
    //sInnerHTML += "<br>FarmPlot<br>";
    sInnerHTML += await fwCrops(balance);
	//sInnerHTML += "<br>Coops<br>";
    sInnerHTML += await fwCoops(balance);
	await fwCrops_build(balance);
	await fwCoops_build(balance);
	await fwCowshed_build(balance);
    document.getElementById('resFarmersworld').innerHTML = sInnerHTML;

    if (balance.energy <= fwRecover) {
        let recover = balanceFood.split(".")[0] * 5;
        if (recover == 0) {
            console.log('FADE1 - Need more food..');
            document.getElementById('log_other').innerHTML += "\nFarmersWorld : กรุณาเติมพลังงานเพิ่ม..";
            //$.ajax({
            //    type: "POST",
            //    url: "/submit",
            //    data: {
			//		token: $("#lineToken").val(),
            //        detail: `USER : ${wax.userAccount} | Farmersworld\n` +
			//				`Need more 🐟\n ${balanceFood} remains!\n` +
			//				`Energy ${balance.energy}/${balance.max_energy}`
            //    }
            //});
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
                console.log(`Farmersworld : ${recover.toFixed(0)} ENERGY, RECOVERY SUCCESS!` + " Please refill food more.");
                document.getElementById('log_other').innerHTML += "\nFarmersWorld : เติมพลังงานเท่าที่มีสำเร็จ! กรุณาเติมพลังงานเพิ่มอีก..";
            } else {
                console.log(`Farmersworld : ${recover.toFixed(0)} ENERGY, RECOVERY FAILED! ${ret}`);
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
                console.log(`Farmersworld : ${recover.toFixed(0)} ENERGY, RECOVERY SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersWorld : เติมพลังงานสำเร็จ!";
            } else {
                console.log(`Farmersworld : ${recover.toFixed(0)} ENERGY, RECOVERY FAILED! ${ret}`);
            }
        }
    }
	///// โอนเหรียญฟาร์มออโต้
	if(document.getElementById("fw_at_tran_in").value != '' && farm_coins >= document.getElementById("fw_at_tran_in").value){
		tranfer_coins();
	}
	///// ถอนเหรียญฟาร์มออโต้
	if(document.getElementById("fw_at_tran_in1").value != '' && mbfcoin.amount >= document.getElementById("fw_at_tran_in1").value){
		withdraw_coins(mbfcoin);
	}
}

///////////////////////////////// GET TOKENS

async function getTokensPrices() {
    await getUsage();

    let prices = await fetch("https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=2300&convert_id=2809");
    prices = await prices.json();
    document.getElementById("waxthb").innerHTML = "&nbsp;₩: " + parseFloat(prices.data[2300].quote[2809].price).toFixed(2) + " &nbsp;";

    let BAM = await fetch("https://wax.alcor.exchange/api/markets/155").then(res => res.json());
    document.getElementById('pandaBalance').innerHTML = "<div class='d-inline-block w-100'>&nbsp;<div class='badge rounded-pill bg-dark text-light'><img src='/js/BAM.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;" + parseFloat(BAM.last_price).toFixed(4) + " WAX</div></div>";

    let Ocoin = await fetch("https://wax.alcor.exchange/api/markets/258").then(res => res.json());
    document.getElementById('officelandBalance').innerHTML = "<div class='d-inline-block w-100'>&nbsp;<div class='badge rounded-pill bg-dark text-light'><img src='/js/OCOIN.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;" + parseFloat(Ocoin.last_price).toFixed(4) + " WAX</div></div>";

    let FWW = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.alcor.exchange/api/markets/104/'))
        .then(response => response.json());
    FWW = JSON.parse(FWW.contents);

    let FWF = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.alcor.exchange/api/markets/105/'))
        .then(response => response.json());
    FWF = JSON.parse(FWF.contents);

    let FWG = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent('https://wax.alcor.exchange/api/markets/106/'))
        .then(response => response.json());
    FWG = JSON.parse(FWG.contents);

    document.getElementById('fwBalance').innerHTML = "<div class='d-inline-block w-100'>&nbsp;<div class='badge rounded-pill bg-dark text-light'><img src='/js/FWWtoken.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;<span id='fww'>" + parseFloat(FWW.last_price).toFixed(4) + "</span> WAX</div>&nbsp;<div class='badge rounded-pill bg-dark text-light'><img src='/js/FWFtoken.png' style='height: 15px;align-items: center;vertical-align: middle;'></img>&nbsp;<span id='fwf'>" + parseFloat(FWF.last_price).toFixed(4) + "</span> WAX</div>&nbsp;<div class='badge rounded-pill bg-dark text-light'><img src='/js/FWGtoken.png' style='height: 15px;align-items: center;vertical-align: middle;'></img>&nbsp;<span id='fwg'>" + parseFloat(FWG.last_price).toFixed(4) + "</span> WAX</div></div>";

}

//var mbName = null;
async function fwMembers() {
    let sInnerHTML = "";
    const mbs = await getTableRows_byIndex("farmersworld", "mbs", wax.userAccount, '2', 'name');
	if (mbs != '') {
		sInnerHTML += "<br>MEMBERS";
	}
	//sInnerHTML += "&nbsp;&nbsp;<div class='badge rounded-pill bg-dark text-light'><b><img src='js/fcoin.png' width='17'>&nbsp;&nbsp;"+farm_coins+"<b></div><br>";
	//console.log(jsonfcoin);
	//console.log(jsonfcoin.ok+' pure');
	//console.log(CoinsID);
	//console.log(CoinsID.success+' json');
	//if(jsonfcoin.length != 0){
	//	if (api_atomic_use == api_atomic[0]){
	//		api_atomic_use = api_atomic[1];
	//		console.log('Change API Atomic to '+api_atomic_use);
	//	} else if (api_atomic_use == api_atomic[1]){
	//		api_atomic_use = api_atomic[2];
	//		console.log('Change API Atomic to '+api_atomic_use);
	//	} else {
	//		api_atomic_use = api_atomic[0];
	//		console.log('Change API Atomic to '+api_atomic_use);
	//	}
	//}
	
    mbs.forEach(async element => {
        const mbName = mbconf.rows.find(elem => elem.template_id === element.template_id);
		fwTools(mbName);
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
                console.log(`Farmersworld : Member Id ${ element.asset_id}, HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersWorld : เคลมเมมเบอร์สำเร็จ!";
                //$.ajax({
                //    type: "POST",
                //    url: "/submit",
                //    data: {
                //        detail: `USER : ${wax.userAccount} | Farmersworld\n` +
				//				`Member Id ${element.asset_id},🪓 HARVEST SUCCESS!\n`
                //    }
                //});
            } else {
                console.log(`Farmersworld : Member Id ${ element.asset_id}, HARVEST FAILED! ${ret}`);
				document.getElementById('log_other').innerHTML += "\nFarmersWorld : เคลมเมมเบอร์ไม่สำเร็จ! กรุณาเติมพลังงาน หรือ CPU ของท่านไม่พอ";
            }
        }
    });
    return sInnerHTML;
}

async function fwTools(balance, balanceGold, balanceWood, balanceFood) {
    let sInnerHTML = "";
    const tools = await getTableRows_byIndex("farmersworld", "tools", wax.userAccount, '2', 'name');
	if (tools != '') {
		sInnerHTML += "<br>TOOLS<br>";
	}
    tools.sort(function(a, b) {
        return a.template_id - b.template_id;
    });
	const mbs = await getTableRows_byIndex("farmersworld", "mbs", wax.userAccount, '2', 'name');//"ukahi.wam"
	//console.log(mbs.length);
	mb_wood_count = 0;
	mb_food_count = 0;
	mb_gold_count = 0;
	if (mbs.length != 0) {
	mbs.forEach(async mb_count => {
	    //console.log(mb_count);
	    if (mb_count.type == 'Wood') {mb_wood_count += fwMembersStore[mb_count.template_id][0]}
	    if (mb_count.type == 'Food') {mb_food_count += fwMembersStore[mb_count.template_id][0]}
	    if (mb_count.type == 'Gold') {mb_gold_count += fwMembersStore[mb_count.template_id][0]}
	})}
	
	//console.log(tools);
	//console.log(balance.energy);

	//console.log(mb_wood_count);
	//console.log(mb_food_count);
	//console.log(mb_gold_count);
    tools.forEach(async element => {
        const toolName = toolconf.rows.find(elem => elem.template_id === element.template_id);
		
		if(toolName.type == 'Wood'){time_plus = mb_wood_count};
		if(toolName.type == 'Food'){time_plus = mb_food_count};
		if(toolName.type == 'Gold'){time_plus = mb_gold_count};

        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 130px; background-color: " + fwToolsColor[toolName.type] + ";'>" + toolName.template_name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + element.current_durability + "/" + element.durability + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(element.next_availability+time_plus - Date.now() / 1000) + "</div>&emsp;<font size='-1'><button type='submit' class='btn-css' value='" + element.asset_id + "' onclick='re_pair(value);'>REPAIR</button></font></div><br>";

        if (element.next_availability+time_plus - Date.now() / 1000 < 0 && balance.energy >= fwToolsUse_food[toolName.template_name] && element.current_durability >= fwToolsUse_gold[toolName.template_name]) {
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
				const log_claim = await JSON.parse(document.getElementById('response').innerText).processed.action_traces[0].inline_traces[1].act.data.rewards;
				let fade_r = '';
				for (let i = 0; i < log_claim.length; i++) {fade_r += log_claim[i].split(" ")[0]+", ";}
				fade_r = await fade_r.slice(0,-2)+" "+log_claim[0].split(" ")[1];
				
				const log_bonus = await JSON.parse(document.getElementById('response').innerText).processed.action_traces[0].inline_traces[0].act.data.bonus_rewards;
				let fade_b = '';
				for (let i = 0; i < log_bonus.length; i++) {fade_b += log_bonus[i].split(" ")[0]+", ";}
				fade_b = await fade_b.slice(0,-2)+" "+log_bonus[0].split(" ")[1];
				
                console.log(`Farmersworld : Tool Id ${element.asset_id}, HARVEST SUCCESS!`);
                //document.getElementById('log').innerHTML = "FarmersWorld : " + toolName.template_name + " เคลมสำเร็จ! [REWARD "+fade_r+"], [BONUS "+fade_b+"]";
				document.getElementById('log_farm').innerHTML += "\n"+timeformat()+" >> "+toolName.template_name+" [REWARD : "+fade_r+"], BONUS : ["+fade_b+"]";
                if ($("#lineToken").val() != '') {
				$.ajax({
                    type: "POST",
                    url: "/submit",
                    data: {
						token: $("#lineToken").val(),
                        detail: `${wax.userAccount} | Farmersworld\n` +
								`𝙏𝙊𝙊𝙇𝙎: ${toolName.template_name},🪓\n` +
								`𝙍𝙀𝙒𝘼𝙍𝘿: ${fade_r}\n` +
								`𝘽𝙊𝙉𝙐𝙎: ${fade_b}\n` +
								`\n` +
								`🪵: ${balanceWood}\n` +
								`🍗: ${balanceFood}\n` +
								`🏅: ${balanceGold}`
								//`Durability: ${element.current_durability}/${element.durability}\n` +
								//`Energy ${balance.energy}/${balance.max_energy}`
                    }
                });
				}
            } else {
                console.log(`Farmersworld : Tool Id ${ element.asset_id}, HARVEST FAILED! ${ret}`);
				document.getElementById('log_other').innerHTML += "\nFarmersWorld : ไม่สามารถเคลมอุปกรณ์ " + toolName.template_name + "ได้เนื่องจาก CPU ไม่เพียงพอ!";
            }
        }

        if (element.current_durability < fwRepair) {
            let goldNeed = (element.durability - element.current_durability) / 5;
            if (goldNeed > balanceGold) {
                if (fwg_out > fwgDepo_set) {
                    console.log('FWG OUT ALREADY DEPOSIT...');
                } else if (fwg_out < fwgDepo_set) {
                    console.log('FWG ALREADY BUY...');
                } else {
                    //$.ajax({
                    //    type: "POST",
                    //    url: "/submit",
                    //    data: {
                    //        detail: `USER : ${wax.userAccount} | Farmersworld\n` +
					//				`Need more 🎟️\n ${balanceGold} remains!\n` +
					//				`Durability: ${element.current_durability}/${element.durability}`
                    //    }
                    //});
                }
                return;
            } else if (goldNeed <= balanceGold) {
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
					console.log(`Farmersworld : Tool Id ${ element.asset_id}, REPAIR SUCCESS!`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + toolName.template_name + " ซ่อมอุปกรณ์สำเร็จ";
				} else {
					console.log(`Id ${ element.asset_id}, REPAIR FAILED! ${ret}`);
				}
			} else {console.log('Farmersworld : ERROR REPAIR')};
        }
    });
    return sInnerHTML;
}

async function fwCrops(balance) {
	
	if (!document.getElementById("fwCrops").checked) {
		let sInnerHTML = ""
        return sInnerHTML;
    }
	
    let sInnerHTML = "";
    const crops = await getTableRows_byIndex("farmersworld", "crops", wax.userAccount, '2', 'name');
	if (crops != '') {
		sInnerHTML += "<br>CROPS<br>";
	}
    if (crops.length < 8) {
        const building = await getTableRows_byIndex("farmersworld", "buildings", wax.userAccount, '2', 'name');
        building.forEach(async element => {
            if (element.name == "Farm Plot" && element.slots_used < 8) {
                let seed = await fetch(api_atomic_use+"/atomicassets/v1/assets?page=1&limit=8&template_whitelist=298595&collection_name=farmersworld&owner=" + wax.userAccount).then(response => response.json());
                if (seed.data.length == 0) {
                    seed = await fetch(api_atomic_use+"/atomicassets/v1/assets?page=1&limit=8&template_whitelist=298596&collection_name=farmersworld&owner=" + wax.userAccount).then(response => response.json());
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
                    console.log(`Farmersworld : Seed Id ${seed.data[0].asset_id}, STAKE CROPS SUCCESS!`);
                    document.getElementById('log_other').innerHTML += "\nFarmersWorld : ลงเมล็ดสำเร็จ!";
                } else {
                    console.log(`Farmersworld : Seed Id ${seed.data[0].asset_id}, STAKE CROPS FAILED! ${ret}`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : ลงเมล็ดไม่สำเร็จ! หรือ CPU ของท่านไม่พอ";
                }
            }
        });
    }

    crops.forEach(async element => {
        const cropName = cropconf.rows.find(elem => elem.template_id === element.template_id);
        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge bg-warning text-dark' style='width: 130px;'>" + cropName.name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + element.times_claimed + "/42</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(element.next_availability - Date.now() / 1000) + "</div></div><br>";

        if (element.next_availability - Date.now() / 1000 < 0 && element.times_claimed == 41) {
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
                console.log(`Farmersworld : Seed Id ${ element.asset_id}, HARVEST SUCCESS!`);
				if(element.times_claimed == 41){document.getElementById('log_other').innerHTML += "\nFarmersWorld : การปลูกเสร็จสิ้น เก็บเกี่ยวผลผลิตฟาร์มสำเร็จ!"}else{
                document.getElementById('log_other').innerHTML += "\nFarmersWorld : รดน้ำสำเร็จ! " + (element.times_claimed+1) + "/42"}
            } else {
                console.log(`Farmersworld : Seed Id ${ element.asset_id}, HARVEST FAILED! ${ret}`);
				document.getElementById('log_other').innerHTML += "\nFarmersWorld : รดน้ำไม่สำเร็จ! " + element.times_claimed + "/42 กรุณาเติมพลังงาน หรือ CPU ของท่านไม่พอ";
            }
        }
    });
	//console.log(crops);
	f_crop_id = '';
	f_crop_count = 0;
	f_ener = 0;
	for (let i = 0; i < crops.length; i++) {
		if (crops[i] != 0 && crops[i].times_claimed < 41) {
			if (crops[i].next_availability < Date.now()/1000) {
				//console.log(crops[i].asset_id);
				f_crop_count = f_crop_count+1;
				f_crop_id += crops[i].asset_id+',';
				if(crops[i].name == 'Barley Seed'){f_ener = f_ener+30};
				if(crops[i].name == 'Corn Seed'){f_ener = f_ener+45};
			}
		}
	}
	f_crop_id = JSON.parse('['+f_crop_id.slice(0,-1)+']');
	//console.log(f_crop_id);
	//console.log(f_crop_count);
	//console.log(balance.energy);
	//console.log(f_ener);
	
	if (f_crop_id.length != 0) {
		if(balance.energy >= f_ener){
		if(f_crop_id.length == 1){
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
                        crop_id: f_crop_id[0]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
		if(f_crop_id.length == 2){
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
                        crop_id: f_crop_id[0]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[1]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
		if(f_crop_id.length == 3){
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
                        crop_id: f_crop_id[0]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[1]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[2]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
		if(f_crop_id.length == 4){
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
                        crop_id: f_crop_id[0]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[1]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[2]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[3]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
		if(f_crop_id.length == 5){
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
                        crop_id: f_crop_id[0]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[1]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[2]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[3]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[4]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
		if(f_crop_id.length == 6){
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
                        crop_id: f_crop_id[0]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[1]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[2]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[3]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[4]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[5]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
		if(f_crop_id.length == 7){
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
                        crop_id: f_crop_id[0]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[1]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[2]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[3]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[4]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[5]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[6]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
		if(f_crop_id.length == 8){
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
                        crop_id: f_crop_id[0]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[1]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[2]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[3]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[4]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[5]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[6]
                    },
                },{
                    account: 'farmersworld',
                    name: 'cropclaim',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        owner: wax.userAccount,
                        crop_id: f_crop_id[7]
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`Farmersworld : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nFarmersworld : รดน้ำสำเร็จ!";
            } else {
                console.log(`Farmersworld : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
		}
	} else {
		console.log(`Farmersworld : NOT ENOUGH ENERGY!`);
		document.getElementById('log_other').innerHTML += "\nFarmersworld : พลังงานไม่เพียงพอต่อการรดน้ำ!";
	}
	}
    return sInnerHTML;
}

async function fwCoops(balance) {
	
	if (!document.getElementById("fwCoops").checked) {
        let sInnerHTML = ""
        return sInnerHTML;
    }
	
	let sInnerHTML = "";
	const animals = await getTableRows_byIndex("farmersworld", "animals", wax.userAccount, '2', 'name');
	if (animals != '') {
		sInnerHTML += "<br>COOPS<br>";
	}
	animals.forEach(async coops => {
		if (coops.name == 'Chicken Egg' && coops != ''){
			if (coops.day_claims_at.length == 3 && (Date.now()/1000 - 86400) < coops.day_claims_at[0]) {
				wait_claim = sec2time((coops.day_claims_at[0]+86400) - (Date.now()/1000));
			} else {
				wait_claim = sec2time(coops.next_availability - Date.now()/1000);
			}
			sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 130px; background-color: " + fwFarmColor[coops.name] + ";'>" + coops.name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + coops.times_claimed + "/" + fwFarmClaims[coops.name] + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + wait_claim + "</div></div><br>";
			//console.log(coops.day_claims_at.length);
			if (balance.energy >= 5 && coops.day_claims_at.length == 3 && (coops.day_claims_at[0]+86400)-Date.now()/1000 < 0){
				
				let config = {
					actions: [{
						account: 'farmersworld',
						name: 'anmclaim',
						authorization: [{
							actor: wax.userAccount,
							permission: 'active',
						}],
						data: {
                        owner: wax.userAccount,
                        animal_id: coops.asset_id
						},
					}]
				};
				let ret = await sign(config);
				if (ret == true) {
					console.log(`Farmersworld : Animal Id ${coops.asset_id}, Hatch SUCCESS!`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ฟักไข่ "+(parseInt(coops.times_claimed)+1)+"/"+fwFarmClaims[coops.name]+" สำเร็จ";
				} else {
					console.log(`Farmersworld : Animal Id ${coops.asset_id}, Hatch FAILED! ${ret}`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ฟักไข่ไม่สำเร็จ เนื่องจาก CPU ไม่เพียงพอ!";
				}
			} else if (coops.next_availability - Date.now() / 1000 < 0 && balance.energy >= 5 && coops.day_claims_at.length < 3){
				let config = {
					actions: [{
						account: 'farmersworld',
						name: 'anmclaim',
						authorization: [{
							actor: wax.userAccount,
							permission: 'active',
						}],
						data: {
                        owner: wax.userAccount,
                        animal_id: coops.asset_id
						},
					}]
				};
				let ret = await sign(config);
				if (ret == true) {
					console.log(`Farmersworld : Animal Id ${coops.asset_id}, Hatch SUCCESS!`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ฟักไข่ "+(parseInt(coops.times_claimed)+1)+"/"+fwFarmClaims[coops.name]+" สำเร็จ";
				} else {
					console.log(`Farmersworld : Animal Id ${coops.asset_id}, Hatch FAILED! ${ret}`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ฟักไข่ไม่สำเร็จ เนื่องจาก CPU ไม่เพียงพอ!";
				}
			}
		}
		
		if (coops.name == 'Chick' && coops != ''){
			if (coops.day_claims_at.length == 4 && (Date.now()/1000 - 86400) < coops.day_claims_at[0]) {
				wait_claim = sec2time((coops.day_claims_at[0]+86400) - (Date.now()/1000));
			} else {
				wait_claim = sec2time(coops.next_availability - Date.now() / 1000);
			}
			sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 130px; background-color: " + fwFarmColor[coops.name] + ";'>" + coops.name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + coops.times_claimed + "/" + fwFarmClaims[coops.name] + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + wait_claim + "</div></div><br>";
			//console.log(coops.day_claims_at.length);
			if (coops.day_claims_at.length == 4 && (coops.day_claims_at[0]+86400)-(Date.now()/1000) < 0){
				urlBarrey = api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=foods&template_id=318606&owner="+wax.userAccount+"&page=1&limit=10&order=desc";
				let jsonBarrey = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(urlBarrey)).then(response => response.json());
				//console.log(jsonBarrey);
				let BarreyID = JSON.parse(jsonBarrey.contents).data;
				if (BarreyID.length != 0) {
					BarreyID = JSON.parse("["+BarreyID[0].asset_id+"]");
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
							to: 'farmersworld',
							asset_ids: BarreyID,
							memo: 'feed_animal:'+coops.asset_id
							},
						}]
					};
					let ret = await sign(config);
					if (ret == true) {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed SUCCESS!`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหาร "+(parseInt(coops.times_claimed)+1)+"/"+fwFarmClaims[coops.name]+" สำเร็จ";
					} else {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed FAILED! ${ret}`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหารไม่สำเร็จ เนื่องจาก CPU ไม่เพียงพอ!";
						if(ret.includes("Sender")){
							if (api_atomic_use == api_atomic[0]){
								api_atomic_use = api_atomic[1];
								console.log('Change API Atomic to '+api_atomic_use);
							} else if (api_atomic_use == api_atomic[1]){
								api_atomic_use = api_atomic[2];
								console.log('Change API Atomic to '+api_atomic_use);
							} else {
								api_atomic_use = api_atomic[0];
								console.log('Change API Atomic to '+api_atomic_use);
							}
						}
					}
				} else {
					//console.log(`Farmersworld : Animal Id ${coops.asset_id}, No Barrey Feed!`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " บาร์เล่ไม่เพียงพอ!";
				}
			} else if (coops.next_availability - Date.now() / 1000 < 0 && coops.day_claims_at.length < 4){
				urlBarrey = api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=foods&template_id=318606&owner="+wax.userAccount+"&page=1&limit=10&order=desc";
				let jsonBarrey = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(urlBarrey)).then(response => response.json());
				let BarreyID = JSON.parse(jsonBarrey.contents).data;
				if (BarreyID.length != 0) {
					BarreyID = JSON.parse("["+BarreyID[0].asset_id+"]");
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
							to: 'farmersworld',
							asset_ids: BarreyID,
							memo: 'feed_animal:'+coops.asset_id
							},
						}]
					};
					let ret = await sign(config);
					if (ret == true) {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed SUCCESS!`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหาร "+(parseInt(coops.times_claimed)+1)+"/"+fwFarmClaims[coops.name]+" สำเร็จ";
					} else {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed FAILED! ${ret}`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหารไม่สำเร็จ เนื่องจาก CPU ไม่เพียงพอ!";
						if(ret.includes("Sender")){
							if (api_atomic_use == api_atomic[0]){
								api_atomic_use = api_atomic[1];
								console.log('Change API Atomic to '+api_atomic_use);
							} else if (api_atomic_use == api_atomic[1]){
								api_atomic_use = api_atomic[2];
								console.log('Change API Atomic to '+api_atomic_use);
							} else {
								api_atomic_use = api_atomic[0];
								console.log('Change API Atomic to '+api_atomic_use);
							}
						}
					}
				} else {
					//console.log(`Farmersworld : Animal Id ${coops.asset_id}, No Barrey Feed!`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " บาร์เล่ไม่เพียงพอ!";
				}
			}
		}
		
		if (coops.name == 'Chicken' && coops != ''){
			if (coops.day_claims_at.length == 4 && (Date.now()/1000 - 86400) < coops.day_claims_at[0]) {
				wait_claim = sec2time((coops.day_claims_at[0]+86400) - (Date.now()/1000));
			} else {
				wait_claim = sec2time(coops.next_availability - Date.now() / 1000);
			}
			sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 130px; background-color: " + fwFarmColor[coops.name] + ";'>" + coops.name + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + coops.times_claimed + "/" + fwFarmClaims[coops.name] + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + wait_claim + "</div></div><br>";
			//console.log(coops.day_claims_at.length);
			if (coops.day_claims_at.length == 4 && (coops.day_claims_at[0]+86400)-(Date.now()/1000) < 0){
				urlBarrey = api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=foods&template_id=318606&owner="+wax.userAccount+"&page=1&limit=10&order=desc";
				let jsonBarrey = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(urlBarrey)).then(response => response.json());
				//console.log(jsonBarrey);
				let BarreyID = JSON.parse(jsonBarrey.contents).data;
				if (BarreyID.length != 0) {
					BarreyID = JSON.parse("["+BarreyID[0].asset_id+"]");
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
							to: 'farmersworld',
							asset_ids: BarreyID,
							memo: 'feed_animal:'+coops.asset_id
							},
						}]
					};
					let ret = await sign(config);
					if (ret == true) {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed SUCCESS!`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหาร "+(parseInt(coops.times_claimed)+1)+"/"+fwFarmClaims[coops.name]+" สำเร็จ";
					} else {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed FAILED! ${ret}`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหารไม่สำเร็จ เนื่องจาก CPU ไม่เพียงพอ!";
						if(ret.includes("Sender")){
							if (api_atomic_use == api_atomic[0]){
								api_atomic_use = api_atomic[1];
								console.log('Change API Atomic to '+api_atomic_use);
							} else if (api_atomic_use == api_atomic[1]){
								api_atomic_use = api_atomic[2];
								console.log('Change API Atomic to '+api_atomic_use);
							} else {
								api_atomic_use = api_atomic[0];
								console.log('Change API Atomic to '+api_atomic_use);
							}
						}
					}
				} else {
					//console.log(`Farmersworld : Animal Id ${coops.asset_id}, No Barrey Feed!`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " บาร์เล่ไม่เพียงพอ!";
				}
			} else if (coops.next_availability - Date.now() / 1000 < 0 && coops.day_claims_at.length < 4){
				urlBarrey = api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=foods&template_id=318606&owner="+wax.userAccount+"&page=1&limit=10&order=desc";
				let jsonBarrey = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(urlBarrey)).then(response => response.json());
				let BarreyID = JSON.parse(jsonBarrey.contents).data;
				if (BarreyID.length != 0) {
					BarreyID = JSON.parse("["+BarreyID[0].asset_id+"]");
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
							to: 'farmersworld',
							asset_ids: BarreyID,
							memo: 'feed_animal:'+coops.asset_id
							},
						}]
					};
					let ret = await sign(config);
					if (ret == true) {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed SUCCESS!`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหาร "+(parseInt(coops.times_claimed)+1)+"/"+fwFarmClaims[coops.name]+" สำเร็จ";
					} else {
						console.log(`Farmersworld : Animal Id ${coops.asset_id}, Feed FAILED! ${ret}`);
						document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " ให้อาหารไม่สำเร็จ เนื่องจาก CPU ไม่เพียงพอ!";
						if(ret.includes("Sender")){
							if (api_atomic_use == api_atomic[0]){
								api_atomic_use = api_atomic[1];
								console.log('Change API Atomic to '+api_atomic_use);
							} else if (api_atomic_use == api_atomic[1]){
								api_atomic_use = api_atomic[2];
								console.log('Change API Atomic to '+api_atomic_use);
							} else {
								api_atomic_use = api_atomic[0];
								console.log('Change API Atomic to '+api_atomic_use);
							}
						}
					}
				} else {
					//console.log(`Farmersworld : Animal Id ${coops.asset_id}, No Barrey Feed!`);
					document.getElementById('log_other').innerHTML += "\nFarmersWorld : " + coops.name + " บาร์เล่ไม่เพียงพอ!";
				}
			}
		}
		
	});
	return sInnerHTML;
}

async function fwCrops_build(balance) {
	
	if (!document.getElementById("fwCrops_build").checked) {
        return;
    }
	
	const building = await getTableRows_byIndex("farmersworld", "buildings", wax.userAccount, '2', 'name');
	building1 = building.find(({name}) => name === 'Farm Plot');
    if (building1.times_claimed < fwBuilding_conf[building1.name] && building1.next_availability - Date.now() / 1000 < 0 && balance.energy >= fwBuilding_req[building1.name]) {
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
                    asset_id: building1.asset_id
                },
            }]
        };
        let ret = await sign(config);
        if (ret == true) {
            console.log(`Farmersworld : Build Id ${building1.asset_id}, BUILD SUCCESS!`);
			if(building1.times_claimed == fwBuilding_conf[building1.name]-1){document.getElementById('log').innerHTML = "FarmersWorld : "+building1.name+" ปลูกสร้างสำเร็จแล้ว!"}else{
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : ปลูกสร้างสำเร็จ! " + (building1.times_claimed+1) + "/"+fwBuilding_conf[building1.name]}
        } else {
            console.log(`Farmersworld : Build Id ${building1.asset_id}, BUILD FAILED! ${ret}`);
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : "+building1.name+" ปลูกสร้างไม่สำเร็จ! " + building1.times_claimed + "/"+fwBuilding_conf[building1.name]+" กรุณาเติมพลังงาน หรือ CPU ของท่านไม่พอ";
        }
    }
}

async function fwCoops_build(balance) {
	
	if (!document.getElementById("fwCoops_build").checked) {
        return;
    }
	
	const building = await getTableRows_byIndex("farmersworld", "buildings", wax.userAccount, '2', 'name');
	building1 = building.find(({name}) => name === 'Coop');
    if (building1.times_claimed < fwBuilding_conf[building1.name] && building1.next_availability - Date.now() / 1000 < 0 && balance.energy >= fwBuilding_req[building1.name]) {
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
                    asset_id: building1.asset_id
                },
            }]
        };
        let ret = await sign(config);
        if (ret == true) {
            console.log(`Farmersworld : Build Id ${building1.asset_id}, BUILD SUCCESS!`);
			if(building1.times_claimed == fwBuilding_conf[building1.name]-1){document.getElementById('log').innerHTML = "FarmersWorld : "+building1.name+" ปลูกสร้างสำเร็จแล้ว!"}else{
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : ปลูกสร้างสำเร็จ! " + (building1.times_claimed+1) + "/"+fwBuilding_conf[building1.name]}
        } else {
            console.log(`Farmersworld : Build Id ${building1.asset_id}, BUILD FAILED! ${ret}`);
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : "+building1.name+" ปลูกสร้างไม่สำเร็จ! " + building1.times_claimed + "/"+fwBuilding_conf[building1.name]+" กรุณาเติมพลังงาน หรือ CPU ของท่านไม่พอ";
        }
    }
}

async function fwCowshed_build(balance) {
	
	if (!document.getElementById("fwCowshed_build").checked) {
        return;
    }
	
    let sInnerHTML = "";
	const building = await getTableRows_byIndex("farmersworld", "buildings", wax.userAccount, '2', 'name');
	building1 = building.find(({name}) => name === 'Cowshed');
    if (building1.times_claimed < fwBuilding_conf[building1.name] && building1.next_availability - Date.now() / 1000 < 0 && balance.energy >= fwBuilding_req[building1.name]) {
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
                    asset_id: building1.asset_id
                },
            }]
        };
        let ret = await sign(config);
        if (ret == true) {
            console.log(`Farmersworld : Build Id ${building1.asset_id}, BUILD SUCCESS!`);
			if(building1.times_claimed == fwBuilding_conf[building1.name]-1){document.getElementById('log').innerHTML = "FarmersWorld : "+building1.name+" ปลูกสร้างสำเร็จแล้ว!"}else{
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : ปลูกสร้างสำเร็จ! " + (building1.times_claimed+1) + "/"+fwBuilding_conf[building1.name]}
        } else {
            console.log(`Farmersworld : Build Id ${building1.asset_id}, BUILD FAILED! ${ret}`);
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : "+building1.name+" ปลูกสร้างไม่สำเร็จ! " + building1.times_claimed + "/"+fwBuilding_conf[building1.name]+" กรุณาเติมพลังงาน หรือ CPU ของท่านไม่พอ";
        }
    }
}

//////////////////////////// FARMERSWORLD ADD FUNCTION

async function deposit() {
    var inputVal = (parseFloat(document.getElementById("deposit").value)).toFixed(4);
    const inputVal1 = "[\"" + inputVal + " " + document.getElementById("de_tokens").value + "\"]";
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
                quantities: JSON.parse(inputVal1),
                memo: 'deposit',
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`Farmersworld : DEPOSIT ${inputVal} ${document.getElementById("de_tokens").value} DONE!`);
        document.getElementById('log_other').innerHTML += "\nFarmersWorld : ฝาก " + inputVal + " " + document.getElementById("de_tokens").value + " สำเร็จ";
    } else {
        console.log(`Farmersworld : DEPOSIT FAILED`);
    }
}

async function with_dr() {
    var inputVal = (parseFloat(document.getElementById("with_dr").value)).toFixed(4);
    const inputVal1 = "[\"" + inputVal + " " + document.getElementById("wi_tokens").value + "\"]";
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
                quantities: JSON.parse(inputVal1),
                fee: fee_put,
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`Farmersworld : WITHDRAW ${inputVal} ${document.getElementById("wi_tokens").value} DONE!`);
        document.getElementById('log_other').innerHTML += "\nFarmersWorld : ถอน " + inputVal + " " + document.getElementById("wi_tokens").value + " สำเร็จ";
    } else {
        console.log(`Farmersworld : WITHDRAW FAILED`);
    }
}

async function sell() {
    var inputVal = (parseFloat(document.getElementById("sell").value)).toFixed(4);
    const inputVal1 = inputVal + " " + document.getElementById("se_tokens").value;
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
                quantity: inputVal1,
                memo: '0.00000000 WAX@eosio.token',
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`Farmersworld : SELL ${inputVal} ${document.getElementById("se_tokens").value} DONE!`);
        document.getElementById('log_other').innerHTML += "\nFarmersWorld : ขาย " + inputVal + " " + document.getElementById("se_tokens").value + " สำเร็จ";
    } else {
        console.log(`Farmersworld : SELL FAILED`);
    }
}

async function buy() {
    var inputVal = (parseFloat(document.getElementById("buy").value)).toFixed(8);
    const inputVal1 = inputVal + " WAX";
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
                quantity: inputVal1,
                memo: inputTokens,
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`Farmersworld : BUY ${inputVal} WAX on ${document.getElementById("by_tokens").value} DONE!`);
        document.getElementById('log_other').innerHTML += "\nFarmersWorld : ซื้อ " + document.getElementById("by_tokens").value + " โดย " + inputVal + " WAX สำเร็จ!";
    } else {
        console.log(`Farmersworld : BUY FAILED`);
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
        console.log(`Farmersworld : RECOVERY ${recove} ENERGY DONE!`);
        document.getElementById('log_other').innerHTML += "\nFarmersWorld : บังคับเติมพลังงาน "+recove+" Energy สำเร็จ!";
    } else {
        console.log(`Farmersworld : RECOVERY ENERGY FAILED`);
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
        console.log(`Farmersworld : REPAIR TOOL ${value} DONE!`);
        document.getElementById('log_other').innerHTML += "\nFarmersWorld : บังคับซ่อมอุปกรณ์สำเร็จ!";
    } else {
        console.log(`Farmersworld : REPAIR TOOL ${value} FAILED`);
    }
}

async function burn() {
    console.log('Burn asset to gold please wait..');
	
	call_burn = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=foods&owner="+wax.userAccount+"&page=1&limit=200&order=desc"))
        .then(response => response.json());
    result_call = JSON.parse(call_burn.contents).data;
	//console.log(result_call);
	
	//let call_burn = await fetch(api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=foods&owner="+wax.userAccount+"&page=1&limit=200&order=desc");
	//const result_call = JSON.parse(call_burn.data);
	if (result_call.length != 0){
		var result1 = [];
		for (let i = 0; i < result_call.length; i++) {
		result1 += result_call[i].asset_id+",";
		}
		result1 = JSON.parse("["+result1.slice(0,-1)+"]");
		//console.log(result1);
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
					asset_ids: result1,
					memo: "burn"
				},
			}]
		};
		let ret = await sign(config);
		if (ret == true) {
			console.log(`Farmersworld : BURN ASSET DONE!`);
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : แลกผลผลิตเป็นทองสำเร็จ!";
		} else {
			console.log(`Farmersworld : BURN ASSET FAILED`);
		}
	} else {
		console.log(`Farmersworld : NO ASSET TO BURN!`);
		document.getElementById('log_other').innerHTML += "\nFarmersWorld : ไม่มีผลผลิตให้แลก!";
	}
}
async function tranfer_coins() {
var user_tran = document.getElementById("tranfer_coins").value;
let call_burn = await fetch(api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=farmercoins&owner="+wax.userAccount+"&page=1&limit=500&order=desc");
call_burn = await call_burn.json();
result_call = await call_burn.data;
//call_burn = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(api_atomic_use+"/atomicassets/v1/assets?collection_name=farmersworld&schema_name=farmercoins&owner="+wax.userAccount+"&page=1&limit=100&order=desc"))
//        .then(response => response.json());
//result_call = await JSON.parse(call_burn.contents).data;
console.log(result_call);
if (result_call.length != 0){
		var result1 = [];
		for (let i = 0; i < result_call.length; i++) {
		result1 += result_call[i].asset_id+",";
		}
		result1 = JSON.parse("["+result1.slice(0,-1)+"]");
		console.log(result1);
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
					to: user_tran,
					asset_ids: result1,
					memo: result_call.length
				},
			}]
		};
		let ret = await sign(config);
		if (ret == true) {
			console.log(`Farmersworld : TRANFER ASSETS DONE!`);
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : โอนเหรียญฟาร์มจำนวน "+result_call.length+" เหรียญไปยัง "+user_tran+" สำเร็จ!";
			if (api_atomic_use == api_atomic[0]){
					api_atomic_use = api_atomic[1];
					console.log('Change API Atomic to '+api_atomic_use);
				} else if (api_atomic_use == api_atomic[1]){
					api_atomic_use = api_atomic[2];
					console.log('Change API Atomic to '+api_atomic_use);
				} else {
					api_atomic_use = api_atomic[0];
					console.log('Change API Atomic to '+api_atomic_use);
				}
		} else {
			console.log(`Farmersworld : TRANFER ASSETS FAILED`);
			if(ret.includes("Sender")){
				if (api_atomic_use == api_atomic[0]){
					api_atomic_use = api_atomic[1];
					console.log('Change API Atomic to '+api_atomic_use);
				} else if (api_atomic_use == api_atomic[1]){
					api_atomic_use = api_atomic[2];
					console.log('Change API Atomic to '+api_atomic_use);
				} else {
					api_atomic_use = api_atomic[0];
					console.log('Change API Atomic to '+api_atomic_use);
				}
			}
		}
	} else {
		console.log(`Farmersworld : NO ASSETS TO TRANFER!`);
	}
}
async function withdraw_coins(mbfcoin) {
	mbfcoin = await getTableRows("farmersworld", "coinstake", wax.userAccount);
if (mbfcoin.amount != 0){
		let config = {
			actions: [{
				account: 'farmersworld',
				name: 'withdrawcoin',
				authorization: [{
					actor: wax.userAccount,
					permission: 'active'
				}],
				data: {
					amount: mbfcoin.amount,
					new_owner: wax.userAccount
				}
			}]
		};
		let ret = await sign(config);
		if (ret == true) {
			console.log(`Farmersworld : WITHDRAW ASSETS DONE!`);
			document.getElementById('log_other').innerHTML += "\nFarmersWorld : ถอนหรียญฟาร์มจำนวน "+mbfcoin.amount+" เหรียญสำเร็จ!";
		} else {
			console.log(`Farmersworld : WITHDRAW ASSETS FAILED`);
		}
	} else {
		console.log(`Farmersworld : NO ASSETS TO WITHDRAW!`);
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
			limit: 100
        });
    } catch (e) {
        document.getElementById('response').innerHTML = e.message;
        console.log("ERROR FOR: " + code + ", " + tableName + ", " + bound);
		console.log(e.message);
		if(e.message == 'Failed to fetch'){Change_RPC()}
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
		console.log(e.message);
		if(e.message == 'Failed to fetch'){Change_RPC()}
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
		console.log(e.message);
		if(e.message == 'Failed to fetch'){Change_RPC()}
    }
    return result;
}

//////////////////////////////////GOTOPANDANFT///////////////////////
async function getPanda() {

    if (!document.getElementById("pandaCheck").checked) {
        return;
    }

    let sInnerHTML = "";
	
	food_count = '';
	let food = await getTableRows("nftpandawofg", 'eatable', wax.userAccount);
	if(food.eat_count[0] != 0){
		food_count += '[Common : ' + food.eat_count[0]+'] ';
	}
	if(food.eat_count[1] != 0){
		food_count += '[Uncommon : ' + food.eat_count[1]+'] ';
	}
	if(food.eat_count[2] != 0){
		food_count += '[Rare : ' + food.eat_count[2]+'] ';
	}
	if(food.eat_count[3] != 0){
		food_count += '[Epic : ' + food.eat_count[3]+'] ';
	}
	if(food.eat_count[4] != 0){
		food_count += '[Legend : ' + food.eat_count[4]+'] ';
	}
	if(food.eat_count[5] != 0){
		food_count += '[Mythic : ' + food.eat_count[5]+'] ';
	}
	//console.log(food);

    //var call_panda = api_atomic_use+"/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=100&order=desc&sort=asset_id";
    //var call_panda = api_atomic_use+"/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=100&order=desc&sort=asset_id";
    //var call_panda = api_atomic_use+"/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=100&order=desc&sort=asset_id";
    //let jsonFood = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(call_panda)).then(response => response.json());
    //let FoodID = JSON.parse(jsonFood.contents);

    //let jsonFood = await fetch(api_atomic_use+"/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=200&order=desc&sort=asset_id");
    //let jsonFood = await fetch(api_atomic_use+"/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner="+wax.userAccount+"&page=1&limit=200&order=desc&sort=asset_id");
    //let jsonFood = await fetch(api_atomic_use+"/atomicassets/v1/assets?collection_name=nftpandawaxp&schema_name=food&owner=" + wax.userAccount + "&page=1&limit=200&order=desc&sort=asset_id");
    //let FoodID = await jsonFood.json();
    sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge bg-success text-white' style='width: 150px;'>FOOD : "+food_count+"</div></div>";

    let res = await getTableRows("nftpandawofg", "usersnew", wax.userAccount);
    if (!res) {
        console.log("GET PANDA ERROR");
        return;
    }
	
	panda_id2 = '';
	panda_id = '';
	panda_count = 0;
	for (let i = 0; i < res.max_slots; i++) {
		if (res.slots_count[i] != 0) {
        let ret1 = await getTableRows("nftpandawofg", 'nftsongamec', res.slots_count[i].toString());
			if (ret1.timer < Date.now()/1000) {
				//console.log(ret1.asset_id);
				panda_count = panda_count+1;
				panda_id += ret1.asset_id+',';
			}
		}
	}
	
	panda_id = JSON.parse('['+panda_id.slice(0,-1)+']');
	
	if(panda_count > 10){panda_count = 10;}
	
	if (panda_id.length != 0) {
            let config = {
                actions: [{
                    account: 'nftpandawofg',
                    name: 'multiadv',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active'
                    }],
                    data: {
                        duration: 4,
                        pandaid: panda_id,
                        storer: wax.userAccount,
                        typeadv: 'bamboo'
                    },
                }]
            };
            let ret = await sign(config);
            if (ret == true) {
                console.log(`PandaNFT : HARVEST SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nPandaNFT : ผจญภัยสำเร็จ!";
            } else {
                console.log(`PandaNFT : HARVEST FAILED! ${ret}`);
				if(ret == 'Failed to fetch'){Change_RPC()}
            }
	}

    for (let i = 0; i < res.max_slots; i++) {
		if (res.slots_count[i] != 0) {
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
			
			if (getWeapon.energy == 0 && getWeapon.rarity == 0) {
			let config = {
                actions: [{
                    account: 'nftpandawofg',
                    name: 'payingame',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
						bamnum: 10800,
						ipfshash: "addenergyweapon "+getWeapon.asset_id+" ",
						storer: wax.userAccount
                    },
                }]
            };
            let ret = await sign(config);
			if (ret == true) {
				console.log('PandaNFT : REPAIR WEAPONS SUCCESS!');
				document.getElementById('log_other').innerHTML += "\nPandaNFT : ซ่อมอาวุธสำเร็จ!";
			} else {
				console.log('PandaNFT : REPAIR WEAPONS FAIL!');
			}
			}
			
			if (getWeapon.energy == 0 && getWeapon.rarity == 1) {
			let config = {
                actions: [{
                    account: 'nftpandawofg',
                    name: 'payingame',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        bamnum: 18000,
						ipfshash: "addenergyweapon "+getWeapon.asset_id+" ",
						storer: wax.userAccount
                    },
                }]
            };
            let ret = await sign(config);
			if (ret == true) {
				console.log('PandaNFT : REPAIR WEAPONS SUCCESS!');
				document.getElementById('log_other').innerHTML += "\nPandaNFT : ซ่อมอาวุธสำเร็จ!";
			} else {
				console.log('PandaNFT : REPAIR WEAPONS FAIL!');
			}
			}
			
        } else {
            sInnerHTML += "<div class='badge bg-secondary text-white' style='width: 130px;'>None</div>&emsp;";
        }
		
		if (ret.jew != "0") {
            let getJew = await getTableRows("nftpandawofg", 'nftjew', ret.jew);
            sInnerHTML += "<div class='badge text-white' style='width: 130px; background-color: " + nftPandaColor[getJew.element] + ";'><img src='/js/jew1.png' style='height: 15px;vertical-align: middle;align-items: center;'></img>&nbsp;" + nftPandaWeapon[getJew.rarity] + "</div>&emsp;";
			
			if (getJew.energy == 0 && getJew.rarity == 0) {
			let config = {
                actions: [{
                    account: 'nftpandawofg',
                    name: 'payingame',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
						bamnum: 4200,
						ipfshash: "addenergyjew "+getJew.asset_id+" ",
						storer: wax.userAccount
                    },
                }]
            };
            let ret = await sign(config);
			if (ret == true) {
				console.log('PandaNFT : REPAIR JEWS SUCCESS!');
				document.getElementById('log_other').innerHTML += "\nPandaNFT : ซ่อมเครื่องประดับสำเร็จ!";
			} else {
				console.log('PandaNFT : REPAIR JEWS FAIL!');
			}
			}
			
        } else {
            sInnerHTML += "<div class='badge bg-secondary text-white' style='width: 130px;'>None</div>&emsp;";
        }

        sInnerHTML += "<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(ret.timer - Date.now() / 1000) + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + ret.energy / 100 + "/100</div></div><br>";
        //if (ret.timer - Date.now() / 1000 < 0) {
        //    let config = {
        //        actions: [{
        //            account: 'nftpandawofg',
        //            name: 'printrand',
        //            authorization: [{
        //                actor: wax.userAccount,
        //                permission: 'active',
        //            }],
        //            data: {
        //                username: wax.userAccount,
        //                assoc_id: res.slots_count[i],
        //                signing_value: Math.floor(Math.random() * 18446744073709551616)
        //            },
        //        }]
        //    };
        //    let ret = await sign(config);
        //    if (ret == true) {
        //        console.log(`PandaNFT : Char Id ${res.slots_count[i]}, HARVEST SUCCESS!`);
        //        document.getElementById('log_other').innerHTML += "\nPandaNFT : " + namePanda + " ผจญภัยสำเร็จ!";
        //    } else {
        //        console.log(`PandaNFT : Char Id ${res.slots_count[i]}, HARVEST FAILED! ${ret}`);
		//		if(ret == 'Failed to fetch'){Change_RPC()}
        //    }
        //}
		
		if (ret.energy < nftPandaFEED) {
			panda_id2 += res.slots_count[i]+',';
		}
		
		}
	}
	panda_id2 = JSON.parse('['+panda_id2.slice(0,-1)+']');
	//console.log(panda_id2);
	if(panda_id2.length != 0){
	let config = {
        actions: [{
            account: 'nftpandawofg',
            name: 'multieat',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active'
            }],
            data: {
                storer: wax.userAccount,
				pandaid: panda_id2
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`PandaNFT : FEED PANDA FOOD DONE!`);
        document.getElementById('log_other').innerHTML += "\nPandaNFT : ให้อาหารสำเร็จ!";
    } else {
        console.log(`PandaNFT : FEED PANDA FOOD FAILED`);
    }
	}
	
    document.getElementById('resnftPanda').innerHTML = sInnerHTML;
}

async function pandaBuyFood() {
    const foodRarity = dropdownlistPandaFoodList.options[dropdownlistPandaFoodList.selectedIndex].text;
    const foodAmount = dropdownlistPandaFoodUnit.options[dropdownlistPandaFoodUnit.selectedIndex].text;
    const foodPrice = pandaFoodPrice[dropdownlistPandaFoodList.selectedIndex];

    const _quantity = parseFloat(foodAmount * foodPrice);
    const _memo = "buyeat " + foodRarity + " " + foodAmount + " ";

    let config = {
        actions: [{
            account: 'nftpandawofg',
            name: 'payingame',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active'
            }],
            data: {
                bamnum: _quantity,
                ipfshash: _memo,
                storer: wax.userAccount
            },
        }]
    };
    let ret = await sign(config);
    if (ret == true) {
        console.log(`PandaNFT : BUY PANDA FOOD DONE!`);
        document.getElementById('log_other').innerHTML += "\nPandaNFT : ซื้ออาหารสำเร็จ!";
    } else {
        console.log(`PandaNFT : BUY PANDA FOOD FAILED`);
    }
}
//////////////////////////////////GOTOOFFICELAND///////////////////////
async function Officeland_task() {
    let sInnerHTML = "";
    if (!document.getElementById("officelandCheck").checked) {
        return;
    }
	
	const OfficeSleep = parseFloat(document.getElementById('OfficeSleep').value);

	let officelandBalance = 0;
    officelandBalance = await getTableRows("officegameio", "balances", wax.userAccount);
    sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge bg-warning text-white' style='width: 180px;'>" + officelandBalance.quantity + "</div></div>";

    let res = await getTableRows("officegameio", "publicslots", wax.userAccount);
    if (!res) {
        console.log("GET STAFF ERROR");
        return;
    }
	
	var finish_all = '';
    res = res.asset_ids.filter(x => x != 0);

    for (let i = 0; i < res.length; i++) {
		let ret_mat = [];
		ret_mat = await getTableRows_byIndex("officegameio", 'assigntasks', wax.userAccount, "0", "name");
		ret_mat = ret_mat[0].datas;
		ret_mat = ret_mat.find(({asset_id}) => asset_id === res[i]);
		
		template = await getTableRows_byIndex("officegameio", 'asset.state', res[i], "0", "i64");
		template = template[0];
		
		decrease = template.asset_data.decrease_sr;
		rarity_template = officelandTemplate[template.template_id];
		
        if (ret_mat == undefined) {
            let jobNum = officelandJoblist[rarity_template];
            if (((officelandRarityRates[rarity_template] - decrease) / officelandRarityRates[rarity_template]) * 100 < OfficeSleep)
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
                        asset_id: res[i]
                    },
                }]
            };
            let ret_sign = await sign(config);
            if (ret_sign == true) {
                console.log(`OfficeLand : Char Id ${res[i]}, GO WORK SUCCESS!`);
                document.getElementById('log_other').innerHTML += "\nOfficeLand : ออกไปทำงานแล้ว!";
            } else {
                console.log(`OfficeLand : Char Id ${res[i]}, GO WORK FAILED! ${res[i]}`);
            }
            continue;
        }
		
		if(ret_mat.task_id == '7'){
			var id_o = officelandName[template.template_id]+' (Zzz)';
		}else{
			var id_o = officelandName[template.template_id];
		}
		//console.log(ret_mat.itemused[0]);
		if(ret_mat.itemused == ''){
			var coffee = 'None Coffee';
		}else{
			var coffee = cofe[ret_mat.itemused[0].item_id][0];
		}
		
        sInnerHTML += "<div class='d-inline-flex w-100'><div class='badge text-white' style='width: 120px; background-color: " + officelandColor[rarity_template] + ";'>" + id_o + "</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>"+coffee+"</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + parseFloat(officelandRarityRates[rarity_template] - decrease).toFixed(2) + "%</div>&emsp;<div class='badge bg-secondary text-white' style='width: 120px;'>" + sec2time(ret_mat.task_end - Date.now() / 1000) + "</div></div><br>";

        if (ret_mat.task_end - Date.now() / 1000 < 0) {
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
                        taskassign_id: ret_mat.taskassign_id
                    },
                }]
            };
            let ret_sign = await sign(config);
            if (ret_sign == true) {
                console.log(`OfficeLand : Char Id ${res[i]}, FINISHED TASK!`);
                document.getElementById('log_other').innerHTML += "\nOfficeLand : ทำงานสำเร็จแล้ว!";
            }
        }
		
		
		finish_all += ret_mat.taskassign_id+",";
		
    }
	
	//finish_all = JSON.parse("["+finish_all.slice(0,-1)+"]");
	//console.log(finish_all);

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
            console.log("OfficeLand : Task Id " + res.finish_id + ", CLAIMED REWARD! " + (parseFloat(res.reward)).toFixed(4) + " OCOIN");
            document.getElementById('log_other').innerHTML += "\nOfficeLand : เคลม " + (parseFloat(res.reward)).toFixed(4) + " OCOIN สำเร็จ!";
        }
    }
    document.getElementById('resofficeland').innerHTML = sInnerHTML;
}
//////////////////// OFFICE FUNCTION
async function bulk_coffee() {
    const inputVal1 = document.getElementById("bulk_coffee").value;
	const find_length = await getTableRows_byIndex("officegameio", 'assigntasks', wax.userAccount, "0", "name");
	test = find_length[0].datas;
	resul = '';
	for (let i = 0; i < test.length; i++) {
		if (test[i].itemused.length == 0 && test[i].task_id != 7) {
			resul += test[i].taskassign_id+',';
	}}
	resul = resul.slice(0,-1);
	resul = JSON.parse('['+resul+']');
	//console.log(resul);
	if (resul != '') {
		let config = {
        actions: [{
            account: 'officegameio',
            name: 'useitemburns',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                player: wax.userAccount,
                item_id: inputVal1,
                taskassign_ids: resul
            },
        }]
		};
		let ret = await sign(config);
		if (ret == true) {
			console.log(`OfficeLand : BULK COFFEE DONE!`);
			document.getElementById('log_other').innerHTML += "\nOfficeLand : เสริฟกาแฟทุกคนสำเร็จ";
		} else {
			console.log(`OfficeLand : BULK COFFEE FAILED`);
		}
    } else {
		console.log(`OfficeLand : BULK COFFEE FAILED!`);
		document.getElementById('log_other').innerHTML += "\nOfficeLand : เสริฟกาแฟไม่สำเร็จ เนื่องจากเสริฟกาแฟทุกคนแล้ว หรือ CPU ไม่เพียงพอ!";
	}
}
//////////////////////////////////////////////////////////////////////////////////////////
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
        tickInterval: 51,
        totalRuns: 0,
        callback(task) {
            Farmersworld_main();
        }
    },
    {
        id: 'nftPanda',
        tickInterval: 71,
        totalRuns: 0,
        callback(task) {
            getPanda();
        }
    },
    {
        id: 'officeland',
        tickInterval: 84,
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

function timeformat() {
var today = new Date();
var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
return dateTime;
}

function lineNotifyTest(){
	if ($("#lineToken").val() != '') {
	$.ajax({
		type: "POST",
		url: "/submit",
		data: {
			token: $("#lineToken").val(),
			detail: `WAX LEGACY BOT 🪵`
		}
	});}
}

document.getElementById('end_point').addEventListener('change', function() {
save_setting();
location.reload();
});
//wax.login();

function Change_RPC(){
	console.log('Change RPC')
	var select = document.getElementById('end_point');
	var items = select.getElementsByTagName('option');
	var index = Math.floor(Math.random() * items.length);
	select.selectedIndex = index;
	save_setting();
	location.reload();
}