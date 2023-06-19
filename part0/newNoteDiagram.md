New Note Diagram
    Participant browser
    Participant server

    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    post note to server
    server->> browser: 