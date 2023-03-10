# Genshin Recipes Blog

![Mockup](src/docs/Mockup.png)



[Deployed Site](https://genshin-recipes-blog.herokuapp.com/)

Repository for [API](https://github.com/charlie-vf/genshin-recipes-blog-api)


# Table of Contents

- [Introduction](#introduction)
- [UX](#ux)
    - [Strategy](#strategy)
    - [Scope & Sprints](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Surface](#surface)
        - [Colours](#colours)
        - [Features](#features)
- [React](#react)
- [Future Features](#future-features)
- [Technologies](#technologies)
- [Testing](#testing)
- [Issues](#issues)
- [Deployment](#deployment)
- [Credits](#credits)


## **Introduction**

The Genshin Recipes Blog was created for my fifth project in Code Institute's Full Stack Software Development Course.

The objective of this site was to provide players of miHoYo's Genshin Impact with a place to share recipes inspired by those you can craft in-game within a community atmosphere where they can easily interact with content and personalise their experience. All users should be able to view the recipes posted to the site and other user profiles. Users should be able to create an account, whereby they can publish recipes; like, mark as made & comment on recipes, and edit their own profiles.

Although aimed at the game's player base, it is largely a Japanese/Chinese inspired recipes blog which is suitable for anybody who is looking for inspiration in these areas.

This project uses a combination of HTML, CSS, JavaScript, React.js, Bootstrap.js & Django REST framework.

## **UX**

## **Strategy**

I wanted to make this blog because recreating your favourite dishes from various media is fun, but often difficult, as recipe instructions in games are generally limited to one or two generic ingredients, for example, 'meat' and 'plant'. As such, I wanted a place which could compact recipes players have tried in real life in one place so others can enjoy the dishes they're familiar with in-game.

The site has full CRUD functionality to allow creation, reading, updating & deletion of recipes and interactions.

## **Scope**

## User Stories

The User Stories and website features are mapped out in GitHub Projects for this repository using the Kanban board format. with priority labels and mapping to milestones, which were then split into the sprints detailed below. Almost all were successfully implemented, with those unfinished noted within their respective sprints and documented at the start of the Future Features section of this ReadMe. 

The user stories were split into six sprints across three weeks, with the fourth week being tidy-up. The site objective is segmented into Project Goals which are detailed within each sprint, below:

## Sprint One - Main, Routing & Navigation - Week One
The first step was planning & getting the general setup of the site's navbar across pages, functioning links, display of the homepage and infinite scroll on the homepage up and running.

Project Goals:
- Users should be able to see all recipes in one place
- Users should be able to see how many likes, made marks and comments a recipe has without having to navigate to its individual page
- Users should be able to easily navigate the site with clear directions, no awkward refreshes, next/previous page navigation or empty/broken screens while data is being fetched.

User Stories:
- As a user, I can see the navbar on every page so that I can easily navigate the site
    - navbar displays seamlessly across all pages
- As a user I can seamlessly navigate between pages so that I can fully enjoy all the content of the site
    - there are no broken links in the site
- As a logged-out user, I can view sign-up/login options so that I can perform those actions and view more of the site's content
    - navbar conditional rendering displays these options when logged-out
- As a user, I can view all recipes with the newest first so that I can stay up to date with new content as it is added
    - content displays in descending order of most recent first
- As a user, I can see how many times a recipe has been made, and how many likes & comments it has, to see how popular it is with the community
    - the counts for these all display below the recipe
- As a user, I can endlessly scroll through content so that I can keep viewing without having to page refresh by navigating pages
    - infinite scroll implemented

## Sprint Two - Authentication - Week Two - One Day
Second, I focussed on user authentication regarding account creation and access tokens, with content restrictions based on whether a user is logged in.

Project Goals:
- Users should be able to create accounts and remain logged in once they have done so for a reasonable period so they are not continuously forced to log back in while they are still browsing the site.
- Users should be able to easily know if they are logged-in or not

User Stories:
- As a new user, I can create an account so I can access the features restricted to signed-in users
    - sign-up functionality allows users to create an account
- As a user, I can log in so that I can view/use the features restricted to signed-in users
    - sign-in functionality allows users to log-in to their account
- As a user, I can see if I am logged in or not so that I can log in if required
    - if logged-in, the navbar displays the user's profile and the 'sign out' option
    - if logged-out, the navbar displays 'sign in' and 'sign up'
- As a user, I can remain logged in so that my experience is not interrupted
    - JWT access tokens allow the user to remain logged in

## Sprint Three - Creating & Liking/Making recipes - Week Two - Three Days
With user authentication working, I moved to recipe creation and liking, as these are both available from the homepage.

An essential experience for users of any blog site is interaction with the recipes, so the ability to like them provides both a positive feedback interaction and a way to revisit their favourite recipes.

Project Goals:
- Users should be able to create content to share with the community
- Users should be able to interact with others' content

User Stories:
- As a logged-in user I can create new recipe posts so that I can share them with other users
    - create recipe page allows users to create recipes and immediately publish them
- As a logged-in user, I can like recipes/mark them as made so that I can give positive feedback and view them easily again later
    - like/made functionality below each recipe allows users to like them from the main pages, and the individual recipe pages
    - the viewing function of this story was finalised in Sprint Five with the creation of the relevant pages

## Sprint Four - Individual Recipe pages - Week Two - Three Days
This sprint focussed on leaving and displaying comments and providing functionality to edit/delete comments and edit/delete recipes if the user is the recipe's owner.

This allows users to further interact with creators and see how others have enjoyed (or not) their recipes.

Project Goals:
- Users should be able to view individual recipes away from the full list
- Users should be able to comment on recipes, if logged-in, and view others' comments
- Users should be able to edit/delete their own recipes and comments

User Stories:
- As a user, I can navigate to individual recipes so that I can see details such as ingredients, method and comments left by other users
    - users can click the username, recipe image or comments icon to navigate to the recipe's individual page
- As a logged-in user, I can leave comments on recipes so that I can interact with the recipe's owner and leave feedback.
- As a user, I can see when a comment was left so that I can see how popular the recipe currently is
    - comment date is displayed next to the username for a comment
- As a logged-in user, I can edit/delete my comments so that I can control my interaction with the recipe
    - burger icon allows users to edit/delete
- As a logged-in user, I can edit/delete my recipes from their individual pages so that I can control my post after creation
    - burger icon allows users to edit/delete

## Sprint Five - Favourites, Following & Made pages, Search & Popular Component - Week Three - Three Days
This sprint was split in two:

- First, displaying favourited and made recipes on their respective pages and creating the popular recipes component

- Second, adding a search bar to the pages to allow users to search by creator or recipe name

Project Goals:
- Users should be able to see a list of recipes they have interacted with (liked/marked as made)
- Users should be able to see a list of recipes by users they follow
- Users should be able to search for content using keywords
- Users should be able to see the most popular content on the site

User Stories:
- As a logged-in user, I can view recipes I have liked so that I can easily come back to them
    - favourites page filters the site's recipes by those the user has liked
- As a logged-in user, I can view recipes I have made so that I can easily come back to them
    - made page filters the site's recipes by those the user has marked as made
- As a logged-in user, I can filter recipes by users I follow so I can see content from my favourite creators
    - following page filters the site's recipes by those from users the user follows

- As a user, I can search recipes by specific keywords/users so that I can easily find what I am looking for
    - searchbar implemented with a timer to prevent requests being sent after each keystroke
    - the searchbar allows users to search by username and content keywords

- As a user, I can view the most followed users so I can easily navigate to their profile -- this was changed to be the most liked recipes as it felt more relevant to the content of the website as liking recipes would likely be more frequent than following users
    - Updated User Story: As a user, I can view the most popular recipes so I can easily navigate to the community's favourite recipes
        - popular recipes component provides access to the community's favourite recipes & displays the number of likes

## Sprint Six - Profiles - Week Three - Three Days
The final main sprint was user profiles, including editing functionality for the user's profile and ensuring relevant information displays when viewing others' profiles.

Project Goals:
- Users should be able to view others' profiles, stats and follow/unfollow them
- Users should be able to view their own profile and edit it

User Stories:
- As a user, I can view others' profiles so that I can see their posts and more
    - a user can navigate to other users' profiles and see recipes
- As a user, I can view a user's  likes & following/followed counts on their profiles so that I can easily browse their content and see how active they are in the community
    - users can view another user's following & followed counts
    - some functionality not fully implemented - see Future Features
- As a user, I can follow/unfollow other users so that I can easily find my favourite creators and narrow results by them
    - follow/unfollow button available on user profiles
    - auto-updates user stats
    - users can navigate to the Following page to narrow results by creators they are following
- As a logged-in user, I can edit my profile so that I can update my public details
    - burger icon on user's profile allows editing of bio
- As a logged-in user, I can edit my username & password so that I can keep them relevant and secure
    - burger icon on user's profile allows editing of username & password

Following the main sprints, Week Four focused on tidying up, final testing and removing unnecessary/unused code.

## **Structure**

The website's structure allows almost everything to be accessible from everywhere.
From each page, logged-in users can navigate to Create a Recipe and their Following, Favourites, Made & Profile pages. Logged-in users can sign out from anywhere.

Users can navigate to other users' profiles by clicking their names above their recipe posts. 

For logged-out users, they can navigate to the Sign Up/Sign In pages, user recipes and profiles.

The following diagram details how the site's main pages all link together for logged-in users, bar the Sign Out button, which remains in the NavBar throughout, as this is not a page.

![Structure](src/docs/Structure.png)

## **Skeleton**

All main pages follow the same general layout. The layout is simple so all content is easily viewable for all users.

Home, Following, Favourites, Made & Profile (for profile, recipes display is changed to profile content)

![Wireframe](src/docs/Wireframe.png)

Create Recipe

![Wireframe2](src/docs/Wireframe2.png)

## **Surface**

### **Font Family**

The font used throughout this site is Montserrat from Google Fonts. I chose this because it is a clear, softer font which fits with the overall gentle theme of the site.
The backup font is sans-serif.

### **Colours**

Moving away from my previous themes of purples and blacks, I decided the brightness of Genshin Impact deserved a more light-themed site this time. Therefore, the colour scheme revolves around blues and white-blues.
<p>
The background for all pages is aliceblue, a white tinted with blue which provides a slight contrast to generic white. Text, links and component backgrounds rotate between the following shades:

- #f0f8ff
- #9fcdf5
- #5091ca
- #0d4e87

![Colour Palette](src/docs/ColourPalette.png)

### **Features**

*Navbar*

User Story: As a user, I can see the navbar on every page so that I can easily navigate the site

User Story: As a user, I can see if I am logged in or not so that I can log-in/sign-up if required

The NavBar features on every page of the site and provides the user with easy navigation to:

- The Home Page via the Site Logo

If the user is logged-in:

![Nav Bar Logged In](src/docs/NavBarIn.png)

- The Create Recipe page
- The Following page
- The Favourites page
- The Made page
- Sign Out button
- The Profile page

If the user is logged out:

User Story: As a logged-out user, I can view sign-up/login options so that I can perform those actions and view more of the site's content

![Nav Bar Logged Out](src/docs/NavBarOut.png)

- Sign In button
- Sign Up button

*SearchBar*

Allows users to search for recipes by keyword

User Story: As a user, I can search recipes by specific keywords/users so that I can easily find what I am looking for

![Searchbar](src/docs/Searchbar.png)

*Home Page*

User Story: As a user, I can view all recipes with the newest first so that I can stay up to date with new content as it is added

User Story: As a user, I can view the most popular recipes so I can easily navigate to the community's favourite recipes

Displays all recipes posted to the site in order of most recently created, with a reusable component displaying the most liked recipes, which features on all pages except the Create Recipe page and Sign In/Up.

![Home Page](src/docs/HomePage.png)

*Following, Favourites & Made Pages*

User Story: As a logged-in user, I can view recipes I have liked so that I can easily come back to them

User Story: As a logged-in user, I can view recipes I have made so that I can easily come back to them

User Story: As a logged-in user, I can filter recipes by users I follow so I can see content from my favourite creators

Same layout as home page, filtered to display relevant content.

In order:

- Recipes by users the logged-in user follows
- Recipes the logged-in user has liked
- Recipes the logged-in user has marked as made

*Create Recipe Page*

User Story: As a logged-in user I can create new recipe posts so that I can share them with other users

Contains fields to add an image, recipe title, ingredients & method.

![Create Recipe Page](src/docs/CreateRecipe.png)

*Edit Recipe Page*

User Story: As a logged-in user, I can edit/delete my recipes from their individual pages so that I can control my post after creation

Available on recipes the logged-in user owns via a burger icon in the top right which presents options to edit & delete.

![Recipe Burger](src/docs/RecipeBurger.png)

Edit page is prefilled with the recipe's current contents to make editing easier.

![Edit Recipe Page](src/docs/EditRecipe.png)

*Profile Page*

Displays the popular recipes component, with the main component changing to display user avatar, stats & their own recipes.

Own Profile Page:

![Profile Page](src/docs/ProfilePage.png)

Other User's Profile Page:

User Story: As a user, I can view others' profiles so that I can see their posts and more

![Other's Profile Pages](src/docs/ProfileOthers.png)

*Sign In Page*

User Story: As a user, I can log in so that I can view/use the features restricted to signed-in users

With a link to the sign-up page if the user does not already have an account.

![Sign In Page](src/docs/SignIn.png)

Error message displayed if incorrect credentials entered.

![Incorrect Credentials](src/docs/IncorrectCredentials.png)

*Sign Up Page*

User Story: As a new user, I can create an account so I can access the features restricted to signed-in users

With a link to the sign-in page if the user already has an account.

![Sign Up Page](src/docs/SignUp.png)

Error messages

Error messages are displayed if user input is invalid, for example:

Attempting to submit with empty fields:

![Sign Up Blank Fields](src/docs/SignUpBlank.png)

Attempting to submit with insufficient password length:

![Sign Up Password Short](src/docs/SignUpShort.png)

*Edit Profile Options*

Available on the user's profile when logged-in via a burger icon. Users can edit their profile image and bio, change their username and update their password.

![Edit Profile Burger](src/docs/ProfileBurger.png)

Edit Profile Page - prefilled with current bio (if applicable) and profile image (default of Blog's logo image if not previously changed)

User Story: As a logged-in user, I can edit my profile so that I can update my public details

![Edit Profile Page](src/docs/EditProfile.png)

Change Username Page - prefilled with current username

User Story: As a logged-in user, I can edit my username & password so that I can keep them relevant and secure

![Change Username Page](src/docs/ChangeUsername.png)

Change Password Page

User Story: As a logged-in user, I can edit my username & password so that I can keep them relevant and secure

![Change Password Page](src/docs/ChangePassword.png)

*Liking, Marking as Made & Commenting*

User Story: As a logged-in user, I can like recipes/mark them as made so that I can give positive feedback and view them easily again later

User Story: As a logged-in user, I can leave comments on recipes so that I can interact with the recipe's owner and leave feedback.

Recipes can be liked and marked as made (& reverse) from both the main pages and the individual recipe pages. Comments can be posted within the individual recipe pages. The counts for all three display next to their respective icons.

The comments list also features the infinite scroll functionality so users do not have to navigate to a new page to view more comments.

The 'no comments' text displays differently based on whether the user is logged in or not.

![Recipe Interactions](src/docs/RecipeInteractions.png)

*Editing Comments*

User Story: As a logged-in user, I can edit/delete my comments so that I can control my interaction with the recipe

Logged-in users can edit & delete their comments via a burger icon next to their comment

![Edit Comments Burger](src/docs/CommentsBurger.png)

Edit option will prefill with the current comment content.

![Edit Comments](src/docs/EditComment.png)

*No Results*

Displays if there are no results, e.g., if a user navigates to 'Following' but is yet to follow a user, or types an invalid keyword into the searchbar.

React routing messages allows the text under the image to be relevant to the page the user is viewing.

![No Results Page](src/docs/NoResultsPage.png)


## **React**

React is an optimal library for improving user experience as it allows for fast, real-time updating of website content through user interactions across a range of components, without the need for page refresh or experiencing unfavourable update times.

In the case of this website:

- When a user creates a profile, they are immediately able to sign-in via redirection to the sign-in page and thus gain access to the site's full functionality
- When a user follows a profile, this is immediately apparent in their user stats and the follow/unfollow button changes accordingly
- When a user likes or marks a recipe as made, the relevant icon immediately changes and the count increases to reflect the user's actions
    - The same is true for unliking/unmarking as made
- When a user comments on a recipe, the comment appears instantly below the recipe and the count increases
    - When a user edits/deletes a comment, this is immediately reflected under the recipe
- When a user creates a new recipe, they will automatically be redirected to the homepage with their new recipe displaying
- When a user edits their bio, this change is automatic
- All creation and update times display real-time data in a readable format

While data is loading, the user will see a spinner (displayed using an Asset) to notify them that content is on its way to their screen.


## *Components*

To minimise unnecessary repetition in this application and overly large/complicated JavaScript files, small-function and/or multi-use components were created in separate files to allow them to be easily implemented and customised throughout the site. This also aided in troubleshooting as smaller aspects of each of the site's functions could be worked on without affecting the site as a whole.

Examples: 

The most obvious of these is the NavBar, which also uses the reusable CurrentUser context to display appropriate links & content based on whether the user is logged in.

As there are three areas which utilise edit and/or delete functionality (user's profile, user's recipes & user's comments), I created the EditDeleteDropdown component to hold the main code for these alterations, and imported it into the relevant files with further work, such as handle functions, being present in those individual files. This prevented having to rewrite the parts of the dropdown menu which would be the same throughout every component I wanted this feature to be.

The Avatar component is used both for displaying the User's profile photo on various components (i.e., recipes, comments, profile page) and for the icon in the Popular Recipes component. As such, I created a generic component for the Avatar which could be customised to display the relevant image.

The Popular Recipes component is used both on the AllRecipes.js page and the pages which filter from it, as well as the profile page, and was thus created in its own files to allow it to be imported where necessary.


## **Future Features**

These three were not implemented in this release due to time constraints created by my laptop breaking, and thus losing multiple days sourcing a new one to continue work.

- Ability to leave a rating and review on recipes after marking them as made. This will be viewable on the recipe's page as an additional component.
- Filter favourites page by recipes the user has tried, instead of those being displayed as a separate page.
- User stats (followers & following) when clicked navigate to the relevant content

I believe these features would improve the user experience of this site for the following reasons:

- the first for viewers of others' recipes and the owners of the recipes themselves as it would provide invaluable feedback on the reception of content amongst site users
- the second as it would be less clunky than having two different pages for the content
- the third as it would allow greater reach for users and their recipes

Further Features:

- Messaging functionality to allow users to message others
    - message recipe creators to ask questions or suggest recipes they should attempt to recreate
    - message other users so as to create a more personal feel to the site over just what commenting under recipes can provide

- Install a Text Editor to improve the ingredients and methods content displays. As with the first three future features, this had to be benched due to sudden technical constraints.

- Way to view who has liked a recipe/marked it as made, potentially as a pop-up/overlay.

- Delete confirmation modal to prevent accidental deletion of recipes/comments

- Option to delete profile

- Categorisation of recipes with an option to filter recipes by category - this would become increasingly useful as the content volume of the site increases, although the current searchbar functionality does help

## **Technologies**

Languages:

- HTML5
- CSS
- JavaScript

Frameworks etc.:

Front-End:

- react-bootstrap - allows use of Bootstrap CSS package as this works optimally with React & JSX
- React.js - user interactivity
- GitHub - website hosting
- Git - version control
- GitPod - development platform
- Heroku - deployed website host

Back-End:
- Django REST framework/allauth
- Cloudinary - image hosting as Django does not store images long-term by default
- ElephantSQL - database hosting
- Python - efficient abstraction
- Pillow - imageField
- Gunicorn - corsheaders
- SimpleJWT - access tokens to maintain login state

## **Testing**

### **Validation**

CSS Validator: all CSS passed through W3C CSS validator with no issues

![CSS Validator](src/docs/CSSValidator.png)

HTML Validator: flagged trailing slashes and, once removed, passed through W3C NU validator with no issues.

![HTML Validator](src/docs/HTMLValidator.png)

JavaScript Validator: after fixing missing semicolons and misleading line breaks in conditionals, all JavaScript files passed through JSHint with no warnings.

Lighthouse Report: 

- Performance: how fast the page loads
    - Needs work
    - Mostly raised issues with image load times & JavaScript in default files

- Accessibility: how easily users can read the screen - colour contrast
    - Good
    - Improved by darkening the font colour of button elements & adding an alt tag to the profile image

- Best Practices: secure connections & JavaScript vulnerabilities
    - Good

- SEO: searchability
    - Good

![Lighthouse Report](src/docs/LighthouseReport.png)

### **Browser & Mobile Compatability**

The site was tested on Google Chrome, Microsoft Edge & Safari and functioned normally.

The site was tested on iPhone and other devices using DevTools and functioned normally.

### **Manual**

All site functionality was repeatedly and rigorously tested throughout production to spot any issues as they arose.

1. NavBar/Main Pages

- All NavBar links tested to ensure they navigated to the correct pages, which initially displayed placeholder text
- If pages exist but have no associated content, they display the noresults asset
- If a page does not exist, it displays the text 'Page Not Found!'

2. Authentication restrictions

- Attempted to force-perform actions the user was not in the correct state to perform
    - navigating to /recipes/create while logged out successfully redirected the user back to the previous page
    - navigating to the edit page, e.g., /recipes/edit/19 while not logged into Felix's account (that recipe id's owner) successfully redirected the user back to the previous page

3. Profiles

- Initially tested by following the Sign Up link to create an account, then creating a recipe via the Create Recipe link.
- After implementation of the Profile and ProfilePage components, further testing as development progressed included:

    - navigating to the profile manually through the URL (e.g., /profiles/1)
    - navigating to the profile via the 'Profile' link
    - navigating to the profile via the user's posted recipes
    - creating further users to test following/unfollowing functionality
    - ensuring user's recipes displayed when viewing their profile
    - ensuring user's stats displayed and updated immediately when viewing their profile
    - following the links available in the profile dropdown (edit username, edit profile (image & bio), change password) and performing those actions

4. Recipes

- Initially tested while testing Profiles by creating a recipe and ensuring it displayed on the Home page (AllRecipes)
- Editing a recipe was tested by editing the image, title, ingredients & method individually and all at once and was successful
    - and redirects to the previous page once complete
- Deleting a recipe via the delete option was successful
    - and redirects to the previous page once complete
- Like/Made/Commenting functionality tested upon completion on multiple recipes
    - On a recipe the user created, I attempted to like and was presented with the appropriate error message
    - On a recipe the user did not create, I attempted to like and was successful in changing the icon and increasing the like display count by 1
    - Clicking the 'Made' foodbowl icon changed the icon and increased the count by 1
    - Secondary clicks of like and made once the count has increased successfully changed the icon and decreased the count by 1
    - Commenting successfully displayed the comment immediately without page refresh
    - On the user's own comments, navigating to edit and delete via the burger icon successfully completed those actions without page refresh

5. Mobile View

- Tested on laptop by shrinking screen to see how the pages changed and using DevTools to view on various screen sizes, as well as on my mobile device.
    - Helped flag issues whereby certain components failed to display on mobile view. These were all fixed.

## **Issues**

### Resolved

- Issue whereby a logged-in user could not log out and had to wait for the access token to expire
    - This was due to missing 'response' in logout_view return in the back-end
- Issue whereby anybody could access the Create Recipes page, regardless of authentication state
    - This was due to a permissions issue in the back-end and was found & fixed through manual testing
- Access to the site being blocked by CORS
    - This was due to using the incorrect BaseURL in axiosDefaults

### Unresolved

- Uncertain how to resolve: occasionally, access is blocked to 'dj-rest-auth/user/' with a 401 error
    - This error can be cleared by refreshing the page


## **Deployment**

This project was created using a GitPod workspace, committed to Git, pushed to GitHub and deployed on Heroku.

To clone this repo:

- Beneath the repository name, click 'Code' and copy the clone HTTPS
- Open your preferred IDE & navigate into the working directory you wish to clone into
- Type 'git clone', paste the copied HTTPS & press enter

To deploy the workspace:

- git add .
- git commit -m 'Your initial commit message'
- git push

    These steps must be completed frequently with relevant commit messages to ensure GitHub has the most recent version of your workspace

Heroku Deployment Steps:

- Select New App & choose a name and location
- Select Deploy and link to GitHub repository
- Manually deploy site (choose automatic deployment if desired)

- Select Settings -> Reveal Config Vars
- Add CLIENT_ORIGIN: your deployed site URL

## **Credits**

- All images were taken from Google Images
- All recipes were taken from Google, YouTube, Reddit & HoyoLab (Genshin Impact's creator's official social media page)
- [Google Fonts](https://fonts.google.com/) for Montserrat font
- [FontAwesome](https://fontawesome.com/) for icons
- [LucidChart](https://lucid.app/) for Wireframes sketches

- Code Institute Walkthrough project for helping understand how everything works
- Slack for troubleshooting help
- Stack Overflow for further troubleshooting help