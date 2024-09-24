# IT5007 Group Project: Food Ratings Application
(Demo video link is at the end of ReadMe file)
## Problem Statement
In the dynamic landscape of the culinary industry, diners are increasingly seeking personalized dining experiences that cater specifically to their tastes and dietary needs. Traditional platforms, however, typically employ a generic approach to restaurant ratings and recommendations, often failing to meet the diverse and evolving preferences of individual users. This gap highlights a significant problem in the current restaurant discovery process, which our Food Ratings Application aims to address. Our application introduces a novel approach by integrating sophisticated artificial intelligence (AI) with extensive user preference data to deliver highly personalized restaurant recommendations. Unlike conventional systems that offer broad, generalized suggestions, our solution adapts to each user’s unique taste profiles and dietary preferences, making it highly relevant not only today but also sustainable in its utility over the next decade.

## Solution Architecture
To craft our solution, we've architected an ecosystem that comprises a React front-end to deliver an interactive and seamless user experience. At the core of our service is the integration with Google Maps API, which facilitates location-based searches, and the OpenAI API, which drives the intelligent processing of user reviews fron Google reviews and user-personalized preferences. Our back-end, developed with Node.js, taps into the power of MongoDB for efficient data management. This symbiotic relationship between front-end interactivity, powerful AI analytics, and robust back-end processing forms the backbone of our application, ensuring its adaptability to both current and future demands.

## Legal/Other Aspects
Embracing the collaborative spirit of the tech community, our project not only uses open-source resources but is also geared toward contributing back to the ecosystem. We carefully select MIT-licensed libraries for their compatibility with open-source ethos and our intention to maintain transparency and openness in our development process. Simultaneously, we are vigilant about the intellectual property rights involved, ensuring our project stands on solid legal ground while fostering an environment of innovation and sharing.

## Competition Analysis
While established giants like Yelp and TripAdvisor dominate the market with their extensive databases of reviews and ratings, our Food Ratings Application carves out a niche by focusing on AI-enhanced personalization. Unlike our competitors who provide static ratings, we leverage machine learning to analyze and synthesize reviews in the context of individual user preferences. This not only differentiates us but also adds a layer of precision and personal touch to the discovery process, setting the stage for our application to become a frontrunner in the industry.

## Front-End Design and Implementation
Our front-end design philosophy is centered around creating an intuitive and responsive user interface, leveraging the comprehensive framework of Bootstrap combined with the power of React. Here are the key features we've implemented:

- **Dynamic Updates**: The user interface provides real-time updates reflecting user interactions without the need for page reloads, enhancing the interactive experience.
- **Seamless Navigation**: Utilizing React Router, we've enabled seamless navigation across different pages of our application, ensuring a smooth, single-page application feel.
- **Google Map Implemented HomePage**: The home page features a Google Maps component that enhances user interaction by allowing users to search for restaurants by name or proximity to specific MRT stations. This improvement not only boosts the usability of the home page but also introduces a new logic for interacting with the component.
- **Dynamic Tagging System**: Built with React's state management, our tagging system allows users to personalize their dining experience by selecting tags such as "Taste", "Cost", "Environment". This feature enhances user engagement by allowing more tailored experiences.
- **Add Page Functionality**: Our 'Add' page allows users to submit their reviews, which are collected in our backend. This approach helps us build our own database, reducing dependency on external APIs.
- **Responsive UI Elements**: We use Bootstrap to provide responsive UI elements and interaction patterns. This setup offers tangible feedback to users as they interact with various components of the application, enhancing the overall user experience.

### UI Implementation
- **Design Considerations**: The UI design is carefully crafted to prioritize key elements, ensuring they occupy more visual space. Our color scheme and contrasts are strategically chosen to highlight important features, making the interface intuitive and user-friendly. We maintain uniformity in UI elements like colors, fonts, buttons, and icons throughout the website using Bootstrap and custom CSS for a polished look and feel.
- **Novel Features**: Implementing an intelligent tag-based filtering system allows users to find restaurants that align precisely with their preferences. Users' preference are memorized. React routing is also involved to provide links in a single-page application.

### Enhanced UI Kit Application
- **CSS and Bootstrap Utilization**: Our UI kit is extensively elaborated, incorporating customized Bootstrap components tailored to meet the specific needs of our application. The style.css file is meticulously developed to enhance the visual appeal and usability of the UI, ensuring a consistent and engaging user experience across all pages.
- **Google map implementation**: We implemented a Google Maps component using the Google Maps API kit, which serves as a key feature on the front end for user interaction. This component allows users to directly select restaurants from the map to search for information or add comments, enhancing the overall user experience.

## Back-End Design and Implementation
Our backend is designed as a scalable, efficient processing hub that:
- Manages incoming requests, processes them with business logic, and communicates with external APIs such as Google Maps for geolocation services and OpenAI for data analysis.
- Is underpinned by Node.js, chosen for its event-driven, non-blocking I/O model, which is particularly well-suited for the data-intensive operations our application performs.

  
## Back-End Design and Implementation
Our backend is designed as a scalable, efficient processing hub that:
- Manages incoming requests, processes them with business logic, and communicates with external APIs such as Google Maps for geolocation services and OpenAI for data analysis.
- Is underpinned by Node.js, chosen for its event-driven, non-blocking I/O model, which is particularly well-suited for the data-intensive operations our application performs.

**Architecture && Implemenntation**
  - Choose to locate placeID using react component from @react-google-maps API, because this API provides the map UI. And the function to search placeID for selected place is provided.
  - Maintain both Google API and OpenAI API backend due to security concerns. This approach enhances safety of API keys.
  - Involve GraphQL server as middleware for database management. With help of schema and resolver, precise manipulation to the database is accomplished.
  - Use express router to organize.
    
    
  ```
     Search PlaceID  -----------------> @react-google-maps API                             
           FRONTEND save it in state<--                      
     __________________________________________________________________________________________________________________________________
  
     Search summary(PlaceID,tags)-----> SERVER ---fetch reviewData from googleAPI---->GOOGLE MAP API(placeID)
                                             <---responde with reviewData----------
                                             ---fetch summary from openAPI--------->OPENAI API(reviewData,tags)
                                             <-----responde with summary-----------
           FRONTEND show result <------ SERVER
     ___________________________________________________________________________________________________________________________________                                           
     Add review(PlaceID,rate,comment)--> SERVER ---handle by--> GRAPHQL SERVER ---resolve request and add to local db---> MONGODB CLIENT
           FRONTEND show success or fail feedback  <----------- GRAPHQL SERVER
   ```                                                                        

**Setting up Automation**       
The backend can be started just by running, 'systemctl start mongod' and 'npm start'. Database initialization and package dependency install are integrated to automation.

**Other novelties**   
Interation between different backend API is involved. The reviewData fetched from GoogleMap API is sent to OpenAI API after data processing. 



## Documentation
Documentation has been woven into our development process, with in-line comments and detailed descriptions accompanying every function, module, and API call to ensure maintainability and ease of onboarding for new developers.

## Usability
The application is designed with the user at the forefront. Usability testing has been conducted to ensure the interface is intuitive, accessible, and forgiving of common user errors, with robust form validation and clear navigation pathways.

## Code Modularization
We've crafted reusable components and services, which are utilized across the application to ensure consistency and reduce redundancy. Files in backend is grouped by API, while that in frontend is grouped by page. The modulization of frontend and backend provide convenience for programmers. Besides, frontend and backend are spilt for different scale.
## Code Originality
Our codebase reflects a blend of original development and open-source contributions. 
Open-source code includes the bootstrap stylesheet，react components from @react-google-maps API

## Instructions for Running the Application

### Front-End
```bash
cd UI
npm run compile
npm start
```

### Back-End
```bash
cd API
# Ensure MongoDB is running
systemctl start mongod

# In the project's backend directory
npm start
```

## Team Members and Contributions
- ZHANG YIMIAO - [A0274384W]
- LU HAOCHENG - [A0276434Y]
- CHENG LE - [A0286185R]

## Acknowledgements
We extend our gratitude to the open-source projects and APIs that have made this project possible. A detailed list of these resources and their licenses is available upon request.

## Demo Video Link
Here is the demo video link: [Project Demo Video](https://drive.google.com/file/d/1PjS4FmEwENEEk3BptRNXHDOMUFFg686h/view?usp=sharing)
