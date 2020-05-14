$(function() {
    var clickCount;
    var matches, $matches;
    var monkeyClasses = ["SeeNoEvil", "HearNoEvil", "SpeakNoEvil"];
    var $monkeys;
    var $resetBtn;
    var pair;
    
    $monkeys = $('#monkeys div');
    $matches = $('#matches');
    $resetBtn = $('#reset');
    
    if (!localStorage.getItem('matches')) {
        localStorage.setItem('matches', 0);
    }
    
    function init() {
        clickCount = 0;
        matches = Number(localStorage.getItem('matches'));
        $matches.text(matches);
        pair = [];
        
        $monkeys.each(function() {
            let randomClass;
            let num = monkeyClasses.length;
            randomClass = monkeyClasses[
            Math.floor(Math.random()*num)
            ];
        
            $(this).addClass("_" + randomClass);
        
    });
  
}
    
    function checkForMatch() {
        let classVal = $(this).attr('class');
        
        function updateClass(div) {
            if (classVal[0] === '_') {
                classVal = classVal.slice(1);
                div.attr('class', classVal);
                pair.push(classVal);
                clickCount++;
                }    
        }
        
        updateClass($(this));
        
        if (clickCount === 2 && pair [0] === pair[1]) {
            matches++;
            $matches.text(matches);
            localStorage.setItem('matches', matches);
            clickCount = 0;
            
        }

       /* switch(clickCount) {
            case 0:
            case 1:
                updateClass($(this));
                break;
                
            case 2:
                if (pair[0] === pair[1]) {
                    matches++;
                    $matches.text(matches);
                }
                break;
            default:
                console.log("Uh Oh");   
        }
        */
    }
    function resetGame() {
        //remove all class attributes
        $monkeys.each(function () {
            $(this).removeClass();
        });
        
        //re-initialize
        init();
    }
    
    $monkeys.on('click', checkForMatch);
    $resetBtn.on('click', resetGame);
    init ();
   });
