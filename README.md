# Good Catch
A social platform for fishing hobbyists to create a profile and share their fishing  experiences online.

# URL
This app has been deployed on Render and be accessed at using this link: https://goodcatch.onrender.com/ 

# Development
The start of development involved the setup of various wireframe drawings of the various views that would be rendered by the server.
These wireframes were later referred to during the preparation of the views as a convenient way to draft an initial view's HTML and CSS. 
The wireframes can be viewed at https://whimsical.com/project-2-wireframe-9F9oXCBuvAZuWCWbav25eS

After preparation of wireframes, a preliminary flowchart was prepared to help guide the initial steps of the app's development. This was used initially to help focus attention on the immediate next step in a sequential manner. After approximately ~50% of the app's CRUD features were developed, this tool was discontinued as the remaining tasks could more easily be tracked on Trello. 

The development was started with the setup of a local repo, a GitHub repo and a Render host service, followed by the installation of the modules that would be required for use of the app. The main technologies used were Postgres and Express. For a list of the modules used, please refer to the package.json file.


# Features
GoodCatch is a live web app that allows users to view Catches shared by fellow fishermen online. Users can also create their own profile, which allows them to partake in the fun by sharing their very own experiences online!

1. Sign in/Sign out
- Session storage used to track session data for the client

2. User creation and Catch submissions
- Users can upload an image for the profile picture and for their shared Catches
- Users can edit their profile details and details of Catches that they have created

3. Conditional rendering
- Different layouts for users who are logged in / not logged in
- Different layouts for users who are the owners of the profile or Catch being viewed

4. User input validation
- During registration, user input is checked to verify the email and username provided are both unique
- During login, user email input is checked in the database to verify its presence. For valid email inputs, the password provided is checked for correctness
- During form submissions, the user input is validated to ensure all required fields have been populated
- If the validation fails in any of the above, the page is refreshed and the appropriate warning message(s) are displayed


# Unsolved problems
- The responsiveness of the website Catches is in need of further improvement.
Currently the Home Page is limited to display the 12 most recent catches. This is largely due to styling issues observed in the Catch cards when there are 13 or more cards displayed.
Additionally, other views on the website (e.g. a Catch page) have elements which are prone to clash with each other if the page is viewed on a small screen or a mobile device. Being an app intended for ease of use and quick submissions in the moment, this is a priority and will be addressed in the near future.

- Occasionally, the usernames displayed on the catches will not be loaded properly and will require refreshing of the home page for them to appear. The cause of this is yet unknown and is being investigated.

# Future additions
Due to resource constraints, not all the intended features could be implemented as of now. 
These include:
- Features to allow users to interact with each other and each others' posts/catches (eg. Catch likes and comments)
- A search function allowing users to view catches based on select keywords
- A sort function on the home-page catches 


