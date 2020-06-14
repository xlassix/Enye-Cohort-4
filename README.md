# Enye-Cohort-4
In this COVID world that we live in, it is important that people can easily access medical assistance if need be. With that in mind, the goal of this challenge is to build an application that can locate all the hospitals within a given area.

Design Inspiration
[Web version of digital map](https://dribbble.com/shots/9146913-Web-version-of-digital-map) by Alex Arutuynov 

![Web version of digital map](https://cdn.dribbble.com/users/551602/screenshots/9146913/media/f2ee67967ffd61afa6c86a132dd55e16.png "Web version of digital map")
### Technologies

These following technologies must be used when building this application

- [ReactJS](https://reactjs.org/docs/getting-started.html) and [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Typescript](https://create-react-app.dev/docs/adding-typescript/)
- [Google Maps API](https://developers.google.com/maps/documentation) or [Google Places API](https://developers.google.com/places/web-service/intro) or Any Third Party Location API of Choice
- Choose one of the following Component Libraries
    - [AntD](https://ant.design/docs/react/introduce)
    - [Material Design](https://material-ui.com/)
- [FireStore](https://firebase.google.com/docs/firestore)

### Application Requirements

- Users should be able to type into a search bar
- Users should be able to pick a geo-fencing radius for the search results
    - (example - 5km, 10km, 20km etc...)
- Typing into the search bar generates search results
- User should be able to see the search results
    - Up to you to decide how to render the results
- The code must be completely written in **[Typescript](https://www.typescriptlang.org/)**
- The application must be **deployed**
    - (i.e - Firebase, Heroku, AWS, GCP, DigitalOcean, etc...)
- Users should be able to search for Hospitals, Pharmacies, Clinics and Medical Offices
- Users should be able to see past results
    - There should be a place that a user can click to see all the results that have been searched on the app
    - Clicking on a past search result should trigger a request and the results should be displayed for the user.
    - Hint - You need to save the past searches in a database

### Judgement Criteria

- The application must meet all criterias described in the above requirements and use the technologies specified
- We are looking for well-designed user interfaces meaning your application should be visually pleasing.
    - (Hint - Use the component libraries)
- The design and usability of the application
    - Leverage [dribble](https://dribbble.com/) for design inspiration
- The application should be **bug free**
