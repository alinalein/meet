import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import Event from '../components/Event';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api'

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature')

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user opens the application;', () => {
            AppComponent = render(<App />);
        });
        let EventListDOM
        when('they navigate to the events section;', async () => {
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        then('they should observe that event elements are collapsed by default.', () => {
            const eventDetails = EventListDOM.querySelector('.details')
            expect(eventDetails).not.toBeInTheDocument()
        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {
        let EventDOM
        given('the user is viewing the events section;', async () => {
            const event = await getEvents();
            EventDOM = render(<Event event={event[0]} />);
        });

        when('they choose to expand a specific event;', async () => {
            const user = userEvent.setup();
            await user.click(EventDOM.getByText('Show Details'));
        });

        then('they should be able to see the details of the selected event.', () => {
            const eventDetails = EventDOM.container.querySelector('.details')
            expect(eventDetails).toBeInTheDocument()
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        let EventComponent
        let allEvents
        given('the user has expanded an event to view details;', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />)
        });

        when('they decide to hide the event;', async () => {
            const user = userEvent.setup();
            const clickOpen = EventComponent.queryByText('Hide Details')
            await user.click(clickOpen);
        });

        then('they should observe that the event details are collapsed again.', () => {
            const eventDetails = EventComponent.container.querySelector('.event__details')
            expect(eventDetails).not.toBeInTheDocument()
        });
    });
});