panels.NowPanel = {
	ytype: "fit",
	height: 140,
	minheight: 140,
	xtype: "max",
	width: svg.em * 55,
	minwidth: svg.em * 30,
	title: "Now Playing",
	intitle: "NowPanel",
	
	initSizeX: function(x, colw) {
		if (colw > (svg.em * 55)) {
			return (svg.em * 55);
		}
		else if (x > (colw + 117)) {
			return (colw + 117)
		}
		return x;
	},
	
	constructor: function(edi, container) {
		var that = {};

		theme.Extend.NowPanel(that);
		that.evt = [ false, false ];
		that.container = container;
	
		that.init = function() {
			that.width = container.offsetWidth;
			that.height = container.offsetHeight;
			that.draw();
			that.changeHeader(_l("nowplaying"));
			ajax.addCallback(that, that.ajaxHandle, "sched_current");
			user.addCallback(that, that.ratableChange, "current_activity_allowed");
		};
		
		that.ajaxHandle = function(json) {
			var trip = false;
			if (!that.evt[1] || (json.sched_id != that.evt[1].p.sched_id)) trip = true;
			else if ((json.sched_type == SCHED_PLAYLIST) && (that.evt[1].p.sched_type == SCHED_PLAYLIST) && (json.playlist_position != that.evt[1].p.playlist_position)) trip = true;
			else if ((json.sched_type == SCHED_ADSET) && (that.evt[1].p.sched_type == SCHED_ADSET) && (json.adset_position != that.evt[1].p.adset_position)) trip = true;
			if (trip) {
				if (json.sched_type == SCHED_ELEC) that.evt[2] = NPElection(that, json);
				else if (json.sched_type == SCHED_LIVE) that.evt[2] = NPLiveShow(that, json);
				else if (json.sched_type == SCHED_ONESHOT) that.evt[2] = NPOneShot(that, json);
				else if (json.sched_type == SCHED_ADSET) that.evt[2] = NPAdSet(that, json);
				else if (json.sched_type == SCHED_PLAYLIST) that.evt[2] = NPPlaylist(that, json);
				if (user.p.current_activity_allowed == 1) that.evt[2].enableRating();
				if (that.evt[1]) that.evt[1].uninit();
				that.evt[2].init();
				that.evt.shift();
			}
		};
		
		that.ratableChange = function(ratable) {
			if (that.evt[1] != false) {
				if (ratable == 1) {
					that.evt[1].enableRating();
				}
				else {
					that.evt[1].disableRating();
				}
			}
		};
		
		return that;
	}
};

var NPSkeleton = function(npp) {
	var that = {};
	that.parent = npp;
	theme.Extend.NPSkeleton(that, npp);
	
	that.init = function() {
		if (that.song_rating) {
			//help.changeStepPointEl("ratecurrentsong", [ that.song_rating.grid ]);
			//help.changeTopicPointEl("ratecurrentsong", [ that.song_rating.grid ]);
			//help.changeStepPointEl("setfavourite", [ that.song_rating.favbutton ]);
			//help.changeTopicPointEl("setfavourite", false);
		}
		else {
			help.changeStepPointEl("ratecurrentsong", false);
			help.changeTopicPointEl("ratecurrentsong", false);
			help.changeStepPointEl("setfavourite", false);
			help.changeTopicPointEl("setfavourite", false);
		}
		that.animateIn();
	};
	
	that.uninit = function() {
		that.destruct();
		that.animateOut();
	};
	
	that.enableRating = function() {
		if (that.song_rating) {
			that.song_rating.enable();
			that.album_rating.enable();
		}
	};
	
	that.disableRating = function() {
		if (that.song_rating) {
			that.song_rating.disable();
			that.album_rating.disable();
		}
	};
	
	return that;
};

var NPElection = function(npp, json) {
	var that = NPSkeleton(npp);
	that.p = json;
	theme.Extend.NPElection(that);
	that.draw();	
	return that;
};

var NPJingle = function(npp, json) {
	var that = NPSkeleton(npp);
	that.p = json;
	theme.Extend.NPJingle(that);
	that.draw();
	return that;
};

var NPLiveShow = function(npp, json) {
	var that = NPSkeleton(npp);
	that.p = json;
	theme.Extend.NPLiveShow(that);
	that.draw();
	return that;
};

var NPOneShot = function(npp, json) {
	var that = NPSkeleton(npp);
	that.p = json;
	theme.Extend.NPOneShot(that);
	that.draw();
	return that;
};

var NPPlaylist = function(npp, json) {
	var that = NPSkeleton(npp);
	that.p = json;
	theme.Extend.NPPlaylist(that);
	that.draw();
	return that;
};

var NPAdSet = function(npp, json) {
	var that = NPSkeleton(npp);
	that.p = json;	
	theme.Extend.NPAdSet(that);
	that.draw();
	return that;
};