import NumberOfEvents from "../components/NumberOfEvents";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
        const inputField = NumberOfEventsComponent.queryByRole('textbox')
        await user.type(inputField, '{backspace}{backspace}4');
        expect(inputField).toHaveValue('4');
    })
})