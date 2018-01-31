class Campaign{
	constructor(name="", description=""){
		// Main properties
		this.name = name;
		this.description = description;

		// Other properties
		this.characters = [];
		this.vehicles = [];
		this.encounters = [];
		this.duties = [];
		this.obligations = [];
	}
}

class Character{
	constructor(name, background){
		this.name = name;
		this.background = background;

		// Stats
		this.characteristics = {};
		this.skills = {};	

		// Line-specific mechanics
		this.obligations = {};
		this.duties = {};
	}
}

class Vehicle{
	constructor(obj={}){
		this.name = "";

		this.silhouette = 0;
		this.speed = 0;
		this.handling = 0;

		// Defense stats
		this.foreDefense = 0; // Forward defence
		this.portDefense = 0; // Port defense
		this.starboardDefense = 0; // Starboard defence
		this.aftDefense = 0; // Aft defence

		this.armor = 0;
		this.hullTrauma = 0;
		this.sysStrain = 0;

		// Information
		this.hullType = "";
		this.manufacturer = "";
		this.primaryHyperdrive = 0;
		this.secondaryHyperdrive = 0;
		this.navicomputer = false;
		this.sensorRange = "short";
		this.shipsComplement = "";
		this.encumbranceCapacity = 0;
		this.passengerCapacity = 0;
		this.consumables = "";
		this.cost = 0;
		this.rarity = 1;
		this.hardPoints = 0;
		this.weapons = [];

		for(key in obj){
			this[key] = obj[key];
		}
	}
}