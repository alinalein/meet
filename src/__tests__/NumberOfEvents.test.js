import NumberOfEvents from "../components/NumberOfEvents";
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<NumberOfEvents/> component', () => {

    let NumberOfEventsComponent;
    beforeEach(() =>
        NumberOfEventsComponent = render(<NumberOfEvents />)
    )

    test('renter elemet with role textbox', () => {
        expect(NumberOfEventsComponent.queryByRole('textbox')).toBeInTheDocument();
    })
    test('default value of the input field is 32', () => {
        const defaultValue = NumberOfEventsComponent.getByDisplayValue('32');
        expect(defaultValue).toBeInTheDocument();
    })
    test('value of input changes as user types in the input field', async () => {
        const user = userEvent.setup();
        NumberOfEventsComponent.rerender(<NumberOfEvents setCurrentNOE={() => { }} />);
        const inputField = NumberOfEventsComponent.queryByRole('textbox')
        await user.type(inputField, '{backspace}{backspace}4');
        expect(inputField).toHaveValue('4');
    })
})

describe('<NunberOfEvents /> integration', () => {
    test('changes amount of shown event depending on value in input field', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const NumberOfEventstDOM = AppDOM.querySelector('#number-events');

        const numberTextBox = within(NumberOfEventstDOM).queryByRole('textbox');
        await user.type(numberTextBox, "{backspace}{backspace}10");

        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(10);
        });
    })
})