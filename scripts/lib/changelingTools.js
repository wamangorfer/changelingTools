// Store mapping
Hooks.on("init", () => {
	Changeling.initialize();
	console.log("Init beendet")
});


// Add button to Actor Sheet for opening app
Hooks.on("getActorSheet5eCharacterHeaderButtons", (sheet, buttons) => {
	// If this is not a player character sheet, return without adding the button
	//if (!["character", "PC", "Player"].includes(sheet.actor.type ?? sheet.actor.data.type)) return;
	console.log("im hook")
	buttons.unshift({
		label: "Changeling",
		class: "Changeling-Tools",
		icon: "",
		onclick: () => {
			const userId = $(event.currentTarget).parents('[data-user-id]')?.data()?.userId;
			Changeling.ChangelingConfig.render(true, {userId});

		}
	});
});

class Changeling {
	static ID = 'changelingTools';
	
	static FLAGS = {
	  MASKS: 'masks'
	}
	
	static TEMPLATES = {
	  ChangelingList: `modules/${this.ID}/templates/changelingoptions.hbs`
	}

	static initialize() {
		this.ChangelingConfig = new ChangelingConfig();
	  }
  }

class ChangelingConfig extends FormApplication{

	static get defaultOptions() {
		const defaults = super.defaultOptions;
	  
		const overrides = {
		  height: 'auto',
		  id: 'changeling-options',
		  template: Changeling.TEMPLATES.ChangelingList,
		  title: 'Change your Style',
		  userId: game.userId,
		};
	  
		const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
		
		return mergedOptions;
	  }
 }