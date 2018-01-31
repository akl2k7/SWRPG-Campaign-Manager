// Components for character editor
Vue.component("character-editor", {
	props: ["campaign"],
	template: `<div>
		<h2>Character Editor</h2>
		<div class="row">

			<!-- Section for a list of characters in the campaign, starting with players and ending with npcs -->
			<div class="col-md-3">

			</div>

			<!-- Section for viewing, editing and creating characters -->
			<div class="col-md-9">
				<button class="btn btn-primary">View Character</button>
				<button class="btn btn-default">Edit Character</button>
				<button class="btn btn-default">New Character</button>

				<!-- Area for the actual screen -->
				<new-character v-if="currentScreen === 'newCharacter'"></new-character>
			</div>
		</div>
	</div>`,
	data: function(){
		return {
			currentScreen: "newCharacter"
		};
	}
});

// Components for the new-character screen
Vue.component("new-character", {
	template: `<div>
		<h3>New Character</h3>
		<!-- Navigation through the new character screen -->
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<a href="#" class="nav-link" v-bind:class="{active: currentScreen === 'ncCharacteristics'}" v-on:click="changeScreen('ncCharacteristics')">Characteristics</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link" v-bind:class="{active: currentScreen === 'ncMotivations'}" v-on:click="changeScreen('ncMotivations')">Motivations</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link" v-bind:class="{active: currentScreen === 'ncSkills'}" v-on:click="changeScreen('ncSkills')">Skills</a>
			</li>
		</ul>

		<nc-characteristics v-if="currentScreen === 'ncCharacteristics'"></nc-characteristics>
		<nc-motivations v-if="currentScreen === 'ncMotivations'"></nc-motivations>
		<nc-skills v-if="currentScreen === 'ncSkills'"></nc-skills>
	</div>`,
	data: function(){
		return {
			currentScreen: "ncCharacteristics"
		};
	},
	methods: {
		changeScreen(newScreen){
			this.currentScreen = newScreen;
		}
	}
});

Vue.component("nc-characteristics", {template: `<div></div>`});

Vue.component("nc-motivations", {template: `<div></div>`});

Vue.component("nc-skills", {template: `<div></div>`});