DrawingBoard.Control.Lock = DrawingBoard.Control.extend({
    name: 'lock',
    initialize: function() {
	this.$el.append('<button class="drawing-board-control-download-button"></button>');
	this.$el.on('click', '.drawing-board-control-download-button', $.proxy(function(e) {
            window.webxdc.sendUpdate(this.board.getImg(), window.webxdc.selfName() + ' sent a draw');
	    e.preventDefault();
	}, this));
    }
});

onload = () => {
    window.webxdc.setUpdateListener((update) => {
        setImg(update.payload);
    });
    const update = window.webxdc.getAllUpdates()[0];
    if (update) {
        setImg(update.payload);
    } else {
        setTimeout(initBoard, 200);
    }
};

setImg = (url) => {
    document.getElementById('board').innerHTML = '<img style="max-width:100%;height:auto" src="' + url +'">';
};

initBoard = () => {
    const board = new DrawingBoard.Board('board', {
        webStorage: false,
        errorMessage: 'Failed to load the editor',
    });
    board.addControl('Lock');
};
