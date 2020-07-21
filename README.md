# Omega Notes

> - Maintained by: `Heegu Park`


## Functionality Overview
1. A client receive the data from a server and dynamically display the data in HTML format
    - to view the notes
    - to view the image of a note
    - to add a note
    - to search notes
    - to attach an image to a note
    - to update a note(signed-in users)
    - to delete a note(signed-in users)
    - sign up/sign in/sign out
2. A server can process the data 
    - to view all notes
    - to view images attached to the notes
    - to add a note
    - to update a note(signed-in users)
    - to delete a note(signed-in users)
    - to handle sign up/sign in/sign out
3. Heavily used React to create all HTML elements(virtual DOM) to dynamically display all data using DOM upon the data from MongoDB database via API server created by using Node.js
4. Used Express to run the API server
5. Used mongo and mongoose module to connect MongoDB database
6. Used AWS EC2 for web and API server and MongoDB cloud for MongoDB database
7. Used multer to update an image
8. Support most of mobile devices(iPad - Landsacpe/Portrait, iPhone X - Landsacpe/Portrait, iPhone 6s/7s/8s - Landsacpe/Portrait, iPhone 6/7/8 - Landsacpe/Portrait, and so on)

## Planned Features
1. User can view notes.
2. User can view the detail of a note.
3. User can add a note with an image.
4. User can sign up/sign in/sign out.
5. User can update a note after signing in.
6. User can delete a note after signing in.
7. User can search notes.

## Lessons Learned
1. Various ways of dynamically displaying data using React virtual DOM functions
2. Experienced to deal with various functions of React virtual DOM
3. Experienced to effectively use React and Bootstrap for displaying data
4. React and JavaScript Object Oriented Programming for better functionalities and to increase the re-usage of codes
5. Experienced to create API server using node.js to process the data with communicating with database and pass the data to client
6. Experienced to create MongoDB database to store and retrieve data upon the request of a client via API server
7. Experienced to upload a file using multer node module
8. Experienced to deploy the web and API server into AWS EC2 and create MongoDB database instance into MongoDB cloud

## Live Site
* You can see and test the live version here: <a href="https://notes.heegu.net" target="blank">notes.heegu.net</a>

## Screen shot
[Desktop - Chrome browser]

![Omega Notes](https://github.com/heegupark/omega-notes/blob/master/omega-notes-001.gif)

[iPhone 6/7/8 - Portrait]

![Omega Notes](https://github.com/heegupark/omega-notes/blob/master/omega-notes-002.gif)

[iPhone 6/7/8 - Landscape]

![Omega Notes](https://github.com/heegupark/omega-notes/blob/master/omega-notes-003.gif)
