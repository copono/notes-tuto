import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/*
// Warning: According to a comment in 
// https://stackoverflow.com/questions/45315918/react-proptypes-component-class
// the following check is for React.forwardRef
// but tldr
FancyButton: function (props, propName, componentName) {
  if (!props[propName] || typeof (props[propName].render) != 'function') {
    return new Error(`${propName}.render must be a function!`);
  }
*/


export function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          Meteor.userId() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: props.to,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired
}

  export function PublicRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          !Meteor.userId() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: rest.to,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired
}
  