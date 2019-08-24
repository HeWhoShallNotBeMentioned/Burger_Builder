import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: { street: '', postalCode: '' },
    loading: false,
  };

  orderHandler = async event => {
    event.preventDefault();
    // console.log('ContactData ingredients++++++', this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Chris Underwood',
        address: {
          street: 'Teststreet 1',
          zipCode: '97107',
          country: 'USA',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    try {
      const orderResponse = await axios.post('/orders.json', order);
      console.log('orderResponse', orderResponse);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (error) {
      this.setState({ loading: false });
      console.log('error', error);
    }
  };

  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
          label="Name"
        />
        <Input
          inputtype="input"
          type="text"
          name="email"
          placeholder="Your E-mail"
        />
        <Input
          inputtype="input"
          type="text"
          name="stree"
          placeholder="Your Street"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Your Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Complete Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
