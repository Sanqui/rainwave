panels.ListenersPanel = {
	ytype: "fit",
	height: 300,
	minheight: 300,
	xtype: "fit",
	width: 300,
	minwidth: 300,
	title: _l("p_ListenersPanel"),
	
	constructor: function(container) {
		var clistc;
		var guest_counter;
		var total_counter;
		var that = {};
		that.container = container;
		
		theme.Extend.ListenersPanel(that);
		
		that.initCListView = function(self) {
			initpiggyback['listeners_current'] = "true";
			lyre.sync_extra['listeners_current'] = "true";
			if (lyre.sync_time > 0) {
				lyre.async_get("listeners_current");
			}
		};
		
		// this gets redefined in that.init
		that.getCurrentTab = function() { return false; };

		that.init = function() {
			view = SplitWindow("listeners", container);
			clistc = view.addTab("clist", _l("ltab_listeners"), that.initCListView);
			view.initTabs();
			that.getCurrentTab = view.getCurrentTab;
			
			clist = ListenersSearchTable(that, clistc, view);
			guest_counter = createEl("div", { "class": "clist_guest_count" }, clistc);
			total_counter = createEl("div", { "class": "clist_total_count" }, clistc);
			
			lyre.addCallback(that.clistUpdate, "listeners_current");
			
			that.onHeightResize(container.offsetHeight);
		};
		
		that.onHeightResize = function(height) {
			view.setHeight(height);
		};
		
		that.openLink = function(link) {
			if (link.type == "listener") {
				that.openListener(link.id);
			}
		};
		
		that.clistUpdate = function(json) {
			clist.update(json.users);
			_l("guestlisteners", { "guests": json.guests }, guest_counter);
			_l("totallisteners", { "total": (json.guests + json.users.length) }, total_counter);
		};
		
		// that.drawListenerCallback = function(json) {
			// var wdow = view.createOpenDiv("artist", json.album_id);
			// wdow.destruct = that.destructArtist;
			// that.drawArtist(wdow, json);
			// artistlist.navToID(json.artist_id);
			// if (typeof(wdow.updateHelp) == "function") wdow.updateHelp();
			// return true;
		// };
		
		that.openListener = function(user_id) {
			// if (view.checkOpenDivs("listener", user_id)) return;
			// lyre.async_get("listener_detail", { "user_id": user_id });
		};
		
		return that;
	}
};

var ListenersSearchTable = function(parent, container, view) {
	var that = SearchTable(container, "user_id", "pl_albumlist");
	that.changeSearchKey("username");
	that.changeSortKey("user_2wkvotes");
	that.changeReverseSort(true);
	
	that.syncdeletes = true;
	
	that.searchAction = function(id) {
		// nothing yet
	};

	that.drawEntry = function(clist) {
		clist.name_td = createEl("td", { "textContent": clist.username, "class": "pl_al_name" }, clist.tr);
		clist.name_td.addEventListener('click', that.updateScrollOffsetByEvt, true);
		clist.votes_td = createEl("td", { "textContent": clist.user_2wkvotes, "class": "pl_al_number" }, clist.tr);
		//Artist.linkify(artist.artist_id, artist_td);
	};
	
	that.drawNavChange = function(artist, highlight) {
		var cl = "pl_available";
		if (highlight) cl += " pl_highlight";
		//if (artist.artist_id == parent.open_artist) cl += " pl_albumopen";
		artist.tr.setAttribute("class", cl);
	};
	
	that.drawUpdate = function(clist) {
		clist.votes_td.textContent = clist.user_2wkvotes;
	};
	
	that.searchEnabled = function() {
		if ((parent.getCurrentTab() == 'clist') && parent.parent.mpi && (parent.parent.mpi.focused = "ListenersPanel")) return true;
		return false;
	};
	
	return that;
};