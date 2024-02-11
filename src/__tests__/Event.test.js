import { render } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import { formatDateTime } from '../utils/helpers';

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;

    beforeAll(async () => {
        allEvents = await getEvents();
    })

    beforeEach(() => {
        EventComponent = render(<Event event={allEvents[0]} />);
    });

    test('renders event summary', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('renders event location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });
    test('renders event created', () => {
        const formattedCreatedDate = formatDateTime(allEvents[0].created);
        expect(EventComponent.queryByText(formattedCreatedDate)).toBeInTheDocument();
    });
    test('checks for "Open Details" button', () => {
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument()
    })
    test('details about an event are hidden by default', async () => {
        const eventDetails = EventComponent.container.querySelector('.details')
        expect(eventDetails).not.toBeInTheDocument()
    })
    test('show details of an event when user clicks on button "show details"', async () => {
        const user = userEvent.setup();
        const clickOpen = EventComponent.queryByText('Show Details')
        await user.click(clickOpen);
        const eventDetails = EventComponent.container.querySelector('.details')
        expect(eventDetails).toBeInTheDocument()
    })
    test('hide details of an event when user clicks on button "Hide Details"', async () => {
        const user = userEvent.setup();
        const clickOpen = EventComponent.queryByText('Hide Details')
        await user.click(clickOpen);
        const eventDetails = EventComponent.container.querySelector('.details')
        expect(eventDetails).not.toBeInTheDocument()
    })
});
