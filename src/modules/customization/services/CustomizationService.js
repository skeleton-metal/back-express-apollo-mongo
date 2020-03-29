import Customization from './../models/CustomizationModel'
import {UserInputError} from 'apollo-server-express'
import path from "path";
import fs from "fs";
import {User} from "../../security/models/User";
const mongoose = require('mongoose');



export const findCustomization = async function () {
    return new Promise((resolve, reject) => {
        Customization.findOne().exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


export const createCustomization = async function (user, {primary, onPrimary, secondary, onSecondary, logo, language}) {

    const doc = new Customization({
        primary, onPrimary, secondary, onSecondary, logo, language
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {

            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            }

            resolve(doc)
        }))
    })
}

export const updateCustomization = async function (user, id, {primary, onPrimary, secondary, onSecondary, logo, language}) {
    return new Promise((resolve, rejects) => {
        Customization.findOneAndUpdate({_id: id},
            {primary, onPrimary, secondary, onSecondary, logo, language},
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    rejects(error)
                }

                resolve(doc)
            })
    })
}

export const updateColors = async function (user, {primary, onPrimary, secondary, onSecondary}) {
    return new Promise((resolve, rejects) => {

        Customization.findOneAndUpdate({},
            {primary, onPrimary, secondary, onSecondary},
            {new: true, runValidators: true, context: 'query', useFindAndModify: false},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    rejects(error)
                }
                console.log(error)
                console.log(doc)

                resolve(doc)
            })
    })
}

export const updateLang = async function (user, {language}) {
    return new Promise((resolve, rejects) => {
        Customization.findOneAndUpdate({},
            {language},
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    rejects(error)
                }

                resolve(doc)
            })
    })
}


export const uploadLogo = async function (user, file) {
    const {filename, mimetype, encoding, createReadStream} = await file;


    const parseFileName = path.parse(filename);
    const finalFileName = user.username + parseFileName.ext

    const rs = createReadStream()
    const dst = path.join("media", "logo", finalFileName)
    var wstream = fs.createWriteStream(dst);
    rs.pipe(wstream);

    const rand = randomstring(3)
    const url = process.env.APP_API_URL + "/media/logo/" + finalFileName + "?" + rand


    return new Promise((resolve, rejects) => {
        Customization.findOneAndUpdate(
            {}, {logo: finalFileName, logourl: url}, {useFindAndModify: false},
            (error) => {
                if (error) rejects({status: false, message: "Falla al intentar guardar el logo en la DB"})
                else resolve({filename, mimetype, encoding, url})
            }
        );
    })


    return {filename, mimetype, encoding, url};
}
