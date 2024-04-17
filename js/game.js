
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: 0xffffff,
};
const game = new Phaser.Game(config);

class LoadingPage extends Phaser.Scene {
  constructor() {
    super({ key: 'loadingPage' });
  }
  preload() {
    this.load.image('loading', './assets/loading.jpg');
  }
  create() {
    this.loading = this.add.sprite(0, 0, 'loading').setScale(0.17);
    this.loading.x = 800 / 2;
    this.loading.y = 500 / 2;
  }
  update(time) {
    if (time > 3000) {
      this.scene.start('Entrer');
    }
  }
}

class Entrer extends Phaser.Scene {
  constructor() {
    super({ key: 'Entrer' });
  }
  preload() {
    this.load.image('Entrerbg', './assets/Entrerbg.jpg');
    this.load.image('Entrerbtn', './assets/Entrer.png');
  }
  create() {
    this.bg = this.add.sprite(0, 0, 'Entrerbg').setScale(0.20);
    this.bg.x = 800 / 2;
    this.bg.y = 500 / 2;

    this.Entrerbtn = this.add.sprite(800 / 2, (500 / 2) + 100, 'Entrerbtn').setScale(0.08);
    this.Entrerbtn.setInteractive({ useHandCursor: true });
    this.Entrerbtn.on('pointerdown', () => this.clickButton());
  }
  update() { }

  clickButton() {
    this.scene.start('Game');
    this.Entrerbtn.destroy();
  }
}

class GameLogic extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
    this.textArabe = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];
    this.questions = [['من هو خاتم الأنبياء ؟', 'محمد'],
    ['من بنى الكعبة؟', 'ابراهيم'],
    ['أول نبي في الإسلام؟', 'ادم'],
    ['أول مرسل من الله؟', 'نوح'],
    ['أكبر معجزة حصلت على يدي محمد صلى الله عليه وسلم؟', 'القران'],
    ["ما هو اسم الله الأعظم؟","الله"],
    [ "من هو خالق الكون؟","الله"],
    [ "ما هو الدين الذي أنزله الله على نبيه محمد صلى الله عليه وسلم؟","الاسلام"],
    ["ما هو أول ركن من أركان الإسلام؟","التوحيد"],
    [ "ما هو الفريضة التي تعتبر ركناً من أركان الإسلام؟","الصلاة"],
    ["ما هي الزكاة؟","الصدقة"],
    ["ما هو العمل الذي يفرضه الله على المسلمين في شهر رمضان؟","الصيام"],
    ["ما هو الفريضة التي تعتبر ركناً من أركان الإسلام ويؤديها المسلم مرة واحدة في العمر؟","الحج"],

  
  
  ];
    this.text1 = [];
    this.isTextComplete = false;
    this.score = 0;
    this.NbFalse = 0;

    // Initialisation du texte affiché
  }
  preload() {
    this.load.image('bgGame', './assets/bgGame.jpg');
    this.load.image('GirlIslamik', './assets/GirlIslamik.png');
    this.load.image('button', './assets/button.png');
    this.load.image('true', './assets/true.png');
    this.load.image('false', './assets/false.png');
    this.load.image('nextLevel', './assets/nextLevel.jpeg');
  }

  create() {
    this.bgGame = this.add.image(0, 0, 'bgGame').setScale(0.15);
    this.bgGame.x = 800 / 2;
    this.bgGame.y = 500 / 2;
    this.bgGame.removeInteractive();

    this.girl = this.add.image(0, 0, 'GirlIslamik').setScale(0.75);
    this.girl.x = 1250 / 2;
    this.girl.y = 500 / 2;

    this.scoreTextStyle = {
      font: '24px Arial',
      fill: '#000',
      backgroundColor: '#DDDDDD',
      wordWrap: { width: 400 },
      padding: { x: 8, y: 10 }
    };


    this.matchtext = [this.questions[Math.floor(Math.random() * this.questions.length)]];
    this.textQ = this.add.text(250, 40, this.matchtext[0][0], { fontSize: '22px', fill: '#0C0C0C' }).setOrigin(0.5);;
    //  console.log(this.matchtext[0][1])
    // Affichage du texte caché
    let startX = 200;
    let textRArray = [];
    for (let indexP = 0; indexP < this.matchtext[0][1].length; indexP++) {
      let textR = this.add.text(startX, 120, '-', { fontSize: '32px', fill: '#0C0C0C' }).setOrigin(0.5);
      startX += 40; // Augmenter la position horizontale pour chaque lettre
      textRArray.push(textR);
    }
    this.joined = this.add.text(80, 105, '', { fontSize: '32px', fill: '#0C0C0C' });

    // Affichage des lettres arabes
    for (let ind = 0; ind < this.textArabe.length; ind++) {
      let buttonX;
      let buttonY;
      if (ind < 11) {
        buttonX = 50 + ind * 40;
        buttonY = 350;
      } else if (ind < 22) {
        buttonX = 50 + (ind - 11) * 40;
        buttonY = 400;
      } else {
        buttonX = 150 + (ind - 22) * 40;
        buttonY = 450;
      }

      let lettre = this.textArabe[ind];
      this.ArabeText = this.add.text(buttonX, buttonY, lettre, this.scoreTextStyle);
      this.ArabeText.setInteractive({ useHandCursor: true });

      // Ajout d'un événement pointerdown pour chaque lettre arabe
      this.ArabeText.on('pointerdown', () => this.clickButtonText(lettre, buttonX, buttonY));
    }

    // this.sound.play('Mp3', { loop: true });
    this.textR = textRArray.reverse();
    this.scoretext = this.add.text(650, 20, 'Score: ' + this.score, { fontSize: '22px', fill: '#0C0C0C' })
    console.log(this.matchtext[0][0])

  }

  update() {
    if (this.text1.join('') === this.matchtext[0][1]) {
      const joinedText = this.text1.join('');
      this.joined.setText(joinedText);
      this.score += 10;
      game.scene.start('Game')
      
      console.log(this.text1.join(''))
      // Mettre à jour le texte complet
      // console.log(this.matchtext[0][1])
      // console.log(this.text1)
    }
  }

  clickButtonText(lettre, x, y) {
    if (this.matchtext[0][1].includes(lettre)) {
      if (!this.text1.includes(lettre)) {

        this.scoretext.setText('Score: ' + this.score);
      }
      this.trueIM = this.add.image(x + 14, y + 20, 'true').setScale(0.07)
      let indexes = [];
      for (let i = 0; i < this.matchtext[0][1].length; i++) {
        if (this.matchtext[0][1][i] === lettre) indexes.push(i);
      }
      indexes.forEach(index => {
        this.text1[index] = lettre;
        this.textR[index].setText(lettre); // Mettre à jour la lettre correspondante dans le texte caché
      });

    } else {


      this.NbFalse++

      if (this.NbFalse <= 3) {
        this.falseIM = this.add.image(x + 14, y + 20, 'false').setScale(0.07)
      }

      if (this.NbFalse == 3) {
      
          this.scene.start('gameOver');
          this.NbFalse=0;
        
      }



    }

    
  }


}

class gameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOver' });
  }
  preload() {
    this.load.image('Overbg', './assets/gameOver.jpg');
    this.load.image('playagain', './assets/playagain.png');
  }
  create() {
    this.bg = this.add.sprite(0, 0, 'Overbg').setScale(0.20);
    this.bg.x = 800 / 2;
    this.bg.y = 500 / 2;

    this.Entrerbtn = this.add.sprite(800 / 2, (700 / 2) + 100, 'playagain').setScale(0.5);
    this.Entrerbtn.setInteractive({ useHandCursor: true });
    this.Entrerbtn.on('pointerdown', () => this.clickButton());
  }
  update() { }

  clickButton() {
    this.scene.start('Game');
    this.Entrerbtn.destroy();
  }
}

game.scene.add('Entrer', Entrer);
game.scene.add('loadingPage', LoadingPage);
game.scene.add('Game', GameLogic);
game.scene.add('gameOver', gameOver);
game.scene.start('Game'); // Démarre la scène Game directement