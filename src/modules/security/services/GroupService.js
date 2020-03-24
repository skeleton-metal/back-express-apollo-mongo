import Group from './../models/GroupModel'

export const fetchGroups = async function () {
    return new Promise((resolve, reject) => {
        Group.find({}).isDeleted(false).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateGroup = function (limit, pageNumber = 1, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {name: {$regex: search, $options: 'i'}}
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
        Group.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}

export const findGroup = async function (id) {
    return new Promise((resolve, reject) => {
        Group.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}



export const createGroup = async function (user, {name}) {
    
    const doc = new Group({
        name
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {
            error ? rejects(error) : resolve(doc)
        }))
    })
}

export const updateGroup = async function (user, id, {name}) {
    return new Promise((resolve, rejects) => {
        Group.findOneAndUpdate({_id: id},
        {name}, 
        {new: true},
        (error,doc) => {
            error ? rejects(error) : resolve(doc)
        })
    })
}

export const deleteGroup = function (id) {
    return new Promise((resolve, rejects) => {
        findGroup(id).then((doc) => {
            doc.softdelete(function (err) {
                err ? rejects(err) : resolve({id: id, deleteSuccess: true})
            });
        })
    })
}

