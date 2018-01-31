Vue.component("vehicle-editor", {
	template: `<div>
		<h2>Vehicle Editor</h2>
		<div class="row">

			<!-- List of player vehicles -->
			<div class="col-md-3">
				<ul>
					<li v-for="vehicle in vehicles">
						<p><strong>{{vehicle.name}}</strong></p>
						<p>{{vehicle.model}}</p>
					</li>
				</ul>
			</div>

			<!-- Vehicle editor -->
			<div class="col-md-9">
				<button class="btn btn-primary">New Vehicle</button>
				<new-vehicle v-if="currentView === 'new-vehicle'" v-bind:vehicles="vehicles"></new-vehicle>

			</div>
		</div>
	</div>`,

	data(){
		return {
			currentView: "new-vehicle",
			vehicles: []
		};
	},

	methods: {
		changeScreen(newScreen){
			this.currentView = newScreen;
		}
	}
});

Vue.component("new-vehicle", {
	props: ["vehicles"],
	template: `
		<div>
			<h3>New Vehicle</h3>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link" v-bind:class="{active: currentView === 'stats'}" v-on:click="changeView('stats')">Stats</a>
				</li>
				<li class="nav nav-tabs">
					<a class="nav-link" v-bind:class="{active: currentView === 'info'}" v-on:click="changeView('info')">Info</a>
				</li>
			</ul>

			<!-- Components for the new vehicle -->
			<new-vehicle-stats 
				v-if="currentView === 'stats'"

				v-bind:name="name"
				v-bind:silhouette="silhouette"
				:speed="speed"
				:handling="handling"

				:foreDefense="foreDefense"
				:portDefense="portDefense"
				:starboardDefense="starboardDefense"
				:aftDefense="aftDefense"

				:armor="armor"
				:hullTrauma="hullTrauma"
				:systemStrain="systemStrain"
				>
			</new-vehicle-stats>

			<new-vehicle-info 
				v-if="currentView === 'info'"

				v-bind="hullType"
				:manufacturer="manufacturer"
				:primaryHyperdrive="primaryHyperdrive"
				:secondaryHyperdrive="secondaryHyperdrive"

				:navicomputer="navicomputer"
				:sensorRange="sensorRange"

				:shipsComplement="shipsComplement"
				:encumbranceCapacity="encumbranceCapacity"
				:passengerCapacity="passengerCapacity"
				:consumables="consumables"

				:cost="cost"
				:rarity="rarity"
				:hardpoints="hardpoints"
				:weapons="weapons"
				>
			</new-vehicle-info>
			
			<button class="btn btn-primary">Save Vehicle</button>
		</div>`,

		methods: {

			saveVehicle(){
				let newVehicle = new Vehicle({
					name: this.name,

					// Speed / handling
					silhouette: this.silhouette,
					speed: this.speed,
					handling: this.handling,

					// Defense
					foreDefense: this.foreDefense,
					portDefense: this.portDefense,
					starboardDefense: this.starboardDefense,
					aftDefense: this.aftDefense,

					// Vehicle endurance
					armor: this.armor,
					hullTrauma: this.hullTrauma,
					systemStrain: this.systemStrain,

					// Info

					hullType: this.hullType,
					manufacturer: this.manufacturer,

					primaryHyperdrive: this.primaryHyperdrive,
					secondaryHyperdrive: this.secondaryHyperdrive,

					navicomputer: this.navicomputer,
					sensorRange: this.sensorRange,

					shipsComplement: this.shipsComplement,
					encumbranceCapacity: this.encumbranceCapacity,
					passengerCapacity: this.passengerCapacity,
					consumables: this.consumables,

					cost: this.cost,
					rarity: this.rarity,
					hardpoints: this.hardPoints,
					weapons: this.weapons

				});
				this.vehicles.push(newVehicle);
			},

			changeView(newView){
				this.currentView = newView;
			}
		},

		data(){
			return {
				// App variables
				currentView: "stats",

				// Vehicle Stats
				name: "",

				// Speed / handling
				silhouette: 1,
				speed: 1,
				handling: 0,

				// Defense
				foreDefense: 0,
				portDefense: 0,
				starboardDefense: 0,
				aftDefense: 0,

				// Vehicle endurance
				armor: 0,
				hullTrauma: 1,
				systemStrain: 1,

				//Vehicle Info
				hullType: "",
				manufacturer: "",

				primaryHyperdrive: 0,
				secondaryHyperdrive: 0,

				navicomputer: false,
				sensorRange: "short",

				shipsComplement: "",
				encumbranceCapacity: 0,
				passengerCapacity: 0,
				consumables: "",

				cost: 0,
				rarity: 1,
				hardpoints: 0, 
				weapons: []
			};
		}
});

Vue.component("new-vehicle-stats", {
	props: ["name",
		"silhouette",
		"speed",
		"handling",

		"foreDefense",
		"portDefense",
		"starboardDefense",
		"aftDefense", 

		"armor",
		"hullTrauma",
		"systemStrain"
		],
	template: `<div>
	<!-- Name / Model -->
		<div class="row">
			<div class="col-xs-6">
				<div class="form-group">
					<label>Vehicle Name</label>
					<input type="text" class="form-control" v-model="name"/>
				</div>
			</div>
		</div>

		<!-- Size/Speed -->
		<div class="row">

			<!-- Silhouette -->
			<div class="col-xs-4">
				<label>Silhouette</label>
				<input type="number" class="form-control" min="1" max="20" v-model="silhouette"/>
			</div>

			<!-- Speed -->
			<div class="col-xs-4 form-group">
				<label>Speed</label>
				<input type="number" class="form-control" min="0" max="10" v-model="speed"/>
			</div>

			<!-- Handling -->
			<div class="col-xs-4 form-group">
				<label>Handling</label>
				<input type="number" class="form-control" min="-5" max="5" v-model="handling"/>
			</div>
		</div>

		<!-- Defense -->
		<div class="row">

			<!-- Fore defense -->
			<div class="col-xs-3">
				<div class="form-group">
					<label>Fore Defense</label>
					<input type="number" class="form-control" min="0" max="5" v-model="foreDefense"/>
				</div>
			</div>

			<!-- Port defence -->
			<div class="col-xs-3">
				<div class="form-group">
					<label>Port Defense</label>
					<input type="number" class="form-control" min="0" max="5" v-model="portDefense"/>
				</div>
			</div>

			<!-- Starboard defense -->
			<div class="col-xs-3">
				<div class="form-group">
					<label>Starboard Defense</label>
					<input type="number" class="form-control" min="0" max="5" v-model="starboardDefense"/>
				</div>
			</div>

			<!-- Aft defense -->
			<div class="col-xs-3"> 
				<div class="form-group">
					<label>Aft Defense</label>
					<input type="number" class="form-control" min="0" max="5" v-model="aftDefense"/>
				</div>
			</div>
		</div>

		<!-- Vehicle endurance -->
		<div class="row">

			<!-- Armor -->
			<div class="col-xs-4 form-group">
				<label>Armor</label>
				<input type="number" class="form-control" min="0" max="20" v-model="armor"/>
			</div>

			<!-- Hull Trauma -->
			<div class="col-xs-4 form-group">
				<label>Hull Trauma</label>
				<input type="number" class="form-control" min="0" max="1000" v-model="hullTrauma"/>
			</div>

			<!-- System Strain -->
			<div class="col-xs-4 form-group">
				<label>System Strain</label>
				<input type="number" class="form-control" min="0" max="800" v-model="systemStrain"/>
			</div>	
		</div>
	</div>`
});

Vue.component("new-vehicle-info", {
	props: ["hullType",
		"manufacturer",

		"primaryHyperdrive",
		"secondaryHyperdrive",

		"navicomputer",
		"sensorRange",

		"shipsComplement",
		"passengerCapacity",
		"encumbranceCapacity",
		"consumables",

		"cost",
		"rarity",
		"hardpoints",
		"weapons"],
	template: `<div>
		<div class="form-group">
			<label>Hull Type/Class</label>
			<input type="text" class="form-control" v-model="hullType"/>
		</div>
		<div class="form-group">
			<label>Manufacturer</label>
			<input type="text" class="form-control" v-model="manufacturer"/>
		</div>

		<!-- Hyperdrive -->
		<div class="row">
			<div class="form-group col-xs-6">
				<label>Primary Hyperdrive Class</label>
				<input type="number" class="form-control" v-model="primaryHyperdrive"/>
			</div>
			<div class="form-group col-xs-6">
				<label>Secondary Hyperdrive</label>
				<input type="number" class="form-control" v-model="secondaryHyperdrive"/>
			</div>
		</div>
	</div>`
});

Vue.component("input-text", {
	props: ["text"],
	template: `<div class="form-group">
		<label>{{thisname}}</label>
		<input type="text" class="form-control" v-model="text"/>
	</div>`,
	data(){
		return {
			name: ""
		};
	}
});

Vue.component("input-number",{
	props: ["number"],
	template: `<div>

	</div>`
})