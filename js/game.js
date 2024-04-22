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

// class LoadingPage extends Phaser.Scene {
//   constructor() {
//     super({ key: 'loadingPage' });
//   }
//   preload() {
//     this.load.image('loading', './assets/loading.jpg');
//   }
//   create() {
//     this.loading = this.add.sprite(0, 0, 'loading').setScale(0.17);
//     this.loading.x = 800 / 2;
//     this.loading.y = 500 / 2;
//   }
//   update(time) {
//     if (time > 3000) {
//       this.scene.start('Entrer');
//     }
//   }
// }

class Entrer extends Phaser.Scene {
  constructor() {
    super({ key: 'Entrer' });
  }
  preload() {
    this.load.image('Entrerbg', './assets/إلعب الآن (1).png');
    this.load.image('Entrerbtn', './assets/إلعب الآن.png');
  }
  create() {
    this.bg = this.add.sprite(0, 0, 'Entrerbg').setScale(0.418);
    this.bg.x = 800 / 2;
    this.bg.y = 500 / 2;

    this.Entrerbtn = this.add.sprite(800 / 2, (500 / 2) + 180, 'Entrerbtn').setScale(0.45);
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
    this.textArabe = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي","ة"].reverse();
    this.questions = [['من هو خاتم الأنبياء ؟', 'محمد'],
    ['من بنى الكعبة؟', 'ابراهيم'],
    ['أول نبي في الإسلام؟', 'ادم'],
    ['أول مرسل من الله؟', 'نوح'],
    ['أكبر معجزة حصلت على يدي محمد صلى الله عليه وسلم؟', 'القران'],
    ["ما هو اسم الله الأعظم؟","الله"],
    [ "من هو خالق الكون؟","الله"],
    [ "ما هو الدين الذي أنزله الله على نبيه محمد صلى الله عليه وسلم؟","الاسلام"],
    ["ما هو أول ركن من أركان الإسلام؟","التوحيد"],
    [ "ما هي الفريضة التي تعتبر ركناً من أركان الإسلام؟","الصلاة"],
    ["ما هي الزكاة؟","الصدقة"],
    ["ما هو العمل الذي يفرضه الله على المسلمين في شهر رمضان؟","الصيام"],
    ["ما هي الفريضة التي تعتبر ركناً من أركان الإسلام ويؤديها المسلم مرة واحدة في العمر؟","الحج"],
  ];
    this.text1 = [];
    this.isTextComplete = false;
    this.falseLt= []
    this.score = 0;
    this.NbFalse = 0;
   

  }
  preload() {
    this.load.image('bgGame', './assets/Bgv3.png');
    this.load.image('harf', './assets/harf.png');
    this.load.image('GirlIslamik', './assets/GirlIslamik.png');
    this.load.image('true', './assets/true.png');
    this.load.image('false', './assets/false.png');
    this.load.image('Score', './assets/score.png');
    // this.load.image('nextLevel', './assets/nextLevel.jpeg');
    this.load.audio("mp3game",'./assets/mp3game.wav');
  }

  create() {
    for (let ind = 0; ind < this.textArabe.length; ind++) {
      let buttonX;
      let buttonY;
      let buttonHarfY;
      if (ind < 7) {
        buttonX = 142 + ind * 37;
        buttonY = 383;
        buttonHarfY = 410;
        // last 
        
      } else if (ind < 18) {
        buttonX = 215 + (ind - 11) * 37;
        buttonY = 350;
        buttonHarfY = 370;
      } else {
        buttonX = 66 + (ind - 18) * 37;
        buttonY = 318;
        buttonHarfY = 330;
        // first
      }

      let lettre = this.textArabe[ind];
    //  this.harf = this.add.image(buttonX+22, buttonHarfY, 'harf').setScale(0.45);
      this.ArabeText = this.add.text(buttonX+15, buttonY, lettre,{ font: '15px Arial', fill: '#4d2412',padding: { x: 1, y: 8 } });
      this.ArabeText.setInteractive({ useHandCursor: true });
      

      this.ArabeText.on('pointerdown', () => this.clickButtonText(lettre, buttonX, buttonY));
    }
    this.bgGame = this.add.image(0, 0, 'bgGame').setScale(0.418);
    this.bgGame.x = 800 / 2;
    this.bgGame.y = 500 / 2;
    this.bgGame.removeInteractive();

    this.girl = this.add.image(0, 0, 'GirlIslamik').setScale(0.75);
    this.girl.x = 1250 / 2;
    this.girl.y = 525 / 2;

    this.scoreTextStyle = {
      font: '15px Arial',
      fill: 'white',
      color: '#DDDDDD',
      wordWrap: { width: 300 },
      padding: { x: 1, y: 8 },
      
    };


    this.matchtext = [this.questions[Math.floor(Math.random() * this.questions.length)]];
    
    // Taille maximale de la police pour la question
    const maxFontSize = 22;
    
    // Vérifier la longueur de la question et ajuster la taille de la police si nécessaire
    let questionFontSize = maxFontSize;
    const maxQuestionWidth = 300; // Largeur maximale pour la question
    const questionText = this.matchtext[0][0];
    // Affichage de la question avec la taille de police ajustée
    this.textQ = this.add.text(280, 180, questionText, { fontSize: questionFontSize + 'px', fill: '#4d2412', wordWrap: { width: maxQuestionWidth } }).setOrigin(0.5);

    let tirerFontSize = maxFontSize;
    const maxtitreWidth = 150;
    let startX = 170;
    let textRArray = [];
    for (let indexP = 0; indexP < this.matchtext[0][1].length; indexP++) {
      let textR = this.add.text(startX, 270, '-', { fontSize: 15 + 'px', fill: '#4d2412', wordWrap: { width: maxtitreWidth } }).setOrigin(0.5);
      startX += 25;
      textRArray.push(textR);
    }
    this.joined = this.add.text(80, 105, '', { fontSize: '32px', fill: '#0C0C0C' });
    

   

    this.textR = textRArray.reverse();
    this.add.image(435,70,'Score').setScale(0.45);
    this.scoretext = this.add.text(392, 59, this.score+':النقاط', { fontSize: '18px', fill: 'white' });
   
    this.questions.splice(this.questions.indexOf(this.matchtext[0]), 1);
    // this.timerText = this.add.text(700, 20, 'Time: 60', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
    // this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });

  }

  update() {
    if (this.text1.join('').length === this.matchtext[0][1].length) {
      const joinedText = this.text1.join('');
      this.joined.setText(joinedText);
      this.score += 10;
      this.text1 = [];
      this.scoretext.setText(this.score);
      this.trueIM.destroy();
      this.create();
    }
   
  }

  clickButtonText(lettre, x, y) {
    if (this.matchtext[0][1].includes(lettre)) {
      if (!this.text1.includes(lettre)) {
        this.scoretext.setText(this.score+':النقاط');
      }
      this.trueIM = this.add.image(x + 21, y + 18, 'true').setScale(0.05)
      let indexes = [];
      for (let i = 0; i < this.matchtext[0][1].length; i++) {
        if (this.matchtext[0][1][i] === lettre) indexes.push(i);
      }
      indexes.forEach(index => {
        this.text1[index] = lettre;
        this.textR[index].setText(lettre);
      });

    } else {
      
      if (!this.falseLt.includes(lettre)) {
        this.falseLt.push(lettre);
        // Affichez l'image de la lettre fausse seulement si NbFalse est inférieur ou égal à 3
        if (this.NbFalse <= 3) {
          this.NbFalse++;
          this.falseIM = this.add.image(x + 21, y + 18, 'false').setScale(0.05);
        }
        if (this.NbFalse === 3) {
          this.scene.start('gameOver');
          this.NbFalse = 0;
          this.score = 0;
          this.falseLt = [];
          this.falseIM.destroy();
        }
      }
      
    }
  }
}

class gameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOver' });
  }
  preload() {
    this.load.image('Overbg', './assets/إنتهت اللعبة.png');
    this.load.image('playagain', './assets/إعادة اللعب.png');
    this.load.image('out', './assets/خروج.png');
  }
  create() {
    this.bg = this.add.sprite(0, 0, 'Overbg').setScale(0.418);
    this.bg.x = 800 / 2;
    this.bg.y = 500 / 2;

    this.Entrerbtn = this.add.sprite(280 , 320, 'playagain').setScale(0.5);
    this.Entrerbtn.setInteractive({ useHandCursor: true });
    this.Entrerbtn.on('pointerdown', () => this.clickButton());

    this.outbtn = this.add.sprite(280 , 400, 'out').setScale(0.5);
  }
  update() { }

  clickButton() {
    this.restartGame();
    this.Entrerbtn.destroy();
  }
  restartGame() {
    this.scene.start('Game');
  }
}

game.scene.add('Entrer', Entrer);
// game.scene.add('loadingPage', LoadingPage);
game.scene.add('Game', GameLogic);
game.scene.add('gameOver', gameOver);
game.scene.start('Entrer');
