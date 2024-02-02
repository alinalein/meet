## Meet APP
The app is designed for event management, using React and a test-driven development approach. A serverless and progressive web app, it fetches upcoming events through the Google Calendar API. The user will be able to view the events by city and choose how many events they want to see at once, along with accessing event details.

## Gherkin and User Stories

### 1. Feature : Filter Events By City
As a __user__, __I should be able to__ filter events by city, __So that I can__ see a list of events taking place in that city.

- __Given__ user hasn’t searched for any city; 
__When__ the user opens the app; 
__Then__ the user should see a list of upcoming events.

- __Given__ the main page is open; 
__When__ user starts typing in the city textbox; 
__Then__ the user should receive a list of cities (suggestions) that match what they’ve typed.

- __Given__ user was typing “Berlin” in the city textbox AND the list of suggested cities is showing; 
__When__ the user selects a city (e.g., “Berlin, Germany”) from the list; 
__Then__ their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

### 2. Feature : Show/Hide Event Details

As a __user__, __I should be able to__ show/hide event details, __So that I can__ maintain a clean and focused view of events.

- __Given__ the user opens the application; 
__When__ they navigate to the events section; 
__Then__ they should observe that event elements are collapsed by default.

- __Given__ the user is viewing the events section; 
__When__ they choose to expand a specific event; 
__Then__ they should be able to see the details of the selected event.

- __Given__ the user has expanded an event to view details; 
__When__ they decide to hide the event; 
__Then__ they should observe that the event details are collapsed again.


### 3. Feature : Specify Number of Events

As a __user__, __I should be able to__ specify the number of events to be displayed, __So that I can__ adjust and manage the information on my screen. 

- __Given__ the user opens the application; 
__When__ they navigate to the events section without specifying the number of events; 
__Then__ they should observe that 32 events are displayed by default.

- __Given__ the user is viewing the events section; 
When they choose to specify a different number of events to be displayed; 
Then they should be able to observe the updated number of events according to their selection.

### 4. Feature : Use the App When Offline

As a mobile __user__, __I should be able to__ use the app when offline, __So that I can__ uninterrupted access and manage event information without an internet connection.

- __Given__ the user has previously accessed the application with an internet connection; 
__When__ the user loses internet connectivity; 
__Then__ they should observe that the application displays cached data instead of new data.

- __Given__ the user is interacting with the application; 
__When__ the user attempts to change search settings, such as city or the number of events; 
__Then__ they should be presented with an error message indicating that the changes cannot be applied at the moment.
  
### 5. Feature : Add an App Shortcut to the Home Screen

- __Given__ the user is accessing the meet app through a web browser on their device; 
__When__ they choose to install the app on their home screen; 
__Then__ they should be able to see a shortcut for the meet app on their device's home screen.
  
### 6. Feature : Display Charts Visualizing Event Details

As an insight-seeking __user__, __I should be able to__ view charts visualizing event details, __So that I can__ quickly grasp patterns, trends, and statistics of the events.

- __Given__ the user is viewing the events section in the app; 
__When__ they navigate to the chart section; 
__Then__ they should see a chart displaying the number of upcoming events categorized by each city.

## Use of serverless functions in this APP 

When user open the app, they will be redirected the enter their credentials via OAuth at Google, the event of the serverless function will be triggered, it then will fetch the token from the Authorization Server. 

This OAuth2 token will be presented by the serverless function to the Google Calendar API, granting the user access to the listed events.

In this case, the serverless function from AWS Lambda will be used. In general, a serverless function automatically scale based on the number of requests received, and charges are incurred only for the actual execution of each function, making it a cost-efficient option. The use of OAuth is a quite secure method for authenticating.
