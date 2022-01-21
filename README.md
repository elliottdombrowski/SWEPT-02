# SWEPT!!!

By: Elliott Dombrowski, Justin Kemp, & Sadie Sial

---

![mit](https://img.shields.io/badge/license-MIT-lightblue)

## Description

```md
AS A resident or visitor of Chicago, IL I would like to know where I should avoid parking in the 3rd largest metropolitan US City.
I WANT to be able to enter my location (via zip code or ward) to find seasonal parking restrictions throughout the year. If I am unsure of my ward number, I want to enter a local zip code to find my ward.
SO THAT I CAN park my car somewhere else and avoid being towed or fined by the city for not following such restrictions.
```

The City of Chicago is an amazing place but it is not without its shortcomings. While visiting popular attractions, venues, or even friends and colleagues, if you are driving you have a whole set of rules that simply do not exist outside of metropolitan areas. Your mileage may vary, pun fully intended, but utilizing an application like SWEPT 2.0 is able to help.

SWEPT 2.0 is a mobile-first, web application that informs users of where summer street sweeping and winter snow restrictive parking. In the summer, vehicles must abide by a sweeping schedule in order to prevent fines and/or being toward the city street cleaning. In the winter, vehicles must not park in designated snow clearing areas for over 107 miles worth of all main streets throughout the city to also prevent such fines and towing. SWEPT can help users be aware of such restrictions and rules by conveniently placing all of these schedules and mandates conveniently in one spot. Users will be able to search while logged in or out, but only logged-in users will be able to save their searches for future references.

# Getting Started

## Technology Stack

The application was built using the MERN stack using MongoDB, Express.js, React, Node.js.

|           Client          |            Server              |
| ------------------------- | ------------------------------ |
| apollo/client: ^3.5.6     | apollo-server-express: ^2.12.0 |
| chakra-ui/react: ^1.7.4   | axios: ^0.24.0                 |
| axios: ^0.24.0            | bcrypt: ^5.0.1                 |
| graphql: ^16.2.0          | cors: ^2.8.5                   |
| jquery: ^3.6.0            | dotenv: ^10.0.0                |
| jwt-decode: ^3.1.2        | express: ^4.17.2               |
| luxon: ^UPDATE            | graphql: ^15.8.0               |
| react: ^17.0.2            | jquery: ^3.6.0                 |
| react-dom: ^17.0.2        | jsonwebtoken: ^8.5.1           |
| react-router-dom: ^5.2.0  | mongoose: ^5.9.7               |
| react-scripts: 5.0.0      | stripe: ^8.197.0               |
| web-vitals: ^2.1.3        |                                |
| mapbox-gl: ^2.6.1         |                                |   
   
## Installing

1. Copy the link above and clone the repository to your local machine   
    - Run `git clone https://github.com/elliottdombrowski/SWEPT-02`

2. Install package dependencies   
    - Run `npm install` in the root directory

3. Start development server   
    - To start the app, run `npm run develop` in the root directory


## Links

- Heroku deployed site: [SWEPT](http://swept.herokuapp.com/)
- GitHub repository: [GitHub - SWEPT](https://github.com/elliottdombrowski/SWEPT-02) 
- Presentation link: [Presentation](https://docs.google.com/presentation/d/12hg9P6nvWxK_n2TzjzKU79cAG8nRA2_XzrPrARD9HhI/edit?usp=sharing)

## Version History

[SWEPT - v 1.0 Deployed App](https://elliottdombrowski.github.io/NU-Project-1/)

```
v 1.0 Mobile Display
```

|               Initial Display               |                Results Display                |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-mobile-1](client/src/assets/swept1-0_mobile_screenshot1.png) | ![Screenshot-mobile-2](client/src/assets/swept1-0_mobile_screenshot2.png) |

```
v 1.0 Desktop Display
```

| Initial Display |
| :------: |
| ![Screenshot-desktop-1](client/src/assets/swept1-0_full_screenshot1.png) |   

| Results Display |
| :------: |
| ![Screenshot-desktop-2](client/src/assets/swept1-0_full_screenshot2.png) |   
    


[SWEPT - v 2.0 Deployed App](http://swept.herokuapp.com/)   


```
v 2.0 Mobile Display
```

|               Homepage             |                Homepage               |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-mobile-1](client/src/assets/swept_home_mobile.png) | ![Screenshot-mobile-2](client/src/assets/swept_home2_mobile.png) |   

|               Mobile Menu             |                Sweeper Search               |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-mobile-1](client/src/assets/swept_menu_mobile.png) | ![Screenshot-mobile-2](client/src/assets/swept_sweeper_mobile.png) |

|               Snow Search             |                Profile                |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-mobile-1](client/src/assets/swept_snow_mobile.png) | ![Screenshot-mobile-2](client/src/assets/swept_profile_mobile.png) |

|               Login             |                Sign Up               |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-mobile-1](client/src/assets/swept_login_mobile.png) | ![Screenshot-mobile-2](client/src/assets/swept_signup_mobile.png) |

   
   
```
v 2.0 Desktop Display
```

|               Homepage             |                Sweeper Search                |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-homepage](client/src/assets/swept_home_desktop.png) | ![Screenshot-sweeper](client/src/assets/swept_sweeper_desktop.png) |       


|               Snow Search             |                Profile                |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-mobile-1](client/src/assets/swept_snow_desktop.png) | ![Screenshot-mobile-2](client/src/assets/swept_profile_desktop.png) |

|               Login             |                Sign Up               |
| :-----------------------------------------: | :-------------------------------------------: |
| ![Screenshot-mobile-1](client/src/assets/swept_login_desktop.png) | ![Screenshot-mobile-2](client/src/assets/swept_signup_desktop.png) |


<br>

## Authors

- [Sadie Sial](https://github.com/sadielinks)
- [Elliott Dombrowski](https://github.com/elliottdombrowski)
- [Justin Kemp](https://github.com/justinkemp10)

## License
