document.getElementById("body").style.fontFamily = "Tahoma, Sans-Serif";
document.getElementById("body").style.fontSize = "0.8em";

function EdiTheme() {
	var that = {};
	var skindir = "skins_r" + BUILDNUM + "/RWClassic";

	that.textcolor = "#FFFFFF";
	that.TimelineSong_height = (svg.em + 9) * 3;		// font size + padding * 3 rows
	that.Timeline_headerheight = svg.em * 0.8 + 4;
	that.borderheight = 12;
	that.borderwidth = 12;
	that.name = _l("s_RainwaveClassic");
	that.MPI_MenuHeight = svg.em * 2;
	that.MPI_MenuYPad = 2;
	that.PLS_AlbumHeight = svg.em * 1.5;
	that.helplinecolor = "#c287ff";
	
	//panels.NowPanel.height = (that.TimelineSong_height * 3) + 12;
	
	// The following variables are internal to that theme, related to a specific "class"
	that.Timeline_leftsidesize = 10;
	
	that.TimelineSong_rowheight = that.TimelineSong_height / 3;
	that.TimelineSong_leftclipext = 1;			// how many rows the timeline song left clip uses

	// The following are variables used internally by the theme
	that.linkcolor = "#6cf6ff";
	that.darktext = "#CCCCCC";
	that.vdarktext = "#777777";
	that.primarybkg = "#233844";
	that.brightbkg = "#3f4b52";	
	that.songborderdark = "#355669";
	that.songborderbright = "#7d94a1";
	that.ediborderdark = "#000000";
	that.ediborderbright = that.songborderdark;
	that.indicnormal = "#244093";
	that.indicnormalbright = "#3c6dff";
	that.indicwarn = "#84880c"; // 666717
	that.indicwarnbright = "#C2C810";
	that.indicconflict = that.indicwarn;
	that.indicconflictbright = that.indicwarnbright;
	that.indicrequest = "#247293";
	that.indicrequestbright = "#3585c3";

	// Edi required variable that depends on previously-defined variables
	// text ratings + grid size + fav margin + fav + padding
	that.Rating_shortwidth = 75;
	that.Rating_width = Math.floor((svg.em * 2.2) + that.Rating_shortwidth);
	
	var logoheight = 40;
	var logowidth = 200;
	var votebkg_width = 680;
	
	that.Extend = {};

	that.allDefs = function(svgel, defs) {
		that.borderDefs(svgel, defs);
		that.menuDefs(svgel, defs);
		that.graphDefs(svgel, defs);
	};

	/*****************************************************************************
	  EDI BORDERS
	  
	  These border functions are passed <svg> elements.
	*****************************************************************************/

	that.borderDefs = function(svgel, defs) {
		var gright = svg.makeGradient("linear", "bleft", "100%", "0%", "0%", "0%", "pad");
		gright.appendChild(svg.makeStop("30%", that.ediborderdark, 0));
		gright.appendChild(svg.makeStop("50%", that.ediborderbright, 1));
		gright.appendChild(svg.makeStop("97%", that.ediborderbright, 1));
		gright.appendChild(svg.makeStop("100%", that.ediborderdark, 0));

		var gleft = svg.makeGradient("linear", "bright", "0%", "0%", "100%", "0%", "pad");
		gleft.appendChild(svg.makeStop("30%", that.ediborderdark, 0));
		gleft.appendChild(svg.makeStop("50%", that.ediborderbright, 1));
		gleft.appendChild(svg.makeStop("97%", that.ediborderbright, 1));
		gleft.appendChild(svg.makeStop("100%", that.ediborderdark, 0));

		var gtop = svg.makeGradient("linear", "btop", "0%", "100%", "0%", "0%", "pad");
		gtop.appendChild(svg.makeStop("30%", that.ediborderdark, 0));
		gtop.appendChild(svg.makeStop("50%", that.ediborderbright, 1));
		gtop.appendChild(svg.makeStop("97%", that.ediborderbright, 1));
		gtop.appendChild(svg.makeStop("100%", that.ediborderdark, 0));

		var gbottom = svg.makeGradient("linear", "bbottom", "0%", "0%", "0%", "100%", "pad");
		gbottom.appendChild(svg.makeStop("30%", that.ediborderdark, 0));
		gbottom.appendChild(svg.makeStop("50%", that.ediborderbright, 1));
		gbottom.appendChild(svg.makeStop("97%", that.ediborderbright, 1));
		gbottom.appendChild(svg.makeStop("100%", that.ediborderdark, 0));
		
		/*var virregular = svg.makeGradient("linear", "bvirregular", "0%", "0%", "0%", "100%", "pad");
		virregular.appendChild(svg.makeStop("0%", that.ediborderdark, 0));
		virregular.appendChild(svg.makeStop("5%", that.ediborderbright, 1));
		virregular.appendChild(svg.makeStop("30%", that.ediborderbright, 1));
		virregular.appendChild(svg.makeStop("40%", that.ediborderbright, 0));*/

		defs.appendChild(gright);
		defs.appendChild(gleft);
		defs.appendChild(gtop);
		defs.appendChild(gbottom);
		//defs.appendChild(virregular);
	};

	that.borderVertical = function(border) {
		var bkg = svg.makeRect("50%", 0, 1, "100%");
		if (border.irregular && !border.vfirst) {
			bkg.setAttribute("fill", "url(#bvirregular)");
		}
		else {
			if (!border.vlast) bkg.setAttribute("fill", "url(#bbottom)");
			else bkg.setAttribute("fill", "url(#btop)");
		}
		border.el.appendChild(bkg);
	};

	that.borderHorizontal = function(border) {
		var bkg = svg.makeRect(0, "50%", "100%", 1);
		if (!border.hlast) bkg.setAttribute("fill", "url(#bright)");
		else bkg.setAttribute("fill", "url(#bleft)");
		border.el.appendChild(bkg);
	};
	
	/*****************************************************************************
	  RATING EFFECTS
	*****************************************************************************/
	
	fx.extend("UserRating", function(object, duration) {
		var urfx = {};
		urfx.duration = duration;
		urfx.update = function() {
			var px = Math.round(urfx.now * 10);
			if (px <= 16) object.user_on.style.width = px + "px";
			else object.user_on.style.width = "16px";
			if (px >= 8) object.user_bar.style.backgroundPosition = (px - 50) + "px 0px";
			else object.user_bar.style.backgroundPosition = "-50px 0px";
			var text = (Math.round(urfx.now * 10) / 10).toFixed(1);
			if (text == "0.0") text = "";
			object.user_text.textContent = text;
		};
			
		return urfx;
	});
	
	fx.extend("SiteRating", function(object, duration) {
		var srfx = {};
		srfx.duration = duration;
		srfx.update = function() {
			var px = Math.round(srfx.now * 10);
			if (px <= 8) {
				object.site_on.style.opacity = "0"
				object.site_bar.style.backgroundPosition = "-50px 0px";
			}
			else {
				object.site_on.style.opacity = "1"
				object.site_bar.style.backgroundPosition = (px - 50) + "px 0px";
			}
		};
			
		return srfx;
	});

	/*****************************************************************************
	  RATING
	*****************************************************************************/

	that.Extend.Rating = function(ro) {
		var fx_user;
		var fx_site;
		var fx_fav;
		
		// This function required by Edi
		ro.draw = function(x, y, scale) {
			ro.el = createEl("div", { "class": "rating" });
			ro.user_text = createEl("span", { "class": "rating_text" }, ro.el);
			ro.fav = createEl("img", { "src": skindir + "/images/rating_fav.png", "class": "rating_fav" }, ro.el);
			ro.user_on = createEl("div", { "class": "rating_user_on" }, ro.el);
			ro.user = createEl("div", { "class": "rating_user" }, ro.el);
			ro.user_bar = createEl("div", { "class": "rating_user_bar" }, ro.user);
			ro.site_on = createEl("img", { "src": skindir + "/images/rating_site_on.png", "class": "rating_site_on" }, ro.el);
			ro.site = createEl("div", { "class": "rating_site" }, ro.el);
			ro.site_bar = createEl("div", { "class": "rating_site_bar" }, ro.site);
			ro.grid = createEl("img", { "src": skindir + "/images/rating_grid.png", "class": "rating_grid" }, ro.el);
			
			fx_user = fx.make(fx.UserRating, [ ro, 250 ]);
			fx_site = fx.make(fx.SiteRating, [ ro, 250 ]);
			fx_fav = fx.make(fx.CSSNumeric, [ ro.fav, 250, "opacity", "" ]);	
		};

		// Required by Edi
		ro.setUser = function(userrating) {
			fx_user.set(userrating);
		};

		// Required by Edi
		ro.resetUser = function() {
			fx_user.start(ro.userrating);
		};

		// ro function required by Edi.  It may be called in animation functions.
		ro.setSite = function(siterating) {
			fx_site.set(siterating);
		};

		// ro function required by Edi.  Return the rating here.
		// Edi will filter for the 0.5 stepping, and the API won't allow anything but 0.5 steps, so don't try and be cute. :)
		ro.userCoord = function(evt) {
			// TODO
		};

		// ro function required by Edi.  State: 2 = mouseover, 1 = favourite, 0 = not favourite
		ro.favChange = function(state) {
			if (state == 2) fx_fav.start(0.70)
			else if (state) fx_fav.start(1);
			else fx_fav.start(0);
		};

		ro.showConfirmClick = function() {
			// TODO
		};

		ro.showConfirmOK = function() {
			// TODO
		};

		ro.showConfirmBad = function() {
			// TODO
		};

		ro.resetConfirm = function() {
			// TODO
		};
		
		return ro;
	};

	/*****************************************************************************
	 TIMELINE
	*****************************************************************************/
	
	that.Extend.TimelinePanel = function(tl) {
		tl.draw = function() {
			// nothing
		};		
		return tl;
	};

	/*****************************************************************************
	 TIMELINE ELECTION
	*****************************************************************************/
	
	that.drawTimelineTable = function(evt, text, indic) {
		evt.el = createEl("table", { "class": "timeline_table", "cellspacing": 0 });
		evt.el.style.width = evt.container.offsetWidth + "px";
		var tr = createEl("tr", {}, evt.el);
		evt.header_indicator = createEl("td", { "class": "timeline_header_indicator timeline_header_indicator_" + indic }, tr);
		evt.header_td = createEl("td", { "class": "timeline_header timeline_header_" + indic }, tr);
		evt.header_clock = createEl("div", { "class": "timeline_clock" }, evt.header_td);
		evt.clock = evt.header_clock;
		evt.header_text = createEl("span", { "class": "timeline_header_text", "textContent": text }, evt.header_td);
	}
	
	that.Extend.TimelineSkeleton = function(te) {
		te.changeHeadline = function(newtext) {
			te.header_text.textContent = newtext;
		};
		
		te.drawAsCurrent = function() {
			te.clock.textContent = "";
			te.clockdisplay = false;
		};
		
		te.moveTo = function(y) {
			te.topfx.start(y);
		};
		
		te.moveXTo = function(x) {
			te.leftfx.start(x);
		};
		
		te.hideX = function() {
			te.leftfx.set(-te.el.offsetWidth)
		};
		
		te.setY = function(y) {
			te.topfx.set(y);
		};
		
		te.setX = function(x) {
			te.leftfx.set(x);
		};
		
		te.changeZ = function(z) {
			te.el.style.zIndex = z;
		};
		
		te.clockUndraw = function() {
			te.header_td.removeChild(te.header_clock);
		};
		
		te.recalculateHeight = function() {
			te.height = te.el.offsetHeight;
		};
		
		te.defineFx = function() {
			te.topfx = fx.make(fx.CSSNumeric, [ te.el, 700, "top", "px" ]);
			te.topfx.set(te.container.offsetHeight);
			te.leftfx = fx.make(fx.CSSNumeric, [ te.el, 700, "left", "px" ]);
			te.leftfx.set(0);
		};
		
		te.sortSongOrder = function() {};
	}
	
	that.Extend.TimelineElection = function(te) {
		te.draw = function() {
			var reqstatus = 0;
			for (var i = 0; i < te.songs.length; i++) {
				if (te.songs[i].p.elec_isrequest == 1) {
					reqstatus = 1;
					break;
				}
			}
			var indic = reqstatus == 1 ? "request" : "normal";
			that.drawTimelineTable(te, _l("election"), indic);
			te.defineFx();
		};
		
		te.drawShowWinner = function() {
			for (var i = 1; i < te.songs.length; i++) {
				te.songs[i].tr1_fx.start(0);
				te.songs[i].tr2_fx.start(0);
				te.songs[i].tr3_fx.start(0);
			}
			te.songs[0].tr3_fx.onComplete2 = function() { te.songs[0].indicator.setAttribute("rowspan", 2); }
			te.songs[0].tr3_fx.start(0);
		};
		
		te.sortSongOrder = function() {
			for (var i = 0; i < te.songs.length; i++) {
				te.el.appendChild(te.songs[i].tr1);
				te.el.appendChild(te.songs[i].tr2);
				te.el.appendChild(te.songs[i].tr3);
			}
		};
		
		te.recalculateHeight = function() {
			if (te.showingwinner) {
				te.height = te.header_td.offsetHeight + te.songs[0].song_title.offsetHeight + te.songs[0].album_name.offsetHeight + 5;
			}
			else {
				te.height = te.el.offsetHeight;
			}
		};
	};
	
	that.Extend.TimelineAdSet = function(tas) {
		tas.draw = function() {
			that.drawTimelineTable(tas, _l("adset"), "normal");

			var tr, td, header;
			for (var i = 0; i < tas.p.ad_data.length; i++) {
				tr = createEl("tr", {}, tas.el);
				if (i == 0) {
					header = createEl("td", { "class": "timeline_indicator_normal", "rowspan": tas.p.ad_data.length }, tr);
					createEl("img", { "src": "images/blank.png", "style": "width: 10px; height: 20px;" }, header);
				}
				td = createEl("td", { "class": "timeline_td" }, tr);
				if (tas.p.ad_data[i].ad_url) {
					createEl("a", { "href": tas.p.ad_data[i].ad_url, "textContent": tas.p.ad_data[i].ad_title }, td);
				}
				else {
					createEl("span", { "textContent": tas.p.ad_data[i].ad_title }, td);
				}
			}
			tas.defineFx();
		};
	};
	
	that.Extend.TimelineLiveShow = function(tls) {
		tls.draw = function() {
			that.drawTimelineTable(te, _l("liveshow"), "normal");
			var tr = createEl("tr", {}, tls.el);
			createEl("td", { "class": "timeline_indicator_normal", "rowspan": 3 }, tr);
			createEl("td", { "class": "timeline_td", "textContent": tls.p.sched_name }, tr);
			tr = createEl("tr", {}, tls.el);
			createEl("td", { "class": "timeline_td", "textContent": tls.p.sched_notes }, tr);
			tr = createEl("tr", {}, tls.el);
			createEl("td", { "class": "timeline_td", "textContent": tls.p.username }, tr);
			tls.defineFx();
		};
	};
	
	that.Extend.TimelinePlaylist = function(tpl) {
		tpl.draw = function() {
			that.drawTimelineTable(te, _l("playlist"), "normal");
			tpl.defineFx();
		};
	};
	
	that.Extend.TimelineOneShot = function(tos) {
		tos.draw = function() {
			var hltitle = _l("onetimeplay");
			if (tos.p.user_id) hltitle += " from " + tos.p.username;
			that.drawTimelineTable(te, hltitle, "normal");
			
			if (tos.p.user_id == user.p.user_id) {
				tos.header_text.textContent = _l("deleteonetime");
				tos.header_text.style.cursor = "pointer";
				tos.header_text.addEventListener("click", tos.deleteOneShot, true);
			}

			tos.defineFx();
		};
	};

	/*****************************************************************************
	TIMELINE SONG
	*****************************************************************************/
	
	that.Extend.TimelineSong = function(ts) {
		var fx_votebkg_x;
		var fx_votebkg_y;
		var votelock_timer;
		var votelock_started;
		var fx_swipe;
		
		ts.draw = function() {
			var indic = "normal";
			if (ts.isreq == 1) indic = "request";
			else if (ts.isreq < 0) indic = "conflict";
			
			ts.tr1 = createEl("tr", {});
			ts.tr1_fx = fx.make(fx.OpacityRemoval, [ ts.tr1, ts.parent.el, 250 ]);
			ts.tr1_fx.set(1);
			ts.indicator = createEl("td", { "class": "timeline_indicator timeline_indicator_" + indic, "rowspan": 3 }, ts.tr1);
			// for indicator_fx check the "if (ts.song_requestor)" block below
			var argh = createEl("img", { "src": "images/blank.png", "class": "timeline_indicator_argh" }, ts.indicator);
			ts.song_td = createEl("td", { "class": "timeline_td timeline_song_td timeline_song_td_" + indic }, ts.tr1);
			ts.vote_hover_el = createEl("div", { "class": "timeline_vote_hover" }, ts.song_td);
			ts.swipe = createEl("div", { "class": "timeline_vote_swipe" }, ts.song_td);
			ts.song_rating_bkg = createEl("div", { "class": "timeline_song_rating_bkg" }, ts.song_td);
			ts.song_rating_c = createEl("div", { "class": "timeline_song_rating_c" }, ts.song_td);
			ts.song_rating = Rating({ category: "song", "id": ts.p.song_id, "userrating": ts.p.song_rating_user, "siterating": ts.p.song_rating_avg, "favourite": ts.p.song_favourite, "register": true });
			ts.song_rating_c.appendChild(ts.song_rating.el);
			ts.song_time = createEl("div", { "class": "timeline_song_time", "textContent": formatTime(ts.p.song_secondslong) }, ts.song_td);
			ts.song_title = createEl("div", { "class": "song_title", "textContent": ts.p.song_title }, ts.song_td);
			
			ts.tr2 = createEl("tr", {});
			ts.tr2_fx = fx.make(fx.OpacityRemoval, [ ts.tr2, ts.parent.el, 250 ]);
			ts.tr2_fx.set(1);
			ts.album_td = createEl("td", { "class": "timeline_td timeline_album_td" }, ts.tr2);
			ts.album_rating_c = createEl("div", { "class": "timeline_song_rating_c" }, ts.album_td);
			ts.album_rating = Rating({ category: "album", "id": ts.p.album_id, "userrating": ts.p.album_rating_user, "siterating": ts.p.salbum_rating_avg, "favourite": ts.p.album_favourite, "register": true });
			ts.album_rating_c.appendChild(ts.album_rating.el);
			ts.album_rating_bkg = createEl("div", { "class": "timeline_song_rating_bkg" }, ts.album_td);
			if (ts.p.elec_isrequest == 1) {
				ts.song_requestor = createEl("div", { "class": "timeline_song_requestor timeline_song_requestor_request", "textContent": _l("requestedby") + " " ts.p.song_requestor });
			}
			else if (ts.p.elec_isrequest < 0) {
				ts.song_requestor = createEl("div", { "class": "timeline_song_requestor timeline_song_requestor_conflict", "textContent": _l("conflictswith") + " " + ts.p.song_requestor });
			}
			if (ts.song_requestor) {
				ts.song_requestor_wrap = createEl("div", { "class": "timeline_song_requestor_wrap" }, ts.album_td);
				ts.song_requestor_wrap.appendChild(ts.song_requestor);
				ts.song_requestor.style.height = (ts.album_td.offsetHeight + 1) + "px";
				ts.song_requestor_wrap.style.height = (ts.album_td.offsetHeight + 1) + "px";
				ts.song_requestor_fx = fx.make(fx.CSSNumeric, [ ts.song_requestor, 250, "marginTop", "px" ]);
				ts.song_requestor_fx.height = ts.song_requestor.offsetHeight;
				ts.song_requestor_fx.set(-ts.song_requestor_fx.height);
				ts.indicator_fx = fx.make(fx.BackgroundPosY, [ ts.indicator, 250 ]);
			}
			ts.album_name = createEl("div", { "class": "timeline_album_title", "textContent": ts.p.album_name }, ts.album_td);
			
			ts.tr3 = createEl("tr", {});
			ts.tr3_fx = fx.make(fx.OpacityRemoval, [ ts.tr3, ts.parent.el, 500 ]);
			ts.tr3_fx.set(1);
			ts.artist_td = createEl("td", { "class": "timeline_td timeline_artist_td" }, ts.tr3);
			Artist.allArtistToHTML(ts.p.artists, ts.artist_td);
		
			fx_votebkg_x = fx.make(fx.BackgroundPosX, [ ts.song_td, 300 ]);
			fx_votebkg_x.set(-votebkg_width);
			fx_votebkg_y = fx.make(fx.BackgroundPosY, [ ts.song_td, 300 ]);
			fx_votebkg_y.set(0);
			fx_swipe = fx.make(fx.BackgroundPosY, [ ts.swipe, 500 ]);
			fx_swipe.onComplete = ts.endSwipe();
			fx_swipe.set(ts.song_td.offsetHeight);
			
			if (prefs.p.timeline.highlightrequests.value && (ts.p.elec_isrequest != 0)) {
				ts.voteHoverOn();
			}
		};

		ts.destruct = function() {
			ts.song_rating.destruct();
			ts.album_rating.destruct();
		};

		ts.showVotes = function() {
			if (ts.p.elec_votes > 0) {
				ts.song_time.textContent = ts.p.elec_votes;
			}
			else {
				ts.song_time.textContent = "";
			}
		};

		ts.showSongLength = function() {
			ts.song_time.textContent = formatNumberToMSS(ts.p.song_secondslong);
		};

		ts.voteHoverOn = function(evt) {
			if (!votelock_timer) {
				fx_votebkg_x.stop();
				fx_votebkg_x.duration = 300;
				fx_votebkg_x.start(-votebkg_width + ts.song_td.offsetWidth + 11);
				if (ts.song_requestor) {
					ts.song_requestor_fx.start(0);
					ts.indicator_fx.start(-22 + ts.album_td.offsetHeight);
				}
			}
		};

		ts.voteHoverOff = function(evt) {
			if (!votelock_timer) {
				fx_votebkg_x.stop();
				fx_votebkg_x.duration = 300;
				fx_votebkg_x.start(-votebkg_width);
				if (ts.song_requestor) {
					ts.song_requestor_fx.start(-ts.song_requestor_fx.height - 1);
					ts.indicator_fx.start(-22);
				}
			}
		};

		ts.startVoting = function() {
			fx_votebkg_x.stop();
			fx_votebkg_x.set(-votebkg_width + ts.song_td.offsetWidth + 11);
			fx_votebkg_y.duration = 300;
			fx_votebkg_y.onComplete = ts.startVoting2;
			ts.swipe.style.width = ts.song_td.offsetWidth + "px";
			ts.swipe.style.height = ts.song_td.offsetHeight + "px";
			fx_votebkg_y.start(-25);
			fx_swipe.start(ts.song_td.offsetHeight, -21);
		};
		
		ts.endSwipe = function() {
			ts.swipe.style.width = "0px";
		};
		
		ts.startVoting2 = function() {
			fx_votebkg_y.onComplete = false;
			fx_votebkg_y.set(-32);
			fx_votebkg_x.set(-votebkg_width);
			votelock_started = clock.hiResTime();
			votelock_timer = setInterval(ts.voteProgress, 20);
		};
		
		ts.voteProgress = function() {
			var clocktime = clock.hiResTime();
			if ((votelock_started + 5000) >= clocktime) {
				var headtime = Math.floor(((votelock_started + 5000) - clocktime) / 100) / 10;
				if ((headtime % 1) == 0) headtime += ".0";
				ts.parent.changeHeadline(_l("votelockingin") + " " + headtime + "...");
				var x = Math.floor(((clocktime - votelock_started) / 5000) * (ts.song_td.offsetWidth + 11) - votebkg_width);
				fx_votebkg_x.set(x);
			}
			else {
				ts.parent.changeHeadline("Submitting vote...");
				ts.voteProgressComplete();
				ts.voteSubmit();
			}
		};

		ts.voteProgressStop = function(noclear) {
			clearInterval(votelock_timer);
			if (!noclear) {
				fx_votebkg_x.onComplete = ts.voteProgressStop2;
				fx_votebkg_x.start(-votebkg_width);
			}
		};
		
		ts.voteProgressStop2 = function() {
			fx_votebkg_x.onComplete = false;
			fx_votebkg_y.set(0);
			votelock_timer = false;
		};

		ts.voteProgressComplete = function() {
			ts.voteProgressStop(true);
			fx_votebkg_x.set(-votebkg_width + ts.song_td.offsetWidth + 11);
		};

		ts.registerVoteDraw = function() {
			ts.parent.changeHeadline(_l("voted"));
			fx_votebkg_y.duration = 1000;
			fx_votebkg_y.start(-70);
			votelock_timer = false;
		};
		
		return ts;
	};
	
	/*****************************************************************************\
		NOW PLAYING PANEL
	*****************************************************************************/

	that.NPDrawSong = function(json, event, panel) {
		var table = createEl("table", { "class": "nowplaying_table", "cellspacing": 0 });
		
		var tr = createEl("tr", {}, table);
		table.album_art = createEl("td", { "class": "nowplaying_album_art", "rowspan": 4 }, tr);
		if (json && json.album_art) {
			table.album_art_img = createEl("img", { "class": "nowplaying_album_art_img", "src": json.album_art }, table.album_art);
		}
		else {
			table.album_art_img = createEl("img", { "class": "nowplaying_album_art_img", "src": "images/blank.png" }, table.album_art);
		}
		table.song_title = createEl("td", { "class": "nowplaying_song_title" }, tr);
		table.song_rating = createEl("td", { "class": "nowplaying_song_rating" }, tr);
		
		tr = createEl("tr", {}, table);
		table.album_name = createEl("td", { "class": "nowplaying_album_name" }, tr);
		table.album_rating = createEl("td", { "class": "nowplaying_album_rating" }, tr);
		
		tr = createEl("tr", {}, table);
		table.artist_name = createEl("td", { "class": "nowplaying_artist_name", "colspan": 2 }, tr);
		
		tr = createEl("tr", {}, table);
		table.url = createEl("td", { "class": "nowplaying_url" }, tr);
		table.votes = createEl("td", { "class": "nowplaying_votes" }, tr);
		
		var urlneedsfill = false;
		if (json) {
			// songs
			if (json.song_title) table.song_title.textContent = json.song_title;
			if (json.album_name) table.album_name.textContent = json.album_name;
			if (typeof(json.song_rating_user) != "undefined") {
				event.song_rating = Rating({ "category": "song", "id": json.song_id, "userrating": json.song_rating_user, "albumrating": json.song_rating_avg, "favourite": json.song_favourite, "register": true });
				table.song_rating.appendChild(event.song_rating.el);
			}
			if (typeof(json.album_rating_user) != "undefined") {
				event.album_rating = Rating({ "category": "album", "id": json.album_id, "userrating": json.album_rating_user, "siterating": json.album_rating_avg, "favourite": json.album_favourite, "register": true });
				table.album_rating.appendChild(event.album_rating.el);
			}
			if (json.artists) Artist.allArtistToHTML(json.artists, table.artist_name);
			if (json.song_url && (json.song_url.length > 0)) {
				createEl("a", { "href": json.song_url, "textContent": json.song_url_text }, table.url);
				urlneedsfill = false;
			}
			if (json.elec_votes) {
				if (json.elec_votes > 1) table.votes.textContent = json.elec_votes + " " + _l("votes");
				else table.votes.textContent = json.elec_votes + " " + _l("vote");
				urlneedsfill = false;
			}
			if (json.elec_isrequest && ((json.elec_isrequest == 1) || (json.elec_isrequest == -1))) {
				var requestor = json.song_requestor;
				var reqtxt = "";
				if (json.elec_isrequest == 1) reqtxt = _l("requestedby");
				else if (json.elec_isrequest < 0) reqtxt = _l("conflictedwith");
				panel.changeReqBy(reqtxt + " " + json.song_requestor);
			}
			else if (event.p.username && (event.p.sched_type != SCHED_LIVE)) {
				panel.changeReqBy(_l("from") + " " + json.username);
			}
			else if (event.p.sched_dj) {
				panel.changeReqBy(_l("currentdj") + " " + event.p.sched_dj);
			}
			
			// ads
			if (json.ad_title) table.song_title.textContent = json.ad_title;
			if (json.ad_album) table.album_name.textContent = json.album_name;
			if (json.ad_artist) table.artist_name = json.ad_artist;
			if (json.ad_url && (json.ad_url.length > 0)) createEl("a", { "href": json.ad_url, "textContent": json.ad_url_text }, table.url);

			// generic
			if (json.sched_name) table.song_title.textContent = json.sched_name;
			if (json.sched_notes) table.song_title.textContent = json.sched_notes;
			if (json.username) table.header_right.textContent = json.username;
		}
		
		if (!urlneedsfill) {
			createEl("img", { "src": "images/blank.png", "style": "width: 1px; height: 1px;" }, table.url);
		}
		
		if (table.song_title.textContent > "") {
			table.song_title.setAttribute("class", table.song_title.className + " nowplaying_fadeborder");
			table.song_rating.setAttribute("class", table.song_rating.className + " nowplaying_fadeborder_r");
		}
		if (table.album_name.textContent > "") {
			table.album_name.setAttribute("class", table.album_name.className + " nowplaying_fadeborder");
			table.album_rating.setAttribute("class", table.album_rating.className + " nowplaying_fadeborder_r");
		}
		if (table.artist_name.textContent > "") {
			table.artist_name.setAttribute("class", table.artist_name.className + " nowplaying_fadeborder");
		}
		
		return table;
	};

	that.Extend.NowPanel = function(nowp) {
		nowp.draw = function() {
			nowp.indicator_v = createEl("div", { "class": "nowplaying_indicator_v nowplaying_indicator_v_normal", "textContent": " " }, nowp.container);
			nowp.indicator_h = createEl("div", { "class": "nowplaying_indicator_h nowplaying_indicator_h_normal", "textContent": " " }, nowp.container);
			nowp.header_text = createEl("div", { "class": "nowplaying_header_text" }, nowp.container);
			nowp.header_reqby = createEl("div", { "class": "nowplaying_header_reqby", "textContent": " " }, nowp.container);
			nowp.el = createEl("div", { "class": "nowplaying_wrapper" }, nowp.container);
		};
		
		nowp.changeHeader = function(text) {
			nowp.header_text.textContent = text;
		};
		
		nowp.changeReqBy = function(text) {
			nowp.header_reqby.textContent = text
		};
		
		nowp.changeIsRequest = function(elec_isrequest) {
			if (elec_isrequest == 1) {
				nowp.indicator_v.setAttribute("class", "nowplaying_indicator_v nowplaying_indicator_v_request");
				nowp.indicator_h.setAttribute("class", "nowplaying_indicator_h nowplaying_indicator_h_request");
			}
			else if (elec_isrequest < 0) {
				nowp.indicator_v.setAttribute("class", "nowplaying_indicator_v nowplaying_indicator_v_conflict");
				nowp.indicator_h.setAttribute("class", "nowplaying_indicator_h nowplaying_indicator_h_conflict");
			}
			else {
				nowp.indicator_v.setAttribute("class", "nowplaying_indicator_v nowplaying_indicator_v_normal");
				nowp.indicator_h.setAttribute("class", "nowplaying_indicator_h nowplaying_indicator_h_normal");
			}
		};
	};
	
	that.Extend.NPSkeleton = function(npe) {
		npe.defineFx = function() {
			npe.fx_marginleft = fx.make(fx.CSSNumeric, [ npe.el, 700, "marginLeft", "px" ]);
			npe.fx_marginleft.set(-50);
			npe.fx_opacity = fx.make(fx.OpacityRemoval, [ npe.el, npe.parent.el, 700 ] );
		}
		
		npe.destruct = function() {
			if (npe.song_rating) {
				npe.song_rating.destruct();
				npe.album_rating.destruct();
			}
		};
		
		npe.animateIn = function() {
			npe.fx_marginleft.start(0);
			npe.fx_opacity.start(1);
		};
		
		npe.animateOut = function() {
			npe.fx_marginleft.start(50);
			npe.fx_opacity.start(0);
		};
	};
	
	that.Extend.NPElection = function(npe) {
		npe.draw = function() {
			npe.el = that.NPDrawSong(npe.p.song_data[0], npe, npe.parent);
			npe.defineFx();			
		};
	};
	
	that.Extend.NPOneShot = that.Extend.NPElection;
	
	that.Extend.NPLiveShow = function(npl) {
		npl.draw = function() {
			npl.el = that.NPDrawSong(npl.p, npl, npl.parent);
			npl.defineFx();
		};
	};
	
	that.Extend.NPPlaylist = function(npe) {
		npe.draw = function() {
			npe.el = that.NPDrawSong(npe.p.song_data[npe.p.playlist_position], npe, npe.parent);
			npe.defineFx();			
		};
	};
	
	that.Extend.NPAdSet = function(npe) {
		npe.draw = function() {
			npe.el = that.NPDrawSong(npe.p.ad_data[npe.p.adset_position], npe, npe.parent);
			npe.defineFx();
		};
	};

	/*****************************************************************************
	   Menu Panel Styling
	*****************************************************************************/
	
	that.menuDefs = function(svgel, defs) {
		var logohighlight = svg.makeGradient("linear", "menupanel_logohighlight", "0%", "0%", "0%", "100%", "pad");
		logohighlight.appendChild(svg.makeStop("0%", theme.indicnormal, 0));
		logohighlight.appendChild(svg.makeStop("100%", theme.indicnormal, 1));
		defs.appendChild(logohighlight);
		
		var logomask = svg.makeEl("mask", { id: "menupanel_rwmask" });
		var logoimage = svg.makeImage("images/stationselect-1.png", 0, 0, logowidth, logoheight);
		logomask.appendChild(logoimage);
		defs.appendChild(logomask);
		
		// logomask = svg.makeEl("mask", { id: "menupanel_ocmask" });
		// logoimage = svg.makeImage("images/stationselect-2.png", 0, 0, logowidth, logoheight);
		// logomask.appendChild(logoimage);
		// defs.appendChild(logomask);
		
		// logomask = svg.makeEl("mask", { id: "menupanel_vwmask" });
		// logoimage = svg.makeImage("images/stationselect-3.png", 0, 0, logowidth, logoheight);
		// logomask.appendChild(logoimage);
		// defs.appendChild(logomask);
		
		var logoclip = svg.makeEl("clipPath", { id: "menupanel_logoclip" });
		logoclip.appendChild(svg.makeEl("path", { d: "M0,0 V50 H250 V0 Z" } ));
		defs.appendChild(logoclip);
		
		var logoswipegrad = svg.makeGradient("linear", "menupanel_logoswipe", "0%", "0%", "100%", "0%", "pad");
		logoswipegrad.appendChild(svg.makeStop("0%", "white", "0"));
		logoswipegrad.appendChild(svg.makeStop("70%", "white", "1"));
		logoswipegrad.appendChild(svg.makeStop("95%", "white", "1"));
		logoswipegrad.appendChild(svg.makeStop("100%", "white", "0"));
		defs.appendChild(logoswipegrad);
		
		var rwlogograd = svg.makeGradient("linear", "menupanel_Rainwavegrad", "0%", "0%", "0%", "100%", "pad");
		rwlogograd.appendChild(svg.makeStop("0%", "#f36f3d", "1"));
		rwlogograd.appendChild(svg.makeStop("100%", "#faca19", "1"));
		defs.appendChild(rwlogograd);
	};

	that.createLogoSwipe = function(attachel, maskname, bkgname) {
		var logo = svg.make({ "width": logowidth, "height": logoheight });
		var logog = svg.makeEl("g", { "mask": "url(#" + maskname + ")", "clip_path": "url(#menupanel_logoclip)" } );
		logog.appendChild(svg.makeRect(0, 0, logowidth, logoheight, { fill: "url(#" + bkgname + ")" } ));
		var logoswipe = svg.makeRect(0, 0, Math.round(logowidth * .75), logoheight, { fill: "url(#menupanel_logoswipe)" } );
		logog.appendChild(logoswipe);
		logo.appendChild(logog);
		var fx_logoswipe = fx.make(fx.SVGAttrib, [ logoswipe, 1500, "x", "" ], { "unstoppable": true });
		fx_logoswipe.set(logowidth);
		attachel.addEventListener("mouseover", function() { fx_logoswipe.start(-Math.round(logowidth * .75), logowidth); }, true);
		attachel.style.cursor = "pointer";
		attachel.appendChild(logo);
	};

	that.Extend.MenuPanel = function(menup) {	
		menup.draw = function() {
			menup.loginbox = createEl("table", { "class": "loginbox", "cellborder": 0, "cellpadding": 0 });
			var row = createEl("tr");
			row.appendChild(createEl("td", { "textContent": _l("username"), "style": "padding-right: 1em;" }));
			var td = createEl("td");
			menup.login_username = createEl("input", { "type": "text" });
			menup.login_username.addEventListener('keypress', menup.loginBoxKeypress, true);
			td.appendChild(menup.login_username);
			var closelogin = createEl("span", { "textContent": "X" });
			closelogin.addEventListener("click", menup.hideLoginBox, true);
			closelogin.style.marginLeft = "1em";
			closelogin.style.cursor = "pointer";
			td.appendChild(closelogin);
			row.appendChild(td);
			menup.loginbox.appendChild(row);
			row = createEl("tr");
			row.appendChild(createEl("td", { "textContent": _l("password") }));
			td = createEl("td");
			menup.login_password = createEl("input", { "type": "password" });
			menup.login_password.addEventListener('keypress', menup.loginBoxKeypress, true);
			td.appendChild(menup.login_password);
			row.appendChild(td);
			menup.loginbox.appendChild(row);
			row = createEl("tr");
			row.appendChild(createEl("td", { "textContent": _l("autologin") }));
			td = createEl("td");
			menup.login_auto = createEl("input", { "type": "checkbox", "checked": "yes" });
			td.appendChild(menup.login_auto);
			row.appendChild(td);
			menup.loginbox.appendChild(row);
			row = createEl("tr");
			row.appendChild(createEl("td", { "textContent": "" }));
			td = createEl("td");
			menup.login_button = createEl("button", { "textContent": _l("login") });
			menup.login_button.addEventListener('click', menup.loginSubmit, true);
			td.appendChild(menup.login_button);
			row.appendChild(td);
			menup.loginbox.appendChild(row);
			menup.loginbox.style.position = "absolute";
			menup.loginbox.style.marginTop = (menup.el.offsetHeight + 3) + "px";
			menup.loginbox.style.zIndex = "100";
			
			menup.table = createEl("table", { "class": "menu_table", "cellspacing": 0 });
			var row = createEl("tr");
			menup.td_station = createEl("td", { "class": "menu_td_station" });
			
			var stationlogo = createEl("img", { "src": "images/rainwave-menu-logo.png" });
			menup.td_station.appendChild(stationlogo);
			
			menup.ul_select = createEl("ul", { "class": "menu_select" } );
			var li = createEl("li");
			that.createLogoSwipe(li, "menupanel_rwmask", "menupanel_Rainwavegrad");
			li.addEventListener("click", function() { menup.changeStation(1); }, true);
			menup.ul_select.appendChild(li);
			row.appendChild(menup.td_station);
			fx.makeMenuDropdown(menup.el, stationlogo, menup.ul_select);
			
			menup.td_play = createEl("td", { "class": "menu_td_play" });
			
			menup.player = createEl("span", { "class": "menu_player" });
			menup.player.addEventListener("click", menup.playerClick, true);
			menup.player.style.cursor = "pointer";
			menup.fx_player = fx.make(fx.CSSNumeric, [ menup.player, 250, "opacity", 0 ]);
			menup.fx_player.set(1);
			menup.player.innerHTML = _l("play");
			menup.td_play.appendChild(menup.player);
			
			row.appendChild(menup.td_play);
			
			menup.td_download = createEl("td", { "class": "menu_td_download" });
			
			var vlca = createEl("a", { "href": "tunein.php", "onclick": "return false;" });
			var vlc = createEl("img", { "src": "images/vlc.png", "class": "link" });
			var fx_vlc = fx.make(fx.CSSNumeric, [ vlc, 250, "opacity", "" ]);
			fx_vlc.set(0.85);
			vlc.addEventListener("click", menup.tuneInClick, true);
			vlc.addEventListener("mouseover", function() { fx_vlc.start(1) }, true);
			vlc.addEventListener("mouseout", function() { fx_vlc.start(0.85) }, true);
			vlca.appendChild(vlc);
			menup.td_download.appendChild(vlca);
			
			var winampa = createEl("a", { "href": "tunein.php", "onclick": "return false;" });
			var winamp = createEl("img", { "src": "images/winamp.png", "class": "link" });
			var fx_winamp = fx.make(fx.CSSNumeric, [ winamp, 250, "opacity", "" ]);
			fx_winamp.set(.85);
			winamp.addEventListener("mouseover", function() { fx_winamp.start(1) }, true);
			winamp.addEventListener("mouseout", function() { fx_winamp.start(0.85) }, true);
			winamp.addEventListener("click", menup.tuneInClick, true);
			winampa.appendChild(winamp);
			menup.td_download.appendChild(winampa);
			
			var fb2ka = createEl("a", { "href": "tunein.php", "onclick": "return false;" });
			var fb2k = createEl("img", { "src": "images/fb2k.png", "class": "link" });
			var fx_fb2k = fx.make(fx.CSSNumeric, [ fb2k, 250, "opacity", "" ]);
			fx_fb2k.set(0.85);
			fb2k.addEventListener("mouseover", function() { fx_fb2k.start(1) }, true);
			fb2k.addEventListener("mouseout", function() { fx_fb2k.start(0.85) }, true);
			fb2k.addEventListener("click", menup.tuneInClick, true);
			fb2ka.appendChild(fb2k);
			menup.td_download.appendChild(fb2ka);
			
			row.appendChild(menup.td_download);
			
			help.changeStepPointEl("tunein", [ menup.player, menup.td_download ]);
			help.changeTopicPointEl("tunein", [ menup.player, menup.td_download ]);
			
			menup.td_news = createEl("td", { "class": "menu_td_news" });
			row.appendChild(menup.td_news);
			
			menup.td_user = createEl("td", { "class": "menu_td_user" });
			menup.avatar = createEl("img", { "class": "menu_avatar", "src": "images/blank.png" });
			menup.td_user.appendChild(menup.avatar);
			menup.username = createEl("span", { "class": "menu_username" });
			menup.loginreg = createEl("span", { "class": "menu_loginreg" });
			var login = createEl("span", { "class": "menu_login", "textContent": _l("login") });
			login.addEventListener("click", menup.showLoginBox, true);
			linkify(login);
			menup.loginreg.appendChild(login);
			menup.loginreg.appendChild(createEl("span", { "textContent": " / " }));
			var reg = createEl("a", { "class": "menu_register", "href": "http://rainwave.cc/forums/ucp.php?mode=register", "textContent": _l("register") });
			linkify(reg);
			menup.loginreg.appendChild(reg);
			menup.td_user.appendChild(menup.loginreg);
			row.appendChild(menup.td_user);
			
			menup.td_chat = createEl("td", { "class": "menu_td_chat" });
			var chatlink = createEl("a", { "class": "link" } );
			chatlink.addEventListener("click", menup.openChat, true);
			chatlink.innerHTML = _l("chat") + "<img src='images/new_window_icon.png' alt='' style='height: 12px;' />";
			menup.td_chat.appendChild(chatlink);
			row.appendChild(menup.td_chat);
			
			menup.td_forums = createEl("td", { "class": "menu_td_forums" });
			var forumlink = createEl("a", { "target": "_blank", "href": "/forums" });
			forumlink.innerHTML = _l("forums") + "<img src='images/wikilink_12px.png' alt='' style='height: 12px;' />";
			menup.td_forums.appendChild(forumlink);
			row.appendChild(menup.td_forums);
			
			menup.td_help = createEl("td", { "class": "menu_td_help" });
			var hbutton = createEl("span", { "textContent": _l("help") });
			linkify(hbutton);
			hbutton.addEventListener('click', help.showAllTopics, true);
			menup.td_help.appendChild(hbutton);
			row.appendChild(menup.td_help);
			
			menup.td_cog = createEl("td", { "class": "menu_td_cog" });
			var coglinks = document.createElement("div");
			coglinks.setAttribute("class", "COG_links");
			coglinks.appendChild(createEl("a", { "href": "http://www.colonyofgamers.com", "textContent": "Colony of Gamers" } ));
			coglinks.appendChild(createEl("a", { "href": "http://www.co-optimus.com", "textContent": "Co-Optimus" } ));
			coglinks.appendChild(createEl("a", { "href": "http://www.dipswitchcomics.com", "textContent": "Dipswitch Comics" } ));
			coglinks.appendChild(createEl("a", { "href": "http://www.immortalmachines.com", "textContent": "Immortal Machines" } ));
			coglinks.appendChild(createEl("a", { "href": "http://www.ingamechat.net", "textContent": "In-Game Chat" } ));
			//coglinks.appendChild(createEl("a", { "href": "http://www.johnnygigawatt.com", "textContent": "Johnny Gigawatt" } ));
			coglinks.appendChild(createEl("a", { "href": "http://www.theweeklyrelease.com", "textContent": "The Weekly Release" } ));
			var cogbanner = createEl("img", { "class": "COG_banner", "src": "images/cog_network_h.png" });
			menup.td_cog.appendChild(cogbanner);
			row.appendChild(menup.td_cog);
			fx.makeMenuDropdown(menup.el, cogbanner, coglinks);
			menup.table.appendChild(row);
			menup.el.appendChild(menup.table);
			
			var pos = help.getElPosition(menup.td_user);
			menup.loginbox.style.marginLeft = pos.x + "px";
			
			return;
		};
		
		var showinglogin = false;
		menup.showLoginBox = function() {
			if (showinglogin) {
				menup.hideLoginBox();
			}
			else {
				menup.container.appendChild(menup.loginbox);
				menup.login_username.focus();
				showinglogin = true;
			}
		};
		
		menup.hideLoginBox = function() {
			if (showinglogin) {
				menup.container.removeChild(menup.loginbox);
				showinglogin = false;
			}
		};
		
		menup.drawLoginDisabled = function() {
			menup.login_username.style.background = "#AA0000";
			menup.login_password.style.background = "#AA0000";
			menup.login_button.textContent = _l("disabled");
		};
		
		menup.loginBoxKeypress = function(evt) {
			var code = (evt.keyCode != 0) ? evt.keyCode : evt.charCode;
			if (code == 13) { menup.loginSubmit(); }				
			hotkey.stopBubbling(evt);
		};
		
		menup.loginSubmit = function() {
			menup.doLogin(menup.login_username.value, menup.login_password.value, menup.login_auto.checked);
		};
		
		menup.changeAvatar = function(avatar) {
			menup.avatar.setAttribute("src", avatar);
		};
		
		menup.drawTuneInChange = function(tunedin) {
			if (Oggpixel && Oggpixel.playing) {
				menup.player.style.backgroundColor = "#225f8a";
				menup.player.style.cursor = "pointer";
				menup.fx_player.start(1);
				if (tunedin == 1) menup.player.innerHTML = _l("playing");
				else menup.player.innerHTML = _l("waitingforstatus");
			}
			else if (Oggpixel && (tunedin == -1)) {
				menup.player.innerHTML = _l("loading");
			}
			else if (tunedin == 1) {
				menup.player.style.backgroundColor = "transparent";
				menup.player.style.cursor = "none";
				menup.fx_player.start(.65);
				menup.player.innerHTML = _l("tunedin");
			}
			else {
				menup.player.style.backgroundColor = "#225f8a";
				menup.player.style.cursor = "pointer";
				menup.fx_player.start(1);
				menup.player.innerHTML = _l("play");
			}
		};
		
		menup.showUsername = function(username) {
			menup.username.textContent = username;
			var pnode;
			if (menup.loginreg.parentNode) pnode = menup.loginreg.parentNode;
			else if (menup.username.parentNode) pnode = menup.username.parentNode;
			if (username && menup.loginreg.parentNode) pnode.removeChild(menup.loginreg);
			else if (!username && !menup.loginreg.parentNode) pnode.appendChild(menup.loginreg);
			if (!username && menup.username.parentNode) pnode.removeChild(menup.username);
			else if (username && !menup.username.parentNode) pnode.appendChild(menup.username);
		};
		
		return menup;
	};
		
	/*****************************************************************************
	   MPI Styling
	*****************************************************************************/

	that.Extend.MainMPI = function(mpi) {
		mpi.draw = function() {
			mpi.bkg = document.createElement("div");
			mpi.divPositionAndSize(mpi.bkg);
			mpi.bkg.style.zIndex = "1";
			mpi.bkg.style.top = mpi.panelsroom + "px";
			mpi.container.appendChild(mpi.bkg);
		};
		
		return mpi;
	};
	
	fx.extend("TabSize", function(object, duration) {
		var tsfx = {};
		tsfx.duration = duration;
		tsfx.update = function() {
			object.setAttribute("d", "M" + (tsfx.now + 8) + ",0 H0 V" + that.MPI_MenuHeight + " H" + (tsfx.now + that.MPI_MenuHeight + 8) + " Z");
		};
			
		return tsfx;
	});
	

	that.TabBar = function(container, width) {
		var tabs = {};
		tabs.container = container;
		tabs.width = width;
		tabs.svgmenu = svg.make( { width: tabs.width, height: that.MPI_MenuHeight + 2 } );
		tabs.hr = svg.makeRect(0, that.MPI_MenuHeight, tabs.width, 2, { fill: that.indicnormal } );
		tabs.svgmenu.appendChild(tabs.hr);
		tabs.container.appendChild(tabs.svgmenu);
		tabs.panels = {};

		tabs.addItem = function(panelname, title) {
			var rightpad = 8;
			var textpad = 5;
			
			tabs.panels[panelname] = {};
			tabs.panels[panelname].group = svg.makeEl("g", { shape_rendering: "crispEdges", opacity: 0.7 } );
			tabs.panels[panelname].fx_groupx = fx.make(fx.SVGTranslateX, [ tabs.panels[panelname].group, 350, 0 ] );
			tabs.panels[panelname].textwidth = measureText(title);
			tabs.panels[panelname].outline = svg.makeEl("path", { stroke_width : 1, stroke: that.indicnormal, fill: "black" } );
			tabs.panels[panelname].fx_resize = fx.make(fx.TabSize, [ tabs.panels[panelname].outline, 250 ]);
			tabs.panels[panelname].fx_resize.set(tabs.panels[panelname].textwidth);
			tabs.panels[panelname].group.appendChild(tabs.panels[panelname].outline);
			tabs.panels[panelname].el = svg.makeEl("text", { x: textpad, y: svg.em + 4, fill: that.textcolor } );
			tabs.panels[panelname].el.textContent = title;
			tabs.panels[panelname].group.appendChild(tabs.panels[panelname].el);
			tabs.panels[panelname].group.panelname = panelname;
			tabs.panels[panelname].group.style.cursor = "pointer";
			tabs.panels[panelname].group.addEventListener("mouseover", tabs.mouseOverTab, true);
			tabs.panels[panelname].group.addEventListener("mouseout", tabs.mouseOutTab, true);
			tabs.panels[panelname].focused = false;
			tabs.panels[panelname].enabled = false;
			tabs.svgmenu.appendChild(tabs.panels[panelname].group);
			tabs.positionTabs(false);
		};
		
		tabs.positionTabs = function(animate) {
			var i;
			var runx = 0;
			for (i in tabs.panels) {
				tabs.panels[i].fx_groupx.start(runx);
				runx += tabs.panels[i].textwidth + 8 + that.MPI_MenuHeight;
			}
		};
		
		tabs.enableTab = function(panelname, animate) {
			tabs.panels[panelname].enabled = true;
			tabs.panels[panelname].group.setAttribute("opacity", 1.0);
			tabs.positionTabs(animate);
		};

		tabs.focusTab = function(panelname) {
			if (tabs.panels[panelname].focused == true) {
				tabs.panels[panelname].outline.setAttribute("fill", that.indicnormal);
			}
			else {
				tabs.panels[panelname].outline.setAttribute("fill", "black");
			}
		};

		tabs.mouseOverTab = function(evt) {
			tabs.panels[evt.currentTarget.panelname].outline.setAttribute("fill", that.indicnormalbright)
		};

		tabs.mouseOutTab = function(evt) {
			tabs.focusTab(evt.currentTarget.panelname);
		};
		
		tabs.changeTitle = function(panelname, newtitle) {
			tabs.panels[panelname].textwidth = measureText(newtitle);
			tabs.panels[panelname].fx_resize.start(tabs.panels[panelname].textwidth);
			tabs.panels[panelname].el.textContent = newtitle;
			tabs.positionTabs(true);
		};
		
		return tabs;
	};
	
	/*****************************************************************************
		Playlist Styling
	*****************************************************************************/
	
	that.Extend.PlaylistPanel = function(pp) {
		var tr;
		var listtd;
		var maintd;
		var albumlist;
		var albumlistc;
		var el;
		var inlinesearchc;
		var inlinesearch;
		var keynavscrolloffset = svg.em * 5;
		var odholder;
		
		pp.draw = function() {
			var leftwidth = svg.em * 30;
		
			el = document.createElement("table");
			pp.width = pp.container.offsetWidth;
			el.setAttribute("class", "pl_table");
			el.style.tableLayout = "fixed";
			el.style.height = pp.container.offsetHeight + "px";
			el.style.width = "100%";
			
			tr = document.createElement("tr");

			inlinesearchc = document.createElement("div");
			inlinesearchc.setAttribute("class", "pl_searchc");
			var tempspan = document.createElement("span");
			tempspan.textContent = "Search: ";
			inlinesearchc.appendChild(tempspan);
			inlinesearch = document.createElement("span");
			inlinesearch.textContent = "";
			inlinesearch.setAttribute("class", "pl_search");
			inlinesearchc.appendChild(inlinesearch);
			pp.container.appendChild(inlinesearchc);

			listtd = document.createElement("td");
			listtd.setAttribute("id", "pl_albumlist_td");
			listtd.setAttribute("class", "pl_listtd");
			listtd.style.width = leftwidth + "px";
			
			albumlistc = document.createElement("div");
			albumlistc.style.overflow = "scroll";
			albumlistc.style.height = pp.container.offsetHeight + "px";
			albumlist = document.createElement("table");
			albumlist.setAttribute("class", "pl_albumlist");
			albumlistc.appendChild(albumlist);
			listtd.appendChild(albumlistc);
			tr.appendChild(listtd);
			
			maintd = document.createElement("td");
			maintd.setAttribute("class", "pl_maintd");
			odholder = document.createElement("div");
			odholder.setAttribute("class", "pl_odholder");
			odholder.style.height = pp.container.offsetHeight + "px";
			maintd.appendChild(odholder);
			tr.appendChild(maintd);
			
			el.appendChild(tr);
			
			
			pp.container.appendChild(el);
		};
		
		pp.drawAlbumlistEntry = function(album) {
			album.tr = document.createElement("tr");
			album.tr.album_id = album.album_id;

			album.album_rating_user = album.album_rating_user;
			var ratingx = album.album_rating_user * 10;
			album.td_name = document.createElement("td");
			album.td_name.setAttribute("class", "pl_al_name");
			album.td_name.style.backgroundPosition = "100% " + (-200 + ratingx) + "px";
			album.td_name.textContent = album.album_name;
			album.tr.appendChild(album.td_name);
			album.td_name.addEventListener("click", function() { pp.updateKeyNavOffset(album); }, true);
			Album.linkify(album.album_id, album.td_name);
			
			album.td_rating = document.createElement("td");
			album.td_rating.setAttribute("class", "pl_al_rating");
			album.tr.appendChild(album.td_rating);
			
			album.td_fav = document.createElement("td");
			// make sure to attach the album_id to the element that acts as the catch for a fav switch
			album.td_fav.album_id = album.album_id;
			album.td_fav.addEventListener('click', pp.favSwitch, true);
			album.td_fav.setAttribute("class", "pl_fav_" + album.album_favourite);
			
			album.tr.appendChild(album.td_fav);
		};
		
		pp.startSearchDraw = function() {
			albumlistc.style.height = (pp.container.offsetHeight - (svg.em * 2)) + "px";
			albumlistc.style.marginTop = (svg.em * 2) + "px";
			inlinesearch.textContent = "";
			inlinesearchc.style.display = "block";
		};
		
		pp.drawSearchString = function(string) {
			inlinesearch.textContent = string;
			albumlistc.scrollTop = 0;
		};
		
		pp.setRowClass = function(album, highlight, open) {
			var cl = album.album_available ? "pl_available" : "pl_cooldown";
			if (highlight) cl += " pl_highlight";
			if (open || ((album.album_id == pp.currentidopen) && !open)) cl += " pl_albumopen";
			album.tr.setAttribute("class", cl);
		}
		
		pp.insertBefore = function(album1, album2) {
			albumlist.insertBefore(album1.tr, album2.tr);
		};
		
		pp.appendChild = function(album) {
			albumlist.appendChild(album.tr);
		};
		
		pp.removeChild = function(album) {
			albumlist.removeChild(album.tr);
		};
		
		pp.appendOpenDiv = function(div) {
			odholder.appendChild(div);
		};
		
		pp.removeOpenDiv = function(div) {
			odholder.removeChild(div);
		};
		
		pp.ratingResultDraw = function(album, result) {
			album.album_rating_user = result.album_rating;
			var ratingx = album.album_rating_user * 10;
			album.td_name.style.backgroundPosition = "100% " + (-200 + ratingx) + "px";
			album.td_rating.textContent = album.album_rating_user.toFixed(1);
		};
		
		pp.favResultDraw = function(album, result) {
			album.td_fav.setAttribute("class", "pl_fav_" + result.favourite);
		};
		
		pp.updateKeyNavOffset = function(album) {
			pp.setKeyNavOffset(album.tr.offsetTop - albumlistc.scrollTop);
		};
		
		pp.setKeyNavOffset = function(offset) {
			if (offset && (offset > svg.em * 5)) {
				keynavscrolloffset = offset;
			}
			else {
				keynavscrolloffset = svg.em * 5;
			}
		}
		
		pp.scrollToAlbum = function(album) {
			if (album) {
				albumlistc.scrollTop = album.tr.offsetTop - keynavscrolloffset;
			}
		};
		
		pp.clearInlineSearchDraw = function() {
			inlinesearchc.style.display = "none";
			albumlistc.style.height = pp.container.offsetHeight + "px";
			albumlistc.style.marginTop = "0px";
		};
	
		pp.drawAlbum = function(div, json) {
			div.hdrtable = document.createElement("table");
			div.hdrtable.style.width = "100%";
			div.hdrtable.setAttribute("cellspacing", "0");
			
			var tr = document.createElement("tr");
			div.albumnametd = document.createElement("td");
			div.albumnametd.setAttribute("class", "pl_ad_albumnametd");
			div.albumnametd.setAttribute("colspan", 2);
			
			div.albumname = document.createElement("div");
			div.albumname.setAttribute("class", "pl_ad_albumname");
			div.albumname.textContent = json.album_name;
			div.albumnametd.appendChild(div.albumname);
			
			div.albumratingsvg = svg.make({ "class": "pl_ad_albumrating", "width": that.Rating_width * 1.5, "height": svg.em * 2 });
			div.albumrating = Rating({ category: "album", id: json.album_id, userrating: json.album_rating_user, siterating: json.album_rating_avg, favourite: json.album_favourite, scale: 1.2, register: true });
			div.albumratingsvg.appendChild(div.albumrating.el);
			div.albumnametd.appendChild(div.albumratingsvg);
			
			tr.appendChild(div.albumnametd);
			div.hdrtable.appendChild(tr);
			tr = document.createElement("tr");
			
			div.albumdetailtd = document.createElement("td");
			div.albumdetailtd.setAttribute("class", "pl_ad_albumdetailtd");
			
			if (json.album_rating_count >= 2) {
				var gr = graph.makeSVG(graph.RatingHistogram, that.RatingHistogramMask, 200, 120 - (svg.em * 3), { maxx: 5, stepdeltax: 0.5, stepsy: 3, xprecision: 1, xnumbermod: 1, xnonumbers: true, minx: 0.5, miny: true, padx: 10, raw: json.album_rating_histogram });
				//var gr = graph.makeSVG(graph.RatingHistogram, that.RatingHistogramMask, 200, 120 - (svg.em * 3), { maxx: 5, stepdeltax: 0.5, stepsy: 3, xprecision: 1, xnumbermod: 1, xnonumbers: true, minx: 0.5, miny: true, padx: 10, raw: { "1.0": 53, "1.5": 84, "2.0": 150, "2.5": 200, "3.0": 250, "3.5": 300, "4.0": 350, "4.5": 400, "5.0": 521 }});
				gr.svg.setAttribute("class", "pl_ad_ratinghisto");
				div.albumdetailtd.appendChild(gr.svg);
			}
			
			var stats = document.createElement("div");
			var tmp = document.createElement("div");
			if (json.album_lowest_oa > clock.now) tmp.innerHTML = _l("pl_oncooldown")  + formatHumanTime(json.album_lowest_oa - clock.now, true, true) + _l("pl_oncooldown2");
			stats.appendChild(tmp);
			tmp = document.createElement("div");
			tmp.innerHTML = _l("pl_ranks") + _lSuffixNumber(json.album_rating_rank) + _l("pl_ranks2");
			stats.appendChild(tmp);
			if (json.album_fav_count > 0) {
				tmp = document.createElement("div");
				tmp.innerHTML = _l("pl_favourited") + json.album_fav_count + " " + _l("pl_favourited2") + _lPlural(json.album_fav_count, "person")  + _l("pl_favourited3");
				stats.appendChild(tmp);
			}
			if ((json.album_timeswon > 0) && (json.album_timesdefeated > 0)) {
				tmp = document.createElement("div");
				tmp.innerHTML = _l("pl_wins") + ((json.album_timeswon / (json.album_timeswon + json.album_timesdefeated)) * 100).toFixed(1) + _l("pl_wins2") + _lSuffixNumber(json.album_winloss_rank) + _l("pl_wins3");
				stats.appendChild(tmp);
			}
			if (json.album_totalrequests > 0) {
				tmp = document.createElement("div");
				tmp.innerHTML = _l("pl_requested") + json.album_totalrequests + _l("pl_requested2") + _lSuffixNumber(json.album_request_rank) + _l("pl_requested3");
				stats.appendChild(tmp);
			}
			if (json.album_genres.length == 1) {
				tmp = document.createElement("div");
				tmp.innerHTML = _l("pl_genre") + json.album_genres[0].genre_name + _l("pl_genre2");
				stats.appendChild(tmp);
			}
			else if (json.album_genres.length > 1) {
				tmp = document.createElement("div");
				tmp.innerHTML = _l("pl_genres");
				for (var g = 0; g < json.album_genres.length; g++) {
					if (g > 0) tmp.innerHTML += ", ";
					if (g == (json.album_genres.length - 1)) tmp.innerHTML += _l("and") + " ";
					tmp.innerHTML += json.album_genres[g].genre_name;
				}
				tmp.innerHTML += _l("pl_genres2");
				stats.appendChild(tmp);
			}
			div.albumdetailtd.appendChild(stats);
			
			tr.appendChild(div.albumdetailtd);
			
			div.albumarttd = document.createElement("td");
			div.albumarttd.setAttribute("class", "pl_ad_albumarttd");
			div.albumarttd.style.width = "135px";
			div.albumartsvg = svg.make({ width: 120, height: 120 });
			div.albumartsvg.setAttribute("class", "pl_ad_albumart");
			div.albumartsvg.appendChild(svg.makeRect(0, 0, 120, 120, { "fill": "#000000", "stroke-width": 1, "stroke": "#000000" }));
			div.albumart = svg.makeImage("albumart/" + json.album_id + "-120.jpg", 0, 0, 120, 120, { "stroke": "#333333", "stroke-width": 2, "preserveAspectRatio": "xMidYMid meet" });
			//div.albumart.setAttribute("preserveAspectRatio", "xMidYMid meet");
			//div.albumart.setAttribute("src", "albumart/" + json.album_id + "-240.jpg");
			div.albumartsvg.appendChild(div.albumart)
			div.albumarttd.appendChild(div.albumartsvg);
			
			tr.appendChild(div.albumarttd);
			div.hdrtable.appendChild(tr);
			div.appendChild(div.hdrtable);
			
			div.songlist = document.createElement("table");
			div.songlist.setAttribute("class", "pl_songlist");
			div.songlist.style.clear = "both";
			div.songarray = [];
			that.drawAlbumTable(div.songlist, div.songarray, json.song_data);
			
			div.updateHelp = function() {
				help.changeStepPointEl("clicktorequest", [ div.songarray[0].td_r ]);
			};
			
			div.appendChild(div.songlist);
		};
		
		pp.destruct = function(div) {
			div.div.albumrating.destruct();
			for (var i = 0; i < div.div.songarray.length; i++) {
				div.div.songarray[i].rating.destruct();
			}
		};
	};
	
	// Pass a table already created, an empty array, and JSON song_data in
	that.drawAlbumTable = function(table, songarray, song_data) {
		var ns;
		var trclass;
		for (var i = 0; i < song_data.length; i++) {
				ns = {};
				ns.tr = document.createElement("tr");
				trclass = song_data[i].song_available ? "pl_songlist_tr_available" : "pl_songlist_tr_unavailable";
				ns.tr.setAttribute("class", trclass);
				
				ns.td_r = document.createElement("td");
				ns.td_r.setAttribute("class", "pl_songlist_r");
				ns.td_r.textContent = "R";
				Request.linkify(song_data[i].song_id, ns.td_r);
				ns.tr.appendChild(ns.td_r);
				
				ns.td_n = document.createElement("td");
				ns.td_n.setAttribute("class", "pl_songlist_title");
				ns.td_n.textContent = song_data[i].song_title;
				ns.tr.appendChild(ns.td_n);
				
				ns.td_a = document.createElement("td");
				ns.td_a.setAttribute("class", "pl_songlist_artists");
				Artist.allArtistToHTML(song_data[i].artists, ns.td_a);
				ns.tr.appendChild(ns.td_a);
				
				ns.td_rating = document.createElement("td");
				ns.td_rating.setAttribute("class", "pl_songlist_rating");
				ns.td_rating.style.width = (that.Rating_width + 5) + "px";
				ns.svg_rating = svg.make({ "width": that.Rating_width, "height": svg.em * 1.4 });
				ns.rating = Rating({ category: "song", id: song_data[i].song_id, userrating: song_data[i].song_rating_user, x: 0, y: 1, siterating: song_data[i].song_rating_avg, favourite: song_data[i].song_favourite, register: true });
				ns.svg_rating.appendChild(ns.rating.el);
				ns.td_rating.appendChild(ns.svg_rating);
				ns.tr.appendChild(ns.td_rating);
				
				ns.td_length = document.createElement("td");
				ns.td_length.setAttribute("class", "pl_songlist_length");
				ns.td_length.textContent = formatTime(song_data[i].song_secondslong);
				ns.tr.appendChild(ns.td_length);
				
				ns.td_cooldown = document.createElement("td");
				ns.td_cooldown.setAttribute("class", "pl_songlist_cooldown");
				if (!song_data[i].song_available && (song_data[i].song_releasetime > clock.now)) {
					ns.td_cooldown.textContent = formatHumanTime(song_data[i].song_releasetime - clock.now);
				}
				else {
					ns.td_cooldown.textContent = " ";
				}
				ns.tr.appendChild(ns.td_cooldown);
				
				if (song_data[i].song_id && (user.p.radio_live_admin > 0)) {
					ns.td_oneshot = document.createElement("td");
					ns.td_oneshot.setAttribute("class", "pl_songlist_oneshot");
					ns.td_oneshot.textContent = "Play";
					Song.linkifyAsOneshot(song_data[i].song_id, ns.td_oneshot);
					ns.tr.appendChild(ns.td_oneshot);
					
					/*ns.td_fc = document.createElement("td");
					ns.td_fc.setAttribute("class", "pl_songlist_forcecandidate");
					ns.td_fc.textContent = "Cand";
					Song.linkifyAsForceCandidate(song_data[i].song_id, ns.td_fc);
					ns.tr.appendChild(ns.td_fc);*/
				}
				
				table.appendChild(ns.tr);
				songarray.push(ns);
			}
	};	
	
	// /*****************************************************************************
	// Error Skinning
	// *****************************************************************************/
	
	that.Extend.ErrorControl = function(ec) {
		ec.drawError = function(obj, code, overridetext) {
			obj.code = code;
			
			if (obj.permanent) {
				obj.xbutton = document.createElement("span");
				obj.xbutton.addEventListener("click", function() { ec.clearError(code); }, true);
				obj.xbutton.setAttribute("class", "err_button");
				obj.xbutton.textContent = "[X] ";
				obj.el.appendChild(obj.xbutton);
			}
			
			obj.text = document.createElement("span");
			
			if (!overridetext) obj.text.innerHTML = _l("log_" + code);
			else obj.text.innerHTML = overridetext;
			obj.el.appendChild(obj.text);
			
			obj.fx_opacity = fx.make(fx.CSSNumeric, [ obj.el, 250, "opacity", "" ]);
			obj.fx_opacity.set(0);
			
			document.getElementById("body").appendChild(obj.el);
			obj.fx_opacity.start(1);
		};
		
		ec.unshowError = function(obj) {
			obj.fx_opacity.stop();
			obj.fx_opacity.onComplete = function() { ec.deleteError(obj); };
			obj.fx_opacity.start(0);
		};
	};
	
	// /*****************************************************************************
	// GRAPH MASKING FUNCTIONS
	// *****************************************************************************/
	
	that.graphDefs = function(svgel, defs) {
		var usergradient = svg.makeGradient("linear", "Rating_usergradient", "0%", "0%", "0%", "100%", "pad");
		usergradient.appendChild(svg.makeStop("15%", "#b9e0ff", "1"));
		usergradient.appendChild(svg.makeStop("50%", "#8bccff", "1"));
		usergradient.appendChild(svg.makeStop("85%", "#8bccff", "1"));
		usergradient.appendChild(svg.makeStop("100%", "#76add8", "1"));
		defs.appendChild(usergradient);
	};
	
	that.RatingHistogramMask = function(graph, mask) {
		mask.appendChild(svg.makeRect(0, 0, graph.width, graph.height, { fill: "url(#Rating_usergradient)" }));
	};	
	
	return that;
};