import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
const feature = loadFeature('./src/features/specifyNumberofEvents.feature')

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        let AppComponent
        given('the user opens the application;', () => {
            AppComponent = render(<App />)
        });
        let NumberOfEventsDOM
        when('they navigate to the events section without specifying the number of events;', () => {
            const AppDOM = AppComponent.container.firstChild;
            NumberOfEventsDOM = AppDOM.querySelector('#number-events');
        })

        then('they should observe that 32 events are displayed by default.', async () => {
            const inputElement = within(NumberOfEventsDOM).getByDisplayValue('32');
            expect(inputElement.value).toBe('32');
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let NumberOfEventsDOM
        given('the user is viewing the events section;', () => {
            const AppComponent = render(<App />)
            const AppDOM = AppComponent.container.firstChild;
            NumberOfEventsDOM = AppDOM.querySelector('#number-events');
        })
        let inputField
        when('they choose to specify a different number of events to be displayed;', async () => {
            const user = userEvent.setup();
            inputField = within(NumberOfEventsDOM).queryByRole('spinbutton')
            await user.type(inputField, '{backspace}{backspace}4');
        });

        then('they should be able to observe the updated number of events according to their selection.', () => {
            expect(inputField).toHaveValue(4);
        });
    });

})