// // Client facing scripts here

const likeButtons = [...document.querySelectorAll('.like')]
console.log(likeButtons);

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector('.btn')
  console.log("abc");
  button.classList.toggle('liked')

  likeButtons.forEach(item => {
    const likeID = item.dataset.like;
    console.log(likeID);
    item.addEventListener('click', () => {
      console.log('I clicked on ID ', item.dataset.like);
      console.log('Id is ', likeID);

        return $.ajax({
          method: "POST",
          url: "/index/update/" + likeID,
          success: function (data) {
            console.log("data", data);
            const { like_count } = data.results[0]
            console.log("like count: ", like_count);
            $(`.number_of_likes_${likeID}`).empty()
            $(`.number_of_likes_${likeID}`).text(`${like_count} likes`).html()
          }

        })
    });
      // ajax call that passes in likeID as a paramter to update database
    })
  })

