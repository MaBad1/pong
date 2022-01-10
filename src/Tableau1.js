class Tableau1 extends Phaser.Scene{
    preload(){
        this.load.image('cercle',"assets/cercle.png");
        this.load.image('carre',"assets/carre.png");
    }
    create(){
        this.hauteur=500;
        this.largeur=1000;

        this.balle=this.physics.add.sprite(this.largeur/2,this.hauteur/2,'cercle');
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.setVelocityX(Phaser.Math.Between(-200,200));
        this.balle.body.setMaxVelocity(500,500);

        this.haut=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.bas=this.physics.add.sprite(0,this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        this.gauche=this.physics.add.sprite(0, (this.hauteur/2)-30,'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20, 100);
        this.gauche.setImmovable(true);

        this.droite=this.physics.add.sprite(this.largeur-20, (this.hauteur/2)-30,'carre').setOrigin(0,0);
        this.droite.setDisplaySize(20, 100);
        this.droite.setImmovable(true);

        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);
        this.physics.add.collider(this.balle,this.gauche);
        this.physics.add.collider(this.balle,this.droite);
        this.initKeyboard();
    }

    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent) {

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.setVelocityY(-100);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.setVelocityY(100);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droite.setVelocityY(-100);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droite.setVelocityY(100);
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent) {

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droite.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droite.setVelocityY(0);
                    break;
            }
        });
    }

    update(){
        if(this.balle.x > this.largeur){
            this.balle.x=0;
        }
        if(this.balle.x < 0){
            this.balle.x= this.largeur;
        }
        if(this.balle.y < 0){
            this.balle.y=0;
        }
        if(this.balle.y > this.hauteur){
            this.balle.y = this.hauteur;
        }

    }
}
