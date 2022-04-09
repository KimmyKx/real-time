class Event {
	/**
	* @param {String} name
	* @param {CallableFunction} callback
	*/ 
	constructor(name, callback) {
		this.name = name;
		this.callback = callback;
	}
}

module.exports = Event;