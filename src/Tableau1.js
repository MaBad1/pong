class Tableau1 extends Phaser.Scene{
    preload(){
        this.load.image('cercle',"assets/cercle.png");
        this.load.image('carre',"assets/carre.png");
        this.load.image('back',"assets/back.png");
        this.load.image('gauche',"assets/gauche.png");
        this.load.image('droite',"assets/droite.png");
        this.load.image('flame',"assets/flame.png");
        this.load.image('red',"assets/red.png");
        this.load.image('blue',"assets/blue.png");
    }
    create(){
        this.hauteur=500;
        this.largeur=1000;

        this.bg=this.add.sprite(500,250,'back');
        this.bg.setDisplaySize(1100,500);

        this.balle=this.physics.add.sprite(this.largeur/2,this.hauteur/2,'cercle');
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocity(500,500);
        this.Initiale();

        this.haut=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.bas=this.physics.add.sprite(0,this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        this.gauche=this.physics.add.sprite(0, (this.hauteur/2)-50,'gauche').setOrigin(0,0);
        this.gauche.setDisplaySize(50, 100);
        this.gauche.setImmovable(true);

        this.droite=this.physics.add.sprite(this.largeur-50, (this.hauteur/2)-50,'droite').setOrigin(0,0);
        this.droite.setDisplaySize(50, 100);
        this.droite.setImmovable(true);

        let me=this;

        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);

        this.physics.add.collider(this.balle,this.gauche, function (){
            me.rebond(me.gauche);
        });
        this.physics.add.collider(this.balle,this.droite, function (){
            me.rebond(me.droite);
        });

        this.physics.add.collider(this.haut, this.gauche);
        this.physics.add.collider(this.bas, this.gauche);

        this.physics.add.collider(this.haut, this.droite);
        this.physics.add.collider(this.bas, this.droite);


        this.joueurGauche = new Joueur('Guingamp','joueurGauche')
        this.joueurDroite = new Joueur('FC Bourdeaux','joueurDroite')
        console.log(this.joueurGauche)

        this.particles = this.add.particles('flame');
        this.blueparticles = this.add.particles('blue');
        this.redparticles = this.add.particles('red');

        this.particles.createEmitter({
            speed: 100,
            scale: { start: 0.2, end: 0 },
            blendMode: 'ADD',
            follow:this.balle,
            lifespan: { min: 200, max: 300 },
            quantity: 2,
            angle: this.balle.x+40,
        });

        this.initKeyboard();
    }

    Initiale (){
        this.balle.setX(this.largeur/2);
        this.balle.setY(this.hauteur/2);

        let pourcent = Phaser.Math.Between(0, 100)

        if (pourcent >= 50){
            this.balle.setVelocityX(200);
        }
        if (pourcent < 50){
            this.balle.setVelocityX(-200);
        }

        this.balle.setVelocityY(0);

    }

    rebond(raquette){

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.y - raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette);

        positionRelativeRaquette = positionRelativeRaquette*2-1;

        console.log(positionRelativeRaquette);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette);

    }

    win(joueur){
        joueur.score ++;
        this.Initiale();
    }


    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent) {

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(-400);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(400);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(-400);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(400);
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent) {

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(0);
                    break;
            }
        });
    }

    update(){
        if(this.balle.x > this.largeur){
            this.gauche.setY((this.hauteur/2)-50)
            this.droite.setY((this.hauteur/2)-50)

            this.emitter = this.add.particles('red').createEmitter({
                x : this.largeur,
                y : this.balle.y,
                speed: 500,
                scale: { start: 0.3, end: 0.5 },
                blendMode: 'ADD',
                lifespan: 150,
                quantity: 5,

            });
            this.time.delayedCall(250, ()=>{
                this.emitter.stop();
            });
        }
        if(this.balle.x <0){
            this.gauche.setY((this.hauteur/2)-50)
            this.droite.setY((this.hauteur/2)-50)

            this.emitter = this.add.particles('blue').createEmitter({
                x : 0,
                y : this.balle.y,
                speed: 500,
                scale: { start: 0.3, end: 0.5 },
                blendMode: 'ADD',
                lifespan: 150,
                quantity: 5,

            });
            this.time.delayedCall(250, ()=>{
                this.emitter.stop();
            });
        }

        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }
    }
}
