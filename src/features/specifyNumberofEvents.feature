Feature: Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given the user opens the application;
        When they navigate to the events section without specifying the number of events;
        Then they should observe that 32 events are displayed by default.

    Scenario: User can change the number of events displayed.
        Given the user is viewing the events section;
        When they choose to specify a different number of events to be displayed;
        Then they should be able to observe the updated number of events according to their selection.