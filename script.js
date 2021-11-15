 //fetch userData from api and store in variable userData before passing userData into listUsers function
fetch("https://jsonplaceholder.typicode.com/users")
 	.then((res =>	res.json()))
 	.then((userData => listUsers(userData)))
	.catch((err => console.log('error: ' + err))
	);

//use Data from fetch request to create table and set attributes for use in onClick event(clickUser function) replace innerHTML of table row with cell containing userData from the 'name' attribute 'user.name' 

 const listUsers = (userData => {
 	const table = document.getElementById("tableRow").getElementsByTagName("tbody")[0];
 	userData.forEach(user => {
 		const row = table.insertRow(table.rows.length);
 		row.setAttribute("userId", user.id);
 		row.setAttribute("name", user.name);
 		row.setAttribute('username', user.username)
 		row.onclick = (function() {
 			clickUser(this);
 		})
 		let cell = row.insertCell(-1);
 		cell.innerHTML = user.name;
 	})
})




//on click grab attributes from row before fetching posts from api and passing into listPosts function to be laid out in modal
 const clickUser = (row => {
	 const [userId, username, name] = [
		 row.getAttribute("userId"),
		 row.getAttribute("username"),
		 row.getAttribute("name")
	 ];
 	fetch("https://jsonplaceholder.typicode.com/posts")
 		.then(function (res) {
 			return res.json();
 		})
 		.then(function (postData) {
 			listPosts(name, userId, username, postData);
 		})
 		.catch(function (err) {
 			console.log("error: " + err);
 		});
 })
//list users posts in pop up modal post closes when x is clicked by setting display to none and server awaits next click to make api call again for whichever  user.
 const listPosts = ((name, userID, username, postData) => {
 	let posts = "";
 	let modals = document.getElementById("modals");
 	let paragraph = document.getElementById("postText");
 	let span = document.getElementsByClassName("close")[0];
 	let userName = document.getElementById("username");
	 
	 
	 postData.forEach(post => {
 		if (post.userId == userID) {
 			posts += (post.title + "\n");
 			posts += (post.body + "\n \n");
 		}
 	})
 	modals.style.display = "block";
 	paragraph.innerHTML = posts;
 	userName.innerHTML = (`${name}- ` +
 		`UserName: ${username}`);
 	span.onclick = function () {
 		modals.style.display = "none";
 	}
 })







