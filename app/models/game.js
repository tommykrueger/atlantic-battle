var Model = require('./model');

module.exports = Model.extend({
	
	timeInterval: null,

	months: [
		'january', 
		'february', 
		'march', 
		'april', 
		'may', 
		'june', 
		'july', 
		'august', 
		'september', 
		'october', 
		'november', 
		'december'
	],

	weekdays: [
		'monday', 
		'tuesday', 
		'wednesday', 
		'thursday', 
		'friday', 
		'saturday', 
		'sunday'
	],

	defaults: {
		id: null,
		
		// one hour in game is 1 seconds in real time
		speed: 1000,
		startDate: '01-09-1939',

		hour: 0,
		day: 1,
		month: 6,
		year: 1940,
		
		startHour: 0,
		startDay: 1,
		startMonth: 7,
		startYear: 1940,
		
		month_days: 30,

		processedMilliseconds: 0,
	},

	intitialize : function(values){
		Model.prototype.initialize.call(this, values);

		_.bindAll(this, 'calculateTime');
	},

	startGame: function(){
		var $this = this;

		var i=0;

		this.timeInterval = setInterval(function(){
			console.log(i);
			console.log($this.defaults.hour);

			$this.calculateTime();
			$this.processedMilliseconds += 1000;

			i++;
		}, $this.defaults.speed);

	},

	pauseGame: function(){

	},

	calculateTime : function() {
		if(this.defaults.month == 11)
		{
			this.defaults.month = 0;
			this.defaults.year++;
		}
		if(this.defaults.day == this.month_days)
		{
			this.defaults.day = 1;
			this.defaults.month++;
		}
		if(this.defaults.hour == 23)
		{
			this.defaults.hour = 0;
			this.defaults.day++;
		}

		this.defaults.hour++;
		
		var weekday = this.defaults.day % 7;
		$('#weekday').text(this.weekdays[weekday]);

		if(this.defaults.day <= 9)
			$('#day').text('0' + this.defaults.day + '.');
		else
			$('#day').text(this.defaults.day + '.');
		

		$('#month').text(this.months[this.defaults.month]);
		$('#year').text(this.defaults.year);
		$('#time').text(this.defaults.hour + ':00 Uhr');
	}
});