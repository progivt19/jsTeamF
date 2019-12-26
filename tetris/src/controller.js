export default class Controller {
    constructor(game,view){
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlaying = false;

        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);

        document.addEventListener('keydown',this.handleKeyDown.bind(this));
        document.addEventListener('keyup',this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play(){
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause(){
        this.isPlaying = false;
        this.startTimer();
        this.updateView();
    }

    reset(){
        this.game.reset();
        this.play = true;

    }

    updateView(){
        const state = this.game.getState();

        if(state.isGameOver){
            this.view.renderEndScreen(state);
        }else if (!this.isPlaying){
            this.view.renderMainScreen(state);
        }else{
            this.updateView();
        }
    }

    startTimer(){
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.intervalId) {this.intervalId = setInterval(() => {
            this.update();
        }, speed > 0 ? speed : 100);
    }
    }

    stopTimer(){
        if (this.intervalId){
            clearInterval(this.inter);
            this.intervalId = null;
        }
        
    }
    
    handleKeyDown(event){
        const state = this.game.getState();

            switch (event.keyCode) {
                case 13://ENTER CODE
                    if (state.isGameOver){
                        this.reset();
                    }else if (this.isPlaying){
                        this.pause();
                    }else{
                        this.play();
                    }
                    break;
                case 37:// LEFT ARROW
                    this.game.movePieceLeft();
                    this.updateView();
                    break;
                case 38: // UP ARROW
                    this.game.rotatePiece();
                    this.updateView();
                    break;
                case 39: // RIGHT ARROW
                    this.game.rotatePieceRight();
                    this.updateView();
                    break;
                case 40://LEFT ARROW
                    this.stopTimer();
                    this.game.rotatePieceDown();
                    this.updateView();
                    break;
            }
        }
    handleKeyUp(event){
        switch (event.keyCode) {
            case 40: //stop timer
                this.startTimer();
                break;
        }
    }
}