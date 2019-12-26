export default class View {
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };
    constructor(element, width, height, rows , columns) {
        this.element = element;
        this.width = width;
        this.heights = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context = this.canvas.getContext('2d');

        this.renderPlayfieldBorderWidth = 4; 
        this.playfieldX = this.renderPlayfieldBorderWidth;
        this.playfieldY = this.renderPlayfieldBorderWidth;
        this.renderPlayfieldWidth = this.width * 2 / 3;
        this.renderPlayfieldHeight = this.height;
        this.renderPlayfieldInnerWidth = this.renderPlayfieldWidth - this.renderPlayfieldBorderWidth * 2;
        this.renderPlayfieldInnerHeight = this.renderPlayfieldHeight - this.renderPlayfieldBorderWidth * 2;

        this.blockWidth = this.width / columns;
        this.blockHeight = this.height / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelX;Height = this.height;
        
        this.element.appendChild(this.canvas);
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
    
    }

    renderStartScreen(){
        this.contex.fillStyle = 'White';
        this.context.font = '18px "Press start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to NACHATT', this.width / 2, this.height / 2);
    }

    renderPauseScreen(){
        this.context.fillStyle = 'rgba(0,0,0,0.75)';
        this.context.fillStyle.fillRect(0,0, this.width, this.height);

        this.contex.fillStyle = 'White';
        this.context.font = '18px "Press start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to PRODOLSHIIT', this.width / 2, this.height / 2);
    }

        renderEndScreen({score}){
            this.clearScreen();
    
            this.contex.fillStyle = 'White';
            this.context.font = '18px "Press start 2P"';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText('TEBE KRYSHKA', this.width / 2, this.height / 2 - 48);
            this.context.fillText('Score', this.width / 2, this.height / 2);
            this.context.fillText('Pres ENTER TO PEREZAPUSTIT ', this.width / 2, this.height / 2 + 48);
        }


            clearScreen() {
                this.context.clearRect(0, 0, this.width, this.height);
        
            }

    renderPlayfield({playfield}) {
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                const block = playfield[y][x];

                if (block) {
                    this.renderBlock(
                        this.playdieldX + (x * this.blockWidth),
                        this.playfieldY + (y * this.blockHeight),
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[block]
                    );
                } 
                
            }
        }
        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.renderPlayfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.renderPlayfieldHeight);
    }

    renderPanel({level, score, lines, nextPiece}) {
        this.context.textAlign = 'start';
        this.contex.textBaseLine = 'top';
        this.context.fillStyle = 'white';
        this.contaxt.font = '14px "press Start 2p"';

        this.context.fillText(`Score: ${level}`, this.panelX , this.panelY + 0);
        this.context.fillText(`Lines: ${level}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
        this.context.fillText('Next:', this.panelX,this.panelY + 96);

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks.length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * 0.5),
                        this.panelY + 100 + (y * this.blockHeight),
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        View.colors[block]
                    );
                }
            }      
        }
    }

    renderBlock(x, y , width, height, color) {
        this.context.fillStyle = 'red';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        
        this.context.fillRect(x, y , width, height);
        this.context.strokeRect(x, y ,width, height);
    }
}