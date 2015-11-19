WinJS.Namespace.define("Sample", {
    splitView: null,
  	mode: {
      	// order very important!
        small: {
            mediaquery: 'all and (max-width: 400px)',
            shownDisplayMode: WinJS.UI.SplitView.ShownDisplayMode.overlay,
            hiddenDisplayMode: WinJS.UI.SplitView.HiddenDisplayMode.none,
        },
        medium: {
            mediaquery: 'all and (max-width: 800px)',
            shownDisplayMode: WinJS.UI.SplitView.ShownDisplayMode.overlay,
            hiddenDisplayMode: WinJS.UI.SplitView.HiddenDisplayMode.inline,
        },
        large: {
            mediaquery: 'all and (min-width: 800px)',
            shownDisplayMode: WinJS.UI.SplitView.ShownDisplayMode.inline,
            hiddenDisplayMode: WinJS.UI.SplitView.HiddenDisplayMode.inline,
        }
    },
  	
    initUpdateSplitView: function() {
      Object.keys(Sample.mode).forEach(function (key) {
        var mq = window.matchMedia(Sample.mode[key].mediaquery);
        mq.addListener(Sample.updateSplitView);
      });
      Sample.updateSplitView();
    },
    updateSplitView: function () {
        // Remove all the size classes
        Object.keys(Sample.mode).forEach(function (key) {
            WinJS.Utilities.removeClass(Sample.splitView.element, key);
        });
        
      	var found;
        Object.keys(Sample.mode).forEach(function (key) {
          	if (!found) {
              var mq = window.matchMedia(Sample.mode[key].mediaquery);
              if (mq.matches) {
                 found = key;
              }
            }
        });
      
      if (found) {
        // Update the SplitView based on the size
        Sample.splitView.shownDisplayMode = Sample.mode[found].shownDisplayMode;
        Sample.splitView.hiddenDisplayMode = Sample.mode[found].hiddenDisplayMode;

        // Add the size class
        WinJS.Utilities.addClass(Sample.splitView.element, found);
      }
    },  
    homeClick: WinJS.UI.eventHandler(function (ev) {
      	document.querySelector('.contenttext').innerHTML = "<h2>SplitView Content area</h2>";
    }),
    favClick: WinJS.UI.eventHandler(function (ev) {
      	document.querySelector('.contenttext').innerHTML = "<h2>Favorites!</h2>";
    }),
    settingsClick: WinJS.UI.eventHandler(function (ev) {
        document.querySelector('.contenttext').innerHTML = "<h2>Settings!</h2>";
    }),
    togglePane: WinJS.UI.eventHandler(function (ev) {
        if (Sample.splitView) {
            Sample.splitView.paneHidden = !Sample.splitView.paneHidden;
        }
    })
});

WinJS.Utilities.ready().then(function() {
  WinJS.Binding.processAll(null, Sample).then(function () {
    WinJS.UI.processAll().done(function () {
        Sample.splitView = document.querySelector(".splitView").winControl;
        new WinJS.UI._WinKeyboard(Sample.splitView.paneElement); // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
      Sample.initUpdateSplitView();
    });
	});
})
