// Client facing scripts here


// button.addEventListener('click', () => {
//     button.classList.toggle('liked')
// })
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
        })
    });
      // ajax call that passes in likeID as a paramter to update database
    })
  })

