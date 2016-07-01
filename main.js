var money = 0;
var science=0;
var researchUnlocked = false;
var back =1;
var tics=0;
var currentTab = "buildingTab";
var moneyHistory=[];			//name         profit   prev    baseCost   upCost   upSCost
var market = 		new Building("market", 		0.25, 	money, 		10,		500,	100);
var bank = 			new Building("bank", 		0.5, 	market, 	25,		1000,	250);
var exchange = 		new Building("exchange",	1,		bank,		100,	2500,	500);
var mint = 			new Building("mint",		2.5,	exchange,	500,	5000,	1000);
var centralbank = 	new Building("centralbank",	5,		mint,		1000,	10000,	2000);
var corperation = 	new Building("corperation",	10,		centralbank,3000,	25000,	2500);
var state =			new Building("state",   	25,	    corperation,10000,	40000,	10000);
var world =	new Building("world",	    40,	    state,      20000,	50000,	15000);

var allBuildings =[market,bank,exchange,mint,centralbank,corperation,state,world];


var libary = 		new Building("libary",		1, 		market,		100,	100,    150);
var school =        new Building("school",		2, 		libary,		500,	1000,   300);
var highschool =    new Building("highschool",	5, 		school,		2500,	4000,   1000);
var university =    new Building("university",	10, 	highschool,	5000,	10000,  2500);
var spaceStation =    new Building("spaceStation",25,		university,	10000,	25000,  4000);

var allScienceBuildings= [libary, school, highschool,university,spaceStation];

var MoneyTotal =		new Stat("MoneyTotal",0);
var MoneyTotalClicked=	new Stat("MoneyTotalClicked",0);
var MoneyTotalProfit=	new Stat("MoneyTotalProfit",0);
var MoneyInBuildings=	new Stat("MoneyInBuildings",0)
var MoneyInUpgrades=	new Stat("MoneyInUpgrades",0);
var ScienceInUpgrades=	new Stat("ScienceInUpgrades",0);
var ScienceTotal=		new Stat("ScienceTotal",0);
var MoneyByMoneyAngel=	new Stat("MoneyByMoneyAngel",0);
var MoneyAngelsClicked=	new Stat("MoneyAngelsClicked",0);
var MoneyAngelsAppeared=new Stat("MoneyAngelsAppeared",0);
var allStats = [MoneyTotal,MoneyTotalClicked, MoneyTotalProfit,MoneyInBuildings,MoneyInUpgrades,ScienceInUpgrades, ScienceTotal,MoneyByMoneyAngel,MoneyAngelsClicked,MoneyAngelsAppeared];


window.onload = startUp();
document.onkeypress = ignoreEnterKey; 

function Stat(name, value){
		this.name = name;
		this.value = value;
		
}

function refreshStats(){
		
for (i=0;i<allStats.length;i++){
		document.getElementById("stat"+allStats[i].name).innerHTML= allStats[i].name + ": " + allStats[i].value;
}	
switchTo('statsTab');	
		
}


function startUp(){
		buildHTML();
		buildScienceHTML();
		switchTo('buildingTab');
		document.getElementById('moneyAngelDiv').style.display = 'none';
	
		}
		
		
function ignoreEnterKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  console.log(evt.keyCode);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13))  {return false;} 
} 




function buildHTML(){
	
	
	var last = document.getElementById("addBuildingsAfterThis");
	for (i=0;i<allBuildings.length;i++){
			var id=allBuildings[i].name;
			var html ="";
			html += "<div id=\'"+id+"Div' style='display:none'>";
			html += "<button id ='"+id+"B' onclick='"+id+".addBuilding()'>"+capitalize(id)+"(0)</button>";
			html += "<p><span id='"+id+"Cost'>Cost  : "+allBuildings[i].baseCost+"</span></p>";
			html += "<p><span id='"+id+"Profit'>Profit: "+allBuildings[i].profit+"</span></p>";
			html += "</div><br/>";
			last.insertAdjacentHTML('beforeend',html);
			
				
			
	}
	last = document.getElementById("addUpgradesAfterThis");
	for (i=0;i<allBuildings.length;i++){
		var id=allBuildings[i].name;
		var html ="";
		html += "<div id=\'"+id+"UpgradeDiv' style='display:none'>";
		html += "<button id ='"+id+"UpgradeB' onclick='"+id+".upgradeBuilding()' title='Doubles Profit'>"+"Upgrade " +capitalize(id)+"</button>";
		html += "<p><span id='"+id+"UpgradeCost'>Money : "+allBuildings[i].upgradeCost+"</span></p>";
        html += "<p><span id='"+id+"UpgradeScienceCost'>Science: "+allBuildings[i].upgradeScienceCost+"</span></p>";			
		html += "<br /></div>";
		last.insertAdjacentHTML('beforeend',html);	
		
	}
	
	last = document.getElementById("addStatsAfterThis");
	for (i=0;i<allStats.length;i++){
		var id=allStats[i].name;
		var html ="";
		html += "<p id='stat"+ id +"'></p>";		
		last.insertAdjacentHTML('beforeend',html);	
		
	}
	
	
	
}

function buildScienceHTML(){
	var last = document.getElementById("addScienceAfterThis");	
	for (i=0;i<allScienceBuildings.length;i++){
		var id=allScienceBuildings[i].name;
		var html="";
		
		html += "<div id=\'"+id+"Div' style='display:none'>";
		html += "<button id ='"+id+"B' onclick='"+id+".addBuilding()'>"+capitalize(id)+"(0)</button>";
		html += "<p><span id='"+id+"Cost'>Cost  : "+allScienceBuildings[i].baseCost+"</span></p>";
		html += "<p><span id='"+id+"Profit'>Output: "+allScienceBuildings[i].profit+"</span></p>";
		html += "<br /></div>";	
		last.insertAdjacentHTML('beforeend',html);	
	}
}

function moneyButtonClicked(){
		incMoney(1);
		MoneyTotalClicked.value++;
}


function incScience(number){
		science = science+number;
		ScienceTotal.value+=number;
		document.getElementById("scienceDisplay").innerHTML = splitter(science);
		checkGoal();
}

function decScience(number){
		if (number >= science){
				science =0;
		}
		else{
		science = science-number;
		}
		document.getElementById("scienceDisplay").innerHTML = splitter(science);
		checkGoal();
}


function incMoney(number){
		money = money+number;
		document.getElementById("money").innerHTML = splitter(money)+"$";
		checkGoal();
		MoneyTotal.value +=number;
}

function decMoney(number){
		if (number >=money){
				money =0;
		}
		else{
		money = money-number;
		}
		document.getElementById("money").innerHTML = splitter(money)+"$";
		checkGoal();
}

function Building(name,profit,prev,baseCost,upgradeCost,upgradeScienceCost){
		this.name = name;
		this.amount = 0;
		this.profit = profit;
		this.prev = prev;
		this.baseCost = baseCost;
		this.currentCost=baseCost;
		this.upgradeCost=upgradeCost;
		this.upgradeScienceCost=upgradeScienceCost;
		this.exponent = 1.1;
		this.unlockedAt = Math.floor((baseCost*8)/10);
		this.unlocked=false;
		var self=this;
		
		this.addBuilding = function(){
			var id = self.name;
			self.amount++;
			decMoney(self.currentCost);
			MoneyInBuildings.value+=self.currentCost;
			
			document.getElementById(id+"B").innerHTML = capitalize(id)+"("+splitter(self.amount)+")";
			self.calcNextCost();
			document.getElementById(id+"Cost").innerHTML="Cost  : "+splitter(self.currentCost);
			checkGoal();	
		}		
		this.calcNextCost= function(){
				self.currentCost = Math.floor(self.baseCost*Math.pow(self.exponent,self.amount));
		}				
	

	this.upgradeBuilding=function (){		
		decMoney(self.upgradeCost);
		MoneyInUpgrades.value+=self.upgradeCost;
		decScience(self.upgradeScienceCost);
		ScienceInUpgrades.value=self.upgradeScienceCost;
		self.profit = self.profit*2;
		self.upgradeCost= self.upgradeCost*4;
		self.upgradeScienceCost=self.upgradeScienceCost*3;
		document.getElementById(self.name+"UpgradeCost").innerHTML ="Money : " +splitter(self.upgradeCost)+"$";
		document.getElementById(self.name+"UpgradeScienceCost").innerHTML ="Science: " +splitter(self.upgradeScienceCost);
		var tmp = self.profit.toString();
		document.getElementById(self.name+"Profit").innerHTML = "Profit: " + splitter(tmp);
		checkGoal();
	}
	
this.calcProfit = function(){
		return self.amount * self.profit;
}					
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


		
function discover(building){
		if (building==market){
			if (money >= building.unlockedAt){
					document.getElementById(building.name+"Div").style.display= "block";
					building.unlocked=true;
			}	
		}
		else {if ((money > building.unlockedAt)&&(building.prev.amount>=1)){
				document.getElementById(building.name+"Div").style.display= "block";
				building.unlocked=true;
		}}
		
}



function checkAdd(building){
		
	
		var unaffordable=true;
		if (money >= building.currentCost){
				unaffordable=false;
		}
		else {
				unaffordable=true;
		}		
		document.getElementById(building.name+"B").disabled=unaffordable;
		
		
}

function discoverResearch(){
	if (researchUnlocked == false){
		if (money>=100){
			unlockResearchB.disabled=false;
			unlockResearchB.style.display="block";
		}
		else {unlockResearchB.disabled=true;}
	}
  else{
		
  }	
}

function checkUpgrade(building){
		var unaffordable=true;
		if (building.amount >= 1){
		document.getElementById(building.name+"UpgradeDiv").style.display="block";
     
       if ((money >= building.upgradeCost) && (science >= building.upgradeScienceCost)){
			unaffordable = false;
	   }
	   else{ 
	   unaffordable=true;}
	   document.getElementById(building.name+"UpgradeB").disabled= unaffordable;
	   }
}

function checkAll(){
		for (i=0;i<allBuildings.length;i++){
		var current=allBuildings[i];
		
		discover(current);
		checkAdd(current);
		checkUpgrade(current);
		}
		
		
		for (j=0;j< allScienceBuildings.length;j++){
			discover(allScienceBuildings[j]);
			checkAdd(allScienceBuildings[j]);
		}			
		}
		
		

function checkGoal(){
			
		discoverResearch();
		checkAll();
		
		switchBackground();
		
		if (exchange.amount >=1){
						dontTouch.style.display="block";						
				}
				
		}
		
function moneyAngelClick(){
		
		var tmp=(addProfits()*30);		
		writeLog("The MoneyAngel granted you "+splitter(tmp)+"$.");		
		incMoney(tmp);
		MoneyTotal.value+=tmp;
		MoneyByMoneyAngel.value +=tmp;
		MoneyAngelsClicked.value++;
		document.getElementById("moneyAngelDiv").style.display='none';
		
}		

function restartMoneyAngel(){
		MoneyAngelsAppeared.value++;
		
	var elm = document.getElementById("moneyAngelDiv");
	elm.style.display='block';
	var newone = elm.cloneNode(true);
	elm.parentNode.replaceChild(newone, elm);
	
	var moneyAngelVar = document.getElementById("moneyAngelDiv");
	moneyAngelVar.style.curor ='pointer';
	moneyAngelVar.onclick = function() {
		moneyAngelClick();		
	};
		
}				
		
function switchBackground(){
		
		if (bank.amount==1 && back==1){
			document.body.style.background="url('backgrounds/back2.png')";
				writeLog("Your City Grows!");
				back =2;
		}
	if (mint.amount==1&& back==2){
		document.body.style.background="url('backgrounds/back3.png')";
		writeLog("Your City Grows!");
		back=3;
	}
	
	document.body.style.backgroundPosition ="bottom";
	document.body.style.backgroundRepeat="no-repeat";
	document.body.style.backgroundSize="contain";
		
}


function unlockResearch(){
		decMoney(100);
		MoneyInUpgrades.value+=100;
		researchUnlocked=true;
		unlockResearchB.style.display="none";
		for (i=0;i<document.getElementsByClassName("unlockedByScience").length;i++){
		document.getElementsByClassName("unlockedByScience")[i].style.display="block";
		}			
		writeLog("Research Unlocked.")
}


function splitter(number){

if (number>100){		
number = Math.floor(number);
number = ""+number;

if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(number.length / 3); i++){
				if ((mod == 0) && (i == 0)) output += number.substring(mod+ 3 * i, mod + 3 * i + 3); 
				else 
				output+= ' ' + number.substring(mod + 3 * i, mod + 3 * i + 3); 
				} 
				return (output); } 
				
	else return number; 
	
}
else return number; }
	
	function speculate(){
			
			var investion=Math.floor(money/10);
			var event = Math.floor((Math.random() * 1000) + 1);
			
			if (event <100){
		incMoney(investion*2);
		writeLog("You quadrupled your investment! gz. \n +"+investion*3 +"$");
			
			}
			
			else{ if (event>=100 && event <500){
		incMoney(investion);
		writeLog("You doubled your investment! \n+"+investion+"$");
			}
			
		else{ if (event>=500 && event <900){
			
			decMoney(investion);
			writeLog("You lost your whole investment. \n-"+investion+"$");
		}
		
		else {		
		decMoney(investion*2);
		writeLog("You somehow lost double your investment. \n-"+investion*2+"$");
		
		}														
	}}}
	
	
	function switchTo(tab){	
		try{	
			document.getElementById(currentTab).style.display="none";
			document.getElementById(tab).style.display="block";
		
		}
		catch (e){
				document.getElementById(tab).style.display="block";
		}
		currentTab=tab;
	}
	

function checkEvents(){
		var event = Math.floor((Math.random() * 2000) + 1);
		if (event == 1234){
				
		var rng = Math.floor((Math.random() * 1000) + 1);
		if (rng <300){
		var tempDec=(Math.floor(money/2);
				writeLog("Your supervisor catches you playing.\n Money -"+tempDec +"$");
				decMoney(tempDec);
		}
		else { 
		var tempInc = Math.floor(money/4);
		writeLog("Bonus Payment. \n Money +"+tempInc+"$");
				incMoney(tempInc);}
		
		}
		if (event >=1998){
				restartMoneyAngel();
			
		}

		
} 


function writeLog(text){
		var temp="";
		for ( i=9; i>0;i--){
				
				document.getElementById("log"+i).innerHTML=document.getElementById("log"+(i-1)).innerHTML;
		}	
		document.getElementById("log0").innerHTML=text;
		
}

function win(number){
		incMoney(number);
		writeLog("cheated "+number+"$");
}

function addProfits(){
		var moneyInc =0;
		for (i=0;i<allBuildings.length;i++){
			moneyInc += allBuildings[i].calcProfit();	
		}
		return moneyInc;	
}

function addScience(){
		var scienceInc =0;
		for (i=0;i<allScienceBuildings.length;i++){
			scienceInc += allScienceBuildings[i].calcProfit();	
		}
		return scienceInc;	
}



window.setInterval(function(){
		tics++;
		var moneyInc = addProfits();
		MoneyTotalProfit.value += addProfits();
		var scienceInc = addScience();
		document.getElementById("profit").innerHTML=splitter(moneyInc)+"$";
		document.getElementById("scienceProfitDisplay").innerHTML=splitter(scienceInc);		
		
	incMoney(moneyInc);
	incScience(scienceInc);
	checkEvents();
	
	
	if (tics>=100){				//fills array for background image
			moneyHistory.shift();
	}
	moneyHistory.push(money);
	drawCanvas();
	
	
		
}, 1000);





function drawCanvas(){
	var largest = Math.max.apply(Math, moneyHistory);
    var c = document.createElement('canvas');
	c.width = document.getElementById('header').offsetWidth;
	c.height = document.getElementById('header').offsetHeight;
	
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.moveTo(0,c.height-(c.height/largest*moneyHistory[0]));
	for(var i =0;i<moneyHistory.length;i++){
		ctx.lineTo((c.width/moneyHistory.length)*i,c.height-(c.height/largest*moneyHistory[i]));
	}
	ctx.stroke();
	
	var dataUrl = c.toDataURL();
	document.getElementById("header").style.background='url('+dataUrl+')';

}





