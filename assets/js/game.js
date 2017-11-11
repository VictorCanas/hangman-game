// This array holds the words we are going to choose from.
var words = ['eleven', 'demogorgon', 'barbara', 'will', 'lucas'];

// This array holds number, max, and letters gueesed.
var guesses = { number: 0, max: 6, letters: {} };

//chooses a random word 
var rand = parseInt(Math.random() * words.length);

//assigns that random word to word  
var word = words[rand].toUpperCase();

//Array to concatenate the word with - 
var displayWord = "-".repeat(word.length);

document.getElementById("distext").innerHTML = displayWord;

//This gets the image but it also gets the image of what it's being guessed
//This is done creatively by using the variable word and having the image file match the array of word 
document.getElementById('image').src = "assets/images/" + word + ".png";

//Logic of the game 
document.onkeyup = function(event)
{
  var letter = String.fromCharCode(event.keyCode).toUpperCase();

  displayStatus();

  if (/^[A-Z]$/.test(letter))
  {
    if (guesses.letters[letter])
    { 
      displayStatus( letter + " has been guessed - Try again!");
    }
    else
    {
      displayStatus("Good guess!");
      guesses.letters[letter] = true;

      if (word.indexOf(letter) !== -1)
      {
        for (var i = 0; i < word.length; i++)
        {
          if (letter == word.charAt(i))
          {
            displayWord = displayWord.replaceAt(i, letter);
          }
        }
      }
      else
      {
        guesses.number++;
        displayStatus("Sorry, no '" + letter + "', try again!");
      }

      document.getElementById("distext").innerHTML = displayWord;
      document.getElementById("guesses").innerHTML = Object.keys(guesses.letters).join(', ');

      if (displayWord == word)
      {
        displayStatus("You win!!");
        document.onkeyup = null;
        document.getElementById("distext").innerHTML = displayWord;
      }
      else if (guesses.number == guesses.max)
      {
        displayStatus("You've been hung!!");
        document.onkeyup = null;
      }

    }
  }
  else
  {
    displayStatus("Please type a letter of the alphabet!");
  }

}

function displayStatus(status)
{
  document.getElementById("statext").innerHTML = status;
}


String.prototype.replaceAt = function(index, replacement)
{
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
