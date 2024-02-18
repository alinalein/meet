import mockData from './mock-data';
/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

// gets a token if code is present 
const getToken = async (code) => {
    try {
        //encodes the code received
        const encodeCode = encodeURIComponent(code);
        const response = await fetch(
            'https://pq0y2ngaq5.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        // get token as response from fetch if send the code 
        const { access_token } = await response.json();
        // save access_token in localStorage
        access_token && localStorage.setItem("access_token", access_token);

        return access_token;
    } catch (error) {
        error.json();
    }
};

// checks if token correct 
const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

// checks if user already has tocken, if not-> redirects to OAuth
export const getAccessToken = async () => {
    //check if token in local storage
    const accessToken = localStorage.getItem('access_token');
    // chech if accessTokn is not/null/undefined 
    //then pass the token we got from localstorage to function and the endpoind & await result-> is the token correct / valid?
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        //checks for authorization code
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        // no authorization code -> user redirected to Google Authorization screen
        if (!code) {
            const response = await fetch(
                "https://pq0y2ngaq5.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};

//remove query parameters from the current URL in a web browser without causing a full page reload
const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        // update the URL without query parameters
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

// fetchs the list of all events either from mockdata or API
export const getEvents = async () => {
    // only use mockDate when when the web page is being accessed from a local development server (localhost)
    if (window.location.href.startsWith('http://localhost')) {
        return mockData;
    }
    if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        return events ? JSON.parse(events) : [];
    }
    const token = await getAccessToken();
    if (token) {
        removeQuery();
        const url = "https://pq0y2ngaq5.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            localStorage.setItem("lastEvents", JSON.stringify(result.events));
            // returns the events property from results
            return result.events;
        } else return null;
    }
};