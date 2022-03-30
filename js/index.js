onload = () => {
    DrawingBoard.Control.Lock = DrawingBoard.Control.extend({
        name: 'lock',
        initialize: function() {
	    this.$el.append('<button class="drawing-board-control-download-button"></button>');
	    this.$el.on('click', '.drawing-board-control-download-button', $.proxy(function(e) {
                const desc = window.webxdc.selfName + ' sent a draw';
                window.webxdc.sendUpdate({payload: this.board.getImg(), summary: desc}, desc);
	        e.preventDefault();
	    }, this));
        }
    });
    new DrawingBoard.Board('board', {
        webStorage: false,
        errorMessage: 'Failed to load the editor',
    }).addControl('Lock');

    window.webxdc.setUpdateListener((update) => {
        $('#board').html('<img style="max-width:100%;height:auto" src="' + update.payload +'">');
    }, 0);
};
