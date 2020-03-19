/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const prefix = "https://api.github.com/users/";
axios
  .get(`${prefix}NateTheDev1`)
  .then(response => {
    console.log(response);
    cardCreator(response);
    axios
      .get(response.data.followers_url)
      .then(friends => {
        // console.log(friends.data);
        friends.data.forEach(f => {
          followersArray.push(f.login);
        });
        addFriends();
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

const addFriends = () => {
  followersArray.forEach(f => {
    axios
      .get(`${prefix}${f}`)
      .then(response => {
        cardCreator(response);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const cardCreator = user => {
  const gitUser = user.data;
  let elements = [];
  let infoElements = [];
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  let picture = document.createElement("img");
  picture.src = gitUser.avatar_url;
  elements.push(picture);

  const calender = document.createElement("div");
  calender.classList.add("calender");
  GitHubCalendar(calender, gitUser.login);
  // elements.push(calender);

  let cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  let h3 = document.createElement("h3");
  h3.textContent = gitUser.name;
  h3.classList.add("name");
  infoElements.push(h3);

  let username = document.createElement("p");
  username.textContent = gitUser.login;
  username.classList.add("username");
  infoElements.push(username);

  let location = document.createElement("p");
  location.textContent = gitUser.location;
  infoElements.push(location);

  let profile = document.createElement("p");
  profile.textContent = "Profile: ";

  let url = document.createElement("a");
  url.href = gitUser.url;
  url.textContent = gitUser.url;
  profile.appendChild(url);
  infoElements.push(profile);

  let followers = document.createElement("p");
  followers.textContent = `Followers: ${gitUser.followers}`;
  infoElements.push(followers);

  let following = document.createElement("p");
  following.textContent = `Following: ${gitUser.following}`;
  infoElements.push(following);

  let bio = document.createElement("p");
  bio.textContent = `Bio: ${gitUser.bio}`;
  infoElements.push(bio);

  infoElements.forEach(e => {
    cardInfo.appendChild(e);
  });

  elements.push(cardInfo);

  let cards = document.querySelector(".cards");
  elements.forEach(e => {
    cardContainer.appendChild(e);
  });

  cards.appendChild(cardContainer);
  cards.appendChild(calender);
};
