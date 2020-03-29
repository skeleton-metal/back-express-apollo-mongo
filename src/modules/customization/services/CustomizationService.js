import Customization from './../models/CustomizationModel'
import {UserInputError} from 'apollo-server-express'

export const fetchCustomizations = async function () {
    return new Promise((resolve, reject) => {
        Customization.find({}).isDeleted(false).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateCustomization = function (limit, pageNumber = 1, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {primary: {$regex: search, $options: 'i'}},
{onPrimary: {$regex: search, $options: 'i'}},
{secondary: {$regex: search, $options: 'i'}},
{onSecondary: {$regex: search, $options: 'i'}},
{logo: {$regex: search, $options: 'i'}},
{language: {$regex: search, $options: 'i'}}
                ]
            }
        }
        return qs
    }
    
     function getSort(orderBy, orderDesc) {
        if (orderBy) {
            return (orderDesc ? '-' : '') + orderBy
        } else {
            return null
        }
    }


    let query = {deleted: false, ...qs(search)}
    let populate = null
    let sort = getSort(orderBy, orderDesc)
    let params = {page: pageNumber, limit: limit, populate, sort}

    return new Promise((resolve, reject) => {
        Customization.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}

export const findCustomization = async function (id) {
    return new Promise((resolve, reject) => {
        Customization.findOne({_id: id}).exec((err, res) => (
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
        (error,doc) => {
            
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

export const deleteCustomization = function (id) {
    return new Promise((resolve, rejects) => {
        findCustomization(id).then((doc) => {
            doc.softdelete(function (err) {
                err ? rejects(err) : resolve({id: id, deleteSuccess: true})
            });
        })
    })
}

