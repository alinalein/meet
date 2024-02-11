Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default
        Given the user opens the application;
        When they navigate to the events section;
        Then they should observe that event elements are collapsed by default.

    Scenario: User can expand an event to see details
        Given the user is viewing the events section;
        When they choose to expand a specific event;
        Then they should be able to see the details of the selected event.

    Scenario: User can collapse an event to hide details
        Given the user has expanded an event to view details;
        When they decide to hide the event;
        Then they should observe that the event details are collapsed again.