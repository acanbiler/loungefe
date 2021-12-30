import React from "react";
import {Button, Container, Header, Segment} from 'semantic-ui-react'

import history from "../utils/history";

class Lounge extends React.Component{
    state = {}

    HomepageHeading = () => (
        <Container text>
            <Header
                as='h1'
                content='Welcome to'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
            />
            <Header
                as='h2'
                content='OzU Lounge'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                }}
            />
            <Header
                as='h3'
                content='What would you like to do?'
                inverted
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                }}
            />
            <Button primary size='huge' onClick={() => history.push("/ticket")}>
                Upgrade Ticket
            </Button>
            <Button size='huge' color='orange' onClick={() => history.push("/shops")}>
                Visit Shops
            </Button>
        </Container>
    )

    render() {
        const { HomepageHeading } = this;

        return (
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 900, padding: '1em 0em' }}
                vertical
            >
                <HomepageHeading />
            </Segment>
        );
    }
}

export default Lounge;