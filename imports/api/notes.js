import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer) {
    Meteor.publish('notes', function(){
        return Notes.find({userId: this.userId});
    });
}

Meteor.methods({
    'notes.insert'(){
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: moment().valueOf() //new Date().getTime()
        })
    },
    'notes.remove'(_id) {
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id})

        Notes.remove({_id, userId: this.userId}); //IMPORTANT TO ADD CHECK THE USER
    },
    'notes.update'(_id, updates){
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            title: {
                type:String,
                optional: true
            },
            body: {
                type:String,
                optional:true
            }
        }).validate({
            _id,
            ...updates //if we passed only title and body it may pass with malicious data
        });

        Notes.update({
            _id,
            userId: this.userId
        }, {
            $set: {
                updatedAt: moment().valueOf(),
                ...updates
            }
        })

    }


})
