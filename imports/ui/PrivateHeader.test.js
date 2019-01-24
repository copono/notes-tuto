import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import sinon from 'sinon';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient){
    describe('PrivateHeader', function() {
        afterEach(function (){
            sinon.restore();
        });

        it('should set button text to logout', function(){
            const wrapper = mount( <PrivateHeader title="Test title" handleLogout={()=>{}}/>);
            const buttonText = wrapper.find('button').text();

            expect(buttonText).toBe('Logout');
        });

        it('should use title prop as h1 text', function(){
            const title = 'Test title here';

            const wrapper = mount( <PrivateHeader title={title} handleLogout={()=>{}}/>);
            const actualTitle = wrapper.find('h1').text();

            expect(actualTitle).toBe(title);
        })

        // it('should call the function', function(){
        //     const spy = sinon.spy();
        //     spy(1, 2);
        //     spy('foo');
        //     expect(spy.calledWithExactly(1,2)).toBe(true);
        // });

        it('should call the handleLogout on click', function(){
            const spy = sinon.spy();
            const wrapper = mount( <PrivateHeader title="Test title" handleLogout={spy}/>);
            wrapper.find('button').simulate('click');

            expect(spy.called).toBe(true);
        });

    });
}