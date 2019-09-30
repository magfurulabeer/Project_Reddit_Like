# Project_Reddit_Like

## Front-End for a Posting Application

### Front-end application for a Reddit-like application, where a user — once logged in — can create a post that will show up on every user’s feed and on which any user can comment.

During the planning phase of the project, we utilized Pivotal Tracker software to enter user stories and followed agile techniques to implement the project deliverables.
 
HTML and Javascript, were utilized to develop the front-end of the project.  Javascript was also used to access the back end through an API hosted on Postman.  Google Chrome was the primary tool used to debug the application. As the user interacted with the application, fetch statements were programmed in Javascript to transmit and receive user data and display the data in HTML format in a web page.

The first task to programming was to understand how to obtain the token from the API.  Many of the functions of the application, such as adding/removing posts/comments required user authentication in order to prevent the user from making unauthorized entries in the application. Also, at the onset of programming, it was important to design a page that would organize the structure of all posts so that it would not be too difficult to update them dynamically as the user made submissions.   Once these two tasks were completed and tested, we added functions to add and remove comments from the existing posts. Testing was performed to make sure that the programming to modify existing posts was working correctly.  Next, functions were developed to add new posts which were also tested. After the functions were done being programmed, styles were applied to the code. The final step was to review the existing comments and update the comments in the code. After programming was completed, the entire application was tested to make sure all functions were working correctly.

One of the major hurdles encountered during this project revolved around coding the fetch statements so they were in a format the API was expecting.  Another issue with the fetch was understanding how to pass a token to the API and save it to the local drive.  Coding the fetch statements required many iterations of trial and error. The second issue was refreshing the log of all posts as new posts were added and also when comments were added and removed. Several coding techniques were implemented to keep the listing of all posts updated after every user submission.  Third, when a user logged out, the functions to add posts and add/remove comments could not be used. Lastly, learning how to use the Postman application was a secondary concern.

User Stories:

https://www.pivotaltracker.com/n/projects/2400287

Planning Documentation:

https://drive.google.com/file/d/1YOPOncGN4UADRZwkKkDahOsz3PjCEjjY/view?usp=sharing

Wireframe:

https://drive.google.com/file/d/1BwLWXQ2ESs8CTgY4PTMpcHWIPtREIVy8/view?usp=sharing

Installation Instructions:

Copy src and js folders and index.html, log-in.html, sign-in.html, to a local directory.  Load the index.html in a browser to access the application.
