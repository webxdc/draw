DrawingBoard.Control.Menu = DrawingBoard.Control.extend({
    name: 'menu',
    initialize: function() {
	    this.$el.append('<button id="menu-btn"></button><div id="dropdown-content"><a href="#" id="import-menuitem">Open...</a><a href="#" id="share-menuitem">Share</a></div>');

	    this.$el.on('click', '#menu-btn', function(e) {
            document.getElementById("dropdown-content").classList.toggle("show");
	        e.preventDefault();
	    });
        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('#menu-btn')) {
                var openDropdown = document.getElementById("dropdown-content");
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }

	    this.$el.on('click', '#import-menuitem', $.proxy(function(e) {
            const board = this.board;
            webxdc.importFiles({mimeTypes: ['image/*']}).then((files) => {
                var reader = new FileReader();
                reader.onload = function() {
                    board.opts.background = reader.result;
                    board.reset({background: true, history: false});
                    board.initHistory();
                    board.ev.trigger('historyNavigation');
                };
                reader.readAsDataURL(files[0]);
            });
	        e.preventDefault();
	    }, this));

	    this.$el.on('click', '#share-menuitem', $.proxy(function(e) {
            var b64Data = this.board.getImg().split(',')[1];
            window.webxdc.sendToChat({file: {name: "draw.png", base64: b64Data}});
	        e.preventDefault();
	    }, this));
    }
});

onload = () => {
    window.board = new DrawingBoard.Board('board', {
        webStorage: false,
        errorMessage: 'Failed to load',
        stretchImg: true,
    });
    window.board.addControl('Menu');
    window.focus(); // otherwise key events are not triggered if the app is inside an iframe

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'z' && window.board.history.canUndo()) {
            window.board.goBackInHistory();
        }
        if (event.ctrlKey && event.key === 'y' && window.board.history.canRedo()) {
            window.board.goForthInHistory();
        }
    });
};
