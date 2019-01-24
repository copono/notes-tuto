import {Meteor} from 'meteor/meteor';
import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import expect from 'expect';
import {mount} from 'enzyme';
import sinon from 'sinon';

import {Login} from './Login';

if(Meteor.isClient){
    describe('Login', function(){

        it('should show error messages', function(){
            const error = 'This is not working';
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/random' ]}>
                    <Login loginWithPassword={()=>{}}/>
                </MemoryRouter>
            );

            wrapper.find(Login).setState({ error });
            const ptext = wrapper.find(Login).find('p').text();
            expect(ptext).toBe(error)

            wrapper.find(Login).setState({ error: '' });
            const plist = wrapper.find(Login).find('p');
            expect(plist.length).toBe(0)
        })

        it('should call loginWithPassword with the form data', function(){
            const email = 'ger@example.com';
            const password = 'pass123';
            const spy = sinon.spy();
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Login loginWithPassword={spy}/>
                </MemoryRouter>
            );

            wrapper.find(Login).instance(0).emailRef.current.value = email;
            wrapper.find(Login).instance(0).passwordRef.current.value = password;
            wrapper.find(Login).find('form').simulate('submit');

            expect(spy.firstCall.args[0]).toEqual({email});
            expect(spy.firstCall.args[1]).toBe(password);
        });

        it('should set loginWithPassword callback errors', function(){
            const spy = sinon.spy();
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Login loginWithPassword={spy}/>
                </MemoryRouter>
            );
            const login = wrapper.find(Login);
            login.find('form').simulate('submit');
            spy.firstCall.args[2]({})
            expect(login.state('error')).not.toBe('');
            spy.firstCall.args[2]()
            expect(login.state('error')).toBe('');

        });
    })
}