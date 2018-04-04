// start
$('document').ready(function () {
// jQuery
  // __________________________________________________________________________________________________
  //   button triggered ajax
  // ________________________________________________________________________________________________________

  // Event listener for all button elements
  $("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-person");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "") {
          // Creating a div with the class "item"
          // var gifDiv = $("<div class='my_class_2 freezeframe-responsive'>");
          var gifDiv = $("<div>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating).css("color", "white");

          // Creating an image tag
          var personImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(personImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
  });


  // __________________________________________________________________________________________________________
  // add button to dom
  // __________________________________________________________________________________________________________

  // Create an initial toDoCount variable
  var toDoCount = 0;

  //  On Click event associated with the add-to-do function
  $("#add-to-do").on("click", function(event) {
    event.preventDefault();

    // Get the to-do "value" from the textbox and store it a variable
    var toDoTask = $("#to-do").val().trim();

    // Create a new variable that will hold a "<p>" tag.
    // Then give it an ID in the following form:
    // "item-4" or "item-3" or "item-99", where the number is equal to toDoCount.
    // Then append the to-do "value" as text to this <p> element.
    var toDoItem = $("<p>");

    toDoItem.attr("id", "item-" + toDoCount);
    toDoItem.append(" " + toDoTask);

    // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
    // Give your button a data attribute called data-to-do and a class called "checkbox".
    // Lastly append the letter X inside.

    var toDoClose = $("<button>");

    toDoClose.attr("data-to-do", toDoCount);
    toDoClose.addClass("checkbox");
    toDoClose.append("✓");

    // Append the button to the to do item
    toDoItem = toDoItem.prepend(toDoClose);

    // Add the button and to do item to the to-dos div
    $("#to-dos").append(toDoItem);

    // Clear the textbox when done
    $("#to-do").val("");

    // Add to the toDoCount
    toDoCount++;
  });

  // When a user clicks a check box then delete the specific content
  // (NOTE: Pay attention to the unusual syntax here for the click event.
  // Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)
  $(document.body).on("click", ".checkbox", function() {

    // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
    var toDoNumber = $(this).attr("data-to-do");

    // Select and Remove the specific <p> element that previously held the to do item number.
    $("#item-" + toDoNumber).remove();
  });
// end
});
// jQuery
