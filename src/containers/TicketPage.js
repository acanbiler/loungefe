import React from "react";
import {Button, Divider, Dropdown, Grid, Header, Input, Segment} from 'semantic-ui-react';
import _ from 'lodash';
import { toast } from 'react-toastify'

import history from "../utils/history";
import { request } from "../utils/request";

const endpoints = {
    fetchTicket: () => request.get(`/lounge/ticket`, {withCredentials: true}),
    upgradeTicket: list => request.post(`/lounge/ticket/upgrade`, { list }, {withCredentials: true})
}

const upgradeOptions = [
    { key: 1, text: 'Emergency Exit', value : 1},
    { key: 2, text: 'Extra Leg Room', value : 2},
    { key: 3, text: 'Ozu Experience', value : 3},
    { key: 4, text: 'Unlimited Beverages', value : 4},
]


class TicketPage extends React.Component{
    state = {
        ticket: null,
        upgradeList: [],
    };

    componentDidMount() {
        this.fetchTicket();
    }

    fetchTicket = () => {
        endpoints.fetchTicket().then(res => {
                this.setState({ ticket: res.data });
            });
    };

    upgrade = () => {
        const { upgradeList } = this.state;

        endpoints.upgradeTicket(upgradeList.at(-1)).then(res => {
            toast.success(res.data === '' ? 'Upgrades reclaimed!' : res.data);
            this.fetchTicket();
        }).catch(() => toast.error("Couldn't upgrade"));
    };

    handleUpgradeData = (_e, { value }) => {
        const { upgradeList } = this.state;
        upgradeList.push(value);
    };

    render() {
        const { ticket } = this.state;

        const { upgrade, handleUpgradeData } = this;

        return (
            <Segment
                textAlign='center'
                style={{ minHeight: 900, padding: '1em 0em' }}
                vertical
            >
                <React.Fragment>
                    <Button size="large" primary onClick={() => history.push('/')}>
                        Back to Lounge
                    </Button>
                    <Header
                        as='h3'
                        content='Ticket Information'
                        style={{
                            fontSize: '3em',
                            fontWeight: 'normal',
                            marginBottom: '1em',
                            marginTop: '3em',
                            color: 'gold',
                        }}
                    />
                    <Grid centered stackable style={{ marginBottom: '0em' }}>
                        <Grid.Row centered columns={2}>
                            <Grid.Column textAlign="right">
                                <Input
                                    label="Name"
                                    value={_.get(ticket, "name")}
                                    disabled
                                    transparent
                                    size="huge"
                                />
                            </Grid.Column>
                            <Grid.Column textAlign="left">
                                <Input
                                    label="PNR Code"
                                    value={_.get(ticket, "pnrCode")}
                                    disabled
                                    transparent
                                    size="huge"
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row colums={4}>
                            <Grid.Column>
                                <Input color='blue' disabled={ _.filter(_.get(ticket, 'upgradeList'), i => i === 1).length === 0 }>
                                    Emergency Exit
                                </Input>
                            </Grid.Column>
                            <Grid.Column>
                                <Input color='teal' disabled={ _.filter(_.get(ticket, 'upgradeList'), i => i === 2).length === 0}>
                                    Extra Leg Room
                                </Input>
                            </Grid.Column>
                            <Grid.Column>
                                <Input color='yellow' disabled={ _.filter(_.get(ticket, 'upgradeList'), i => i === 3).length === 0}>
                                    Ozu Experience
                                </Input>
                            </Grid.Column>
                            <Grid.Column>
                                <Input color='yellow' disabled={ _.filter(_.get(ticket, 'upgradeList'), i => i === 4).length === 0}>
                                    Unlimited Beverages
                                </Input>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </React.Fragment>
                <React.Fragment>
                    <Header
                        as='h3'
                        content='Upgrades'
                        style={{
                            fontSize: '3em',
                            fontWeight: 'normal',
                            marginBottom: '1em',
                            marginTop: '3em',
                            color: 'gold',
                        }}
                    />
                    <Grid centered columns={1}>
                        <Grid.Column width={5}>
                            <Grid.Row centered>
                                <Dropdown
                                    placeholder='Choose some'
                                    fluid
                                    multiple
                                    selection
                                    options={upgradeOptions}
                                    onChange={(_e, { value }) => handleUpgradeData(null, { value }) }
                                />
                            </Grid.Row>
                            <Divider />
                            <Grid.Row>
                                <Button fluid size="large" secondary onClick={upgrade}>
                                    Upgrade
                                </Button>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </React.Fragment>
            </Segment>
        );
    }
}

export default TicketPage;