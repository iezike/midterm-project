// // Client facing scripts here

// $(function() {

//   $('.comment-form').on('submit', function(event) {
//     event.preventDefault();
//     const commentText = $(this).children('.comment-text-area').val();

//     $('.error-text').slideUp();

//     if (commentText === '') {
//       $('.error-text').html('⚠️ Need to enter some text before submitting. ⚠️');
//       $('.error-text').slideDown();
//       return;
//     }
//     const commentString = $(this).serialize();

//     //Sends a POST request when text is input and clears textarea as well as resetting counter back to 140
//     $.post('/favourites/<%=id%>', commentString)
//       .done(function() {
//         console.log('Success', commentString)
//         $('.comment-text-area').val('');


//       });
//   })

// })
