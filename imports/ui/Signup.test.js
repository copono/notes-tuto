import {Meteor} from 'meteor/meteor';
import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import expect from 'expect';
import {mount} from 'enzyme';
import sinon from 'sinon';

import {Signup} from './Signup';

if(Meteor.isClient){
    describe('Signup', function(){

        it('should show error messages', function(){
            const error = 'This is not working';
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/random' ]}>
                    <Signup createUser={()=>{}}/>
                </MemoryRouter>
            );

            wrapper.find(Signup).setState({ error });
            const ptext = wrapper.find(Signup).find('p').text();
            expect(ptext).toBe(error)

            wrapper.find(Signup).setState({ error: '' });
            const plist = wrapper.find(Signup).find('p');
            expect(plist.length).toBe(0)
        })

        it('should call createUser with the form data', function(){
            const email = 'ger@example.com';
            const password = 'pass123';
            const spy = sinon.spy();
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Signup createUser={spy}/>
                </MemoryRouter>
            );

            wrapper.find(Signup).instance(0).emailRef.current.value = email;
            wrapper.find(Signup).instance(0).passwordRef.current.value = password;
            wrapper.find(Signup).find('form').simulate('submit');

            expect(spy.firstCall.args[0]).toEqual({email, password});
        });


        it('should set error if short password', function(){
            const email = 'ger@example.com';
            const password = '   123                  ';
            const spy = sinon.spy();
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Signup createUser={spy}/>
                </MemoryRouter>
            );

            wrapper.find(Signup).instance(0).emailRef.current.value = email;
            wrapper.find(Signup).instance(0).passwordRef.current.value = password;
            wrapper.find(Signup).find('form').simulate('submit');

            expect(wrapper.find(Signup).state('error')).not.toBe('');
        });

        it('should set createUser callback errors', function(){
            const password = 'pass123';
            const reason = 'This is why it failed'
            const spy = sinon.spy();
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Signup createUser={spy}/>
                </MemoryRouter>
            );
            wrapper.find(Signup).instance(0).passwordRef.current.value = password;
            const signup = wrapper.find(Signup);
            signup.find('form').simulate('submit');

            spy.firstCall.args[1]({reason})
            expect(signup.state('error')).toBe(reason);
            spy.firstCall.args[1]()
            expect(signup.state('error')).toBe('');

        });
    })
}