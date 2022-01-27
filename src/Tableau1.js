class Tableau1 extends Phaser.Scene{
    preload(){
        //Preload de tous les assets.

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

        //Background

        this.bg=this.add.sprite(500,250,'back');
        this.bg.setDisplaySize(1100,500);

        //Sprite de la balle et paramètres

        this.balle=this.physics.add.sprite(this.largeur/2,this.hauteur/2,'cercle');
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocity(500,500);
        this.Initiale();

        //Limites haute et basse du terrain

        this.haut=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.bas=this.physics.add.sprite(0,this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        //raquettes gauches

        this.gauche=this.physics.add.sprite(0, (this.hauteur/2)-50,'gauche').setOrigin(0,0);
        this.gauche.setDisplaySize(50, 100);
        this.gauche.setImmovable(true);

        this.gauche2=this.physics.add.sprite(300, 50,'gauche').setOrigin(0,0);
        this.gauche2.setDisplaySize(50, 100);
        this.gauche2.setImmovable(true);

        this.gauche3=this.physics.add.sprite(300, this.hauteur-150,'gauche').setOrigin(0,0);
        this.gauche3.setDisplaySize(50, 100);
        this.gauche3.setImmovable(true);

        //raquettes droites

        this.droite=this.physics.add.sprite(this.largeur-50, (this.hauteur/2)-50,'droite').setOrigin(0,0);
        this.droite.setDisplaySize(50, 100);
        this.droite.setImmovable(true);

        this.droite2=this.physics.add.sprite(this.largeur-350, 50,'droite').setOrigin(0,0);
        this.droite2.setDisplaySize(50, 100);
        this.droite2.setImmovable(true);

        this.droite3=this.physics.add.sprite(this.largeur-350, this.hauteur-150,'droite').setOrigin(0,0);
        this.droite3.setDisplaySize(50, 100);
        this.droite3.setImmovable(true);

        let me=this;

        //colliders

        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);

        this.physics.add.collider(this.balle,this.gauche, function (){
            me.rebond(me.gauche);
        });
        this.physics.add.collider(this.balle,this.gauche2, function (){
            me.rebond(me.gauche2);
        });
        this.physics.add.collider(this.balle,this.gauche3, function (){
            me.rebond(me.gauche3);
        });

        this.physics.add.collider(this.balle,this.droite, function (){
            me.rebond(me.droite);
        });
        this.physics.add.collider(this.balle,this.droite2, function (){
            me.rebond(me.droite2);
        });
        this.physics.add.collider(this.balle,this.droite3, function (){
            me.rebond(me.droite3);
        });


        //joueurs

        this.joueurGauche = new Joueur('Guingamp','joueurGauche')
        this.joueurDroite = new Joueur('FC Bourdeaux','joueurDroite')
        console.log(this.joueurGauche)

        //Particules

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
        //fonction pour initialiser la vitesse et la direction de la balle au début d'un round
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

            //inputs pour avoir un movement et un arrêt simultané des raquettes en gardant un même écart entre les raquettes du milieu de terrain.

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    if (me.gauche.y>20){
                        me.gauche.setVelocityY(-400)
                    }
                    else{
                        me.gauche.setY(20)
                        me.gauche.setVelocityY(0)
                    }
                    if (me.gauche2.y>20){
                        me.gauche2.setVelocityY(-200)
                    }
                    else{
                        me.gauche2.setY(20)
                        me.gauche2.setVelocityY(0)
                    }
                    if (me.gauche2.y>20){
                        me.gauche3.setVelocityY(-200)
                    }
                    else{
                        me.gauche3.setY(320)
                        me.gauche3.setVelocityY(0)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.X:
                    if (me.gauche.y<380){
                        me.gauche.setVelocityY(400)
                    }
                    else{
                        me.gauche.setVelocityY(0)
                        me.gauche.setY(380)
                    }
                    if (me.gauche3.y<380){
                        me.gauche2.setVelocityY(200)
                    }
                    else{
                        me.gauche2.setVelocityY(0)
                        me.gauche2.setY(80)
                    }
                    if (me.gauche3.y<380){
                        me.gauche3.setVelocityY(200)
                    }
                    else{
                        me.gauche3.setVelocityY(0)
                        me.gauche3.setY(380)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.J:
                    if (me.droite.y>20){
                        me.droite.setVelocityY(-400)
                    }
                    else{
                        me.droite.setY(20)
                        me.droite.setVelocityY(0)
                    }
                    if (me.droite2.y>20){
                        me.droite2.setVelocityY(-200)
                    }
                    else{
                        me.droite2.setY(20)
                        me.droite2.setVelocityY(0)
                    }
                    if (me.droite2.y>20){
                        me.droite3.setVelocityY(-200)
                    }
                    else{
                        me.droite3.setY(320)
                        me.droite3.setVelocityY(0)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.N:
                    if (me.droite.y<380){
                        me.droite.setVelocityY(400)
                    }
                    else{
                        me.droite.setVelocityY(0)
                        me.droite.setY(380)
                    }
                    if (me.droite3.y<380){
                        me.droite2.setVelocityY(200)
                    }
                    else{
                        me.droite2.setVelocityY(0)
                        me.droite2.setY(80)
                    }
                    if (me.droite3.y<380){
                        me.droite3.setVelocityY(200)
                    }
                    else{
                        me.droite3.setVelocityY(0)
                        me.droite3.setY(380)
                    }
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent) {

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(0);
                    me.gauche2.setVelocityY(0);
                    me.gauche3.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(0);
                    me.gauche2.setVelocityY(0);
                    me.gauche3.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(0);
                    me.droite2.setVelocityY(0);
                    me.droite3.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(0);
                    me.droite2.setVelocityY(0);
                    me.droite3.setVelocityY(0);
                    break;
            }
        });
    }

    update(){
        if(this.balle.x > this.largeur){
            this.gauche.setY((this.hauteur/2)-50)
            this.gauche2.setY(50)
            this.gauche3.setY(this.hauteur-150)
            this.droite.setY((this.hauteur/2)-50)
            this.droite2.setY(50)
            this.droite3.setY(this.hauteur-150)

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
            this.gauche2.setY(50)
            this.gauche3.setY(this.hauteur-150)
            this.droite.setY((this.hauteur/2)-50)
            this.droite2.setY(50)
            this.droite3.setY(this.hauteur-150)

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
