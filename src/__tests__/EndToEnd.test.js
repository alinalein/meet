import puppeteer from 'puppeteer';

describe('filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#city-search');
    });

    afterAll(() => {
        browser.close();
    });
    test('suggestions list is hidden by default', async () => {
        const eventDetails = await page.$('#city-search .suggestions');
        expect(eventDetails).toBeNull();
    });
    test('renders a list of suggestions when city textbox gains focus', async () => {
        await page.click('#city-search .city')
        const locations = await page.waitForSelector('#city-search .suggestions')
        expect(locations).toBeDefined();
    })
    test('updates list of suggestions correctly when user types in city textbox', async () => {
        await page.type('#city-search .city', 'Berlin');
        const berlinSuggestion = await page.$('#city-search .suggestions');
        //get the text of the suggestions
        const suggestionsText = await berlinSuggestion.evaluate(element => element.textContent);
        expect(suggestionsText).toContain('Berlin, Germany');
        expect(suggestionsText).toContain('See all cities');
    })
    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        await page.click('#city-search .suggestions li:first-child');
        // evaluate  the value of the input
        const cityTextBoxValue = await page.$eval('#city-search .city', input => input.value);
        expect(cityTextBoxValue).toBe('Berlin, Germany');
    })
    test('show "See all cities" if the search has no matches in the city list', async () => {
        await page.type('#city-search .city', 'XXXX');
        const suggestions = await page.$('#city-search .suggestions');
        //get the text of the suggestions
        const suggestionsText = await suggestions.evaluate(element => element.textContent);
        expect(suggestionsText).toContain('See all cities');
    })
})
describe('show/hide event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });
    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});

describe('Specify Number of Events', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#number-events');
    });

    afterAll(() => {
        browser.close();
    });
    test('render element with role textbox', async () => {
        const inputElement = await page.$('#number-events .input_events__number');
        expect(inputElement).toBeDefined();
    })
    test('default value of the input field is 32', async () => {
        const defaultValueInput = await page.$eval('#number-events .input_events__number', input => input.value);
        expect(defaultValueInput).toBe('32');
    })
    test('value of input changes as user types in the input field', async () => {
        const inputField = await page.$('#number-events .input_events__number');
        //user clicks 3 times inside input field to select all 
        await inputField.click({ clickCount: 3 });
        //user typed backspace, deleted the 32
        await page.keyboard.press('Backspace');
        //simulates user typed 4 
        await page.type('#number-events .input_events__number', '4');
        // gets the value in input field
        const changedValueInput = await page.$eval('#number-events .input_events__number', input => input.value);
        expect(changedValueInput).toBe('4');
    })
})