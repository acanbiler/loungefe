import React from "react";
import produce from 'immer';
import {Segment, Button, Menu, Header} from 'semantic-ui-react';
import history from "../utils/history";
import _ from "lodash";

import PizzaShop from '../components/PizzaShop'
import { request } from "../utils/request";
import {toast} from "react-toastify";

const endpoints = {
    bakePizza: pizza => request.post(`/lounge/pizza`, pizza, {withCredentials: true})
}

class Shops extends React.Component {
    state = {
        activeItem: 'pizza',
        pizza: { price: null },
    }

    handleMenuClick = (_e, { name }) => this.setState({
        activeItem: name,
        pizza: null
    });

    handleFormChange = (_e, { name, value }) => {
        const { pizza } = this.state;

        this.setState(
            produce(draft => {_.set(draft, name, value);})
        );

        if (name === "pizza.size")
            this.setState(
                produce(draft => {
                    _.set(draft, "pizza.cheese", false);
                    _.set(draft, "pizza.pepperoni", false);
                    _.set(draft, "pizza.mushroom", false);
                    _.set(draft, "pizza.price", value *  20);
                })
            );
        if (name === "pizza.cheese" && value)
            this.setState(
                produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") +  5);})
            );
        if (name === "pizza.mushroom" && value)
            this.setState(
                produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") +  10);})
            );
        if (name === "pizza.pepperoni" && value)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") +  15);}));
        if (name === "pizza.cheese" && value === false)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") -  5);}));
        if (name === "pizza.mushroom" && value  === false)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") -  10);}));
        if (name === "pizza.pepperoni" && value  === false)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") -  15);}));
    };

    order = () => {
        const { activeItem, pizza } = this.state;

        if (activeItem === 'pizza') {
            endpoints.bakePizza(_.omit(pizza, 'price'))
                .then(res => {
                    this.setState({ pizza: res.data })
                    toast.success(res.data.cost);
                })
                .catch(() => toast.error("Owen malfunction"));
        }
    };

    render() {
        const { activeItem, pizza } = this.state

        const { handleFormChange, handleMenuClick, order } = this;

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
                </React.Fragment>
                <div>
                    <Header
                        as='h3'
                        content='Shops'
                        style={{
                            fontSize: '3em',
                            fontWeight: 'normal',
                            marginBottom: '1em',
                            marginTop: '1em',
                            color: 'olive',
                        }}
                    />
                    <Menu attached='top' tabular>
                        <Menu.Item
                            name='pizza'
                            active={activeItem === 'pizza'}
                            onClick={handleMenuClick}
                        />
                        <Menu.Item
                            name='iceCream'
                            active={activeItem === 'iceCream'}
                            onClick={handleMenuClick}
                        />
                        <Menu.Item
                            name='coffee'
                            active={activeItem === 'coffee'}
                            onClick={handleMenuClick}
                        />
                    </Menu>

                    <Segment attached='bottom'>
                        {activeItem === 'pizza' && (
                            <PizzaShop handleFormChange={handleFormChange} pizza={pizza}/>
                        )}
                        {activeItem === 'coffee' && (
                            <img src='https://e7.pngegg.com/pngimages/997/906/png-clipart-under-construction-under-construction-thumbnail.png' />
                        )}
                        {activeItem === 'iceCream' && (
                            <img src='https://e7.pngegg.com/pngimages/997/906/png-clipart-under-construction-under-construction-thumbnail.png' />
                        )}
                        <Button
                            size="large"
                            secondary
                            onClick={order}
                            color='red'
                            disabled={!_.get(pizza, "size")}
                            style={{
                                marginBottom: '2em',
                                marginTop: '2em',
                            }}
                        >
                            Give Order
                        </Button>
                    </Segment>
                </div>
            </Segment>
        );
    }
}

export default Shops;