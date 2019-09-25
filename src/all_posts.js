console.log("Hello World");
const posts = document.getElementById('posts');

//Retrieves all posts and push into table
fetch(`http://thesi.generalassemb.ly:8080/post/list`)
    .then(function(response){
        return response.json();
    })
    .then(function(all_posts){
        //console.log(all_posts);
        
        for (let i = 0; i < all_posts.length; ++i) {
            //console.log(all_posts[i]);
            const result = all_posts[i];
            const row = posts.insertRow(i + 1);
            const row0 = row.insertCell(0);
            const row1 = row.insertCell(1);
            const row3 = row.insertCell(2);
            row0.innerHTML = result.user.username;
            row1.innerHTML = result.title;
            row3.innerHTML=result.description;
        }
    })
