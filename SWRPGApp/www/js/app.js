// Components for the campaign screen
Vue.component("campaign-editor", {
	props: ["campaigns"],
	template: `<div>
		<h2>Campaign Editor</h2>
		<div class="row">
            <div class="col-sm-3">

	            <!-- Lists current campaigns -->
	            <ul class="list-group">
	            	<li v-for="campaign in campaigns" class="list-group-item">
	            		<p><strong>{{campaign.name}}</strong></p>
	            		<p>{{campaign.description}}</p>
	            	</li>
	            </ul>

            </div>

            <!-- Either edits the currently selected campaign
            or shows a screen for making a new one. Defaults at new
            campaign window -->
            <div class="col-sm-9">

            	<!-- Buttons for choosing between editing or making new -->
            	<button class="btn btn-default" v-on:click="switchScreen('editCampaign')">Edit Campaign</button>
            	<button class="btn btn-default" v-on:click="switchScreen('newCampaign')">New Campaign</button>

        		<!-- The current form -->
        		<new-campaign v-if="currentScreen === 'newCampaign'" v-bind:campaigns=campaigns></new-campaign>
        		<edit-campaign v-if="currentScreen === 'editCampaign && campaigns.length > 0'" v-bind:campaign=campaigns[currentCamp]></edit-campaign>

            </div>
        </div>
	</div>`,
	data: function(){
		return {
			currentScreen: "newCampaign",
			currentCamp: 0
		};
	},
	methods: {
		switchScreen: function(screen){
			this.currentScreen = screen;
		}
	}

});

Vue.component("new-campaign",{
	props: ["campaigns"],
	template: `<div>
		<h3>New Campaign</h3>
		<div class="form-group">
			<label>Campaign Name</label>
			<input type="text" class="form-control" v-model="name" required/>
		</div>
		<div class="form-group">
			<label>Description</label>
			<textarea class="form-control" v-model="description"></textarea>
		</div>
		<button class="btn btn-primary" v-on:click="addNew">Create Campaign</button>
	</div>`,
	data: function(){
		return {
			name: "",
			description: ""
		};
	},
	methods: {
		addNew: function(){
			if(this.name != ""){
				let newCamp = new Campaign(this.name, this.description);
				console.log(newCamp.description);
				this.campaigns.push(newCamp);
				this.name = "";
				this.description = "";
			}
		}
	}
});

Vue.component("edit-campaign", {
	props: ["campaign"],
	template: `<div>
		<h3>Edit Campaign</h3>
		<div class="form-group">
			<label>Campaign Name</label>
			<input type='text' class="form-control"/>
		</div>
		<div class="form-group">
			<label>Description</label>
			<textarea class='form-control'></textarea>
		</div>
		<button class="btn btn-warning">Edit Campaign</button>
	</div>`,
	data: function(){
		return {
			name: this.campaign.name,
			description: this.campaign.description
		};
	}
});

// The Core app object
let app = new Vue({
	el: "#app",
	data: {
		campaigns: [],
		currentScreen: "campaigns"
	},
	methods: {
		updateLS: function(){

			// Save data to local storage
			localStorage.setItem("SWRPGCampaigns", JSON.stringify(this.campaigns));
		},
		getFromLS: function(){

			// Get data from localStorage and put it in an object
			let dataString = localStorage.getItem("SWRPGCampaigns");
			if(dataString !== null){
				let dataObjs = JSON.parse(dataString);

				// Save it into campaigns as campaign objects
				for(i = 0; i < dataObjs.length; i++){
					this.campaigns[i] = Object.assign(new Campaign(), dataObjs[i]);
				}	
			}
		},
		changeScreens: function(newScreen){
			this.currentScreen = newScreen;
		}
	}
});