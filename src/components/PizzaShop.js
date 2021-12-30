import {Checkbox, Form, Label, Radio} from "semantic-ui-react";
import _ from "lodash";
import React from "react";

class PizzaShop extends React.Component {
    render() {
        const { handleFormChange, pizza } = this.props;

        return (
            <Form>
                <Form.Group>
                    <label style={{ marginLeft: '20em' }}>Size</label>
                    <Form.Field>
                        <Radio
                            label='Small'
                            name='pizza.size'
                            value={1}
                            checked={_.get(pizza, "size") === 1}
                            onChange={handleFormChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='Medium'
                            name='pizza.size'
                            value={2}
                            checked={_.get(pizza, "size") === 2}
                            onChange={handleFormChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='Large'
                            name='pizza.size'
                            value={3}
                            checked={_.get(pizza, "size") === 3}
                            onChange={handleFormChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Label pointing="below" style={{ marginBottom: '1em' }}>
                    Ingredients
                </Label>
                <Form.Field>
                    <Checkbox
                        label='Cheese (+5 TRY)'
                        value='cheese'
                        disabled={!_.get(pizza, "size")}
                        checked={_.get(pizza, "cheese")}
                        onChange={(_e, { checked }) => handleFormChange(null, { name: 'pizza.cheese', value: checked })}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='Mushroom (+10 TRY)'
                        value='mushroom'
                        checked={_.get(pizza, "mushroom")}
                        disabled={!_.get(pizza, "size")}
                        onChange={(_e, { checked }) => handleFormChange(null, { name: 'pizza.mushroom', value: checked })}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='Pepperoni (+15 TRY)'
                        value='pepperoni'
                        checked={_.get(pizza, "pepperoni")}
                        disabled={!_.get(pizza, "size")}
                        onChange={(_e, { checked }) => handleFormChange(null, { name: 'pizza.pepperoni', value: checked })}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        label="Total Price"
                        name="price"
                        value={_.get(pizza, "price")}
                        style={{ width: "50px" }}
                        disabled
                    />
                </Form.Field>
            </Form>
        );
    }
}

export default PizzaShop;