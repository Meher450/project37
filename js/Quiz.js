class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill('black');
    textSize(50);
    text("RESULT OF THE QUIZ",150,50);

    fill("green");
    textSize(20);
    text("☑",220,145);
    //call getContestantInfo( ) here
    Contestant.getContestantInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      
      //write code to add a note here
      fill("blue");
      textSize(20);
      text("*NOTE: Contestants who answered correct are highlighted in green colour",130,230);
      
      //write code to highlight contest who answered correctly
      var display_answers = 130;
      for(var plr in allContestants) {
        var correctAnswer = "2";
        if(correctAnswer === allContestants[plr].answer){
          fill('green');
        }
        else {
          fill("red");
        }
        display_answers+=30;
        textSize(20)
       text(allContestants[plr].name + ":"+ allContestant[plr].answer,250,display_answers)       
      }
    }
    }   
}
