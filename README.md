# Good Catch
A social platform for fishing hobbyists to create a profile and share their fishing  experiences online.

# URL
This app has been deployed on Render and be accessed at using this link: https://goodcatch.onrender.com/ 

# Development
At the start of development, a considerable amount of time was spent preparing wireframe drawings of the views that would be displayed to a user during their time on GoodCatch.
These wireframes were later referred to during the preparation of the views as a convenient way to draft an initial view's HTML and CSS. 
These wireframes can be viewed at https://whimsical.com/project-2-wireframe-9F9oXCBuvAZuWCWbav25eS

After preparation of wireframes, a preliminary flowchart was prepared to help guide the initial steps of the app's development. This was used initially to help focus attention on the immediate next step in a sequential manner. After approximately ~50% of the app's CRUD features were developed, this tool was discontinued as the remaining tasks could more easily be listed and tracked within the coding files. 

The development was started with the setup of a local repo, a GitHub repo and a Render host service, followed by the installation of the modules that would be required for use of the app. The main technologies used were Postgres and Express. For a list of the modules used, please refer to the package.json file.


# Unsolved problems
Currently the styling of the home page does is not able to display more catches than 12, which is what the number of cells that the existing grid has been setup to handle.

Additionally, the responsiveness of the website is not great. Some of the pages' elements will begin clashing with each other if the page is being viewed on a small screen or a mobile device. Being an app intended for ease of use and quick submissions in the moment, this is a priority and will be addressed in the near future.

# Future additions
Due to resource constraints, not all the intended features could be implemented as of now. 
These include:
- Features to allow users to interact with each other and each others' posts/catches (eg. Catch likes and comment).
- A search function allowing users to view catches based on select keywords
- A sort function on the home-page catches 


