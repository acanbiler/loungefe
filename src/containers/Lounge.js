import React from "react";
import {Button, Container, Header, Segment} from 'semantic-ui-react'

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
            <Button.Group>
                <Button primary size='huge'>
                    Upgrade Ticket
                </Button>
                <Button.Or />
                <Button size='huge' color='orange'>
                    Visit Shops
                </Button>
            </Button.Group>
        </Container>
    )

    render() {
        const { HomepageHeading } = this;

        return (
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 700, padding: '1em 0em' }}
                vertical
            >
                <HomepageHeading />
            </Segment>
        );
    }
}

export default Lounge;