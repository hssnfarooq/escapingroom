var firebaseConfig = {
  apiKey: 'AIzaSyAkBXrR8vZikdNdsQtFSGctq1iJZiGz0Rc',
  authDomain: 'escaping-19b65.firebaseapp.com',
  databaseURL: 'https://escaping-19b65-default-rtdb.firebaseio.com',
  projectId: 'escaping-19b65',
  storageBucket: 'escaping-19b65.appspot.com',
  messagingSenderId: '1007245873459',
  appId: '1:1007245873459:web:775f2167d3fca100d02e46',
};
firebase.initializeApp(firebaseConfig);

let name, email, message, rating;
var form = document.getElementById('form');
function ready() {
  name = document.getElementById('name').value;
  email = document.getElementById('email').value;
  message = document.getElementById('message').value;
  rating = document.getElementById('rating').value;
}
form.addEventListener('submit', function (event) {
  event.preventDefault();
  ready();
  firebase
    .database()
    .ref('reviews/' + name)
    .set({
      name: name,
      email: email,
      message: message,
      rating: rating,
    })
    .then(() => {
      location.reload();
    })
    .catch(error => {
      console.log(error.message);
    });
});

function selectAllData() {
  firebase
    .database()
    .ref('reviews')
    .once('value', function (allRecords) {
      allRecords.forEach(currentRec => {
        var name = currentRec.val().name;
        var rating = currentRec.val().rating;
        var message = currentRec.val().message;
        addItemsToTable(name, rating, message);
      });
    });
}

window.onload = selectAllData;

function addItemsToTable(name, rating, message) {
  var star =
    rating === '5'
      ? 'images/rating_star.png'
      : rating === '4'
      ? 'images/4_star.png'
      : rating === '3'
      ? 'images/3_star.png'
      : rating === '2'
      ? 'images/2_star.png'
      : 'images/1_star.png';
  var divReview = document.getElementById('div-review');
  var rew = document.createElement('div');
  rew.innerHTML = `
    <div class="reviews_box_holder">
      <div class="reviews_header">
        <img src=${star} />
      </div>

      <div class="reviews_body">
        <div class="text_block">
          <p>
            "${message}"
          </p>

          <div class="review_body_bottom">
            <span class="img_block"
              ><img src="images/user.png"
            /></span>
            <h4 class="name_text">-${name}.</h4>
          </div>
        </div>
      </div>`;

  rew.className = 'col-md-4 col-sm-6';
  divReview.appendChild(rew);
}
