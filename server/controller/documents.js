const document = require('../models/document.js')
const path = require('path')
const fs = require('fs')
const allDocuments = async (req, res, next) => {
    try {
        const records = await document.findAll()
        res.status(200).json({
            success: true,
            data: records
        })
    }
    catch (e) {
        next(e)
    }
}
const download = async (req, res, next) => {
    try {
        const id = req.params.id
        const record = await document.findByPk(id)
        if (!record) {
            const err = new Error('document not found')
            err.statusCode = 404
            return next(err)
        }
        res.download(path.resolve(record.path), `${record.originalname}.pdf`)
    }
    catch (e) {
        next(e)
    }
}
const uploadDocument = async (req, res, next) => {
    try {
        const { filename, size, originalname, path, mimetype } = req.file
        if (mimetype !== 'application/pdf') {
            const err = new Error('Invalid file type')
            err.statusCode = 400
            next(err)
        }
        await document.create({
            filename, size, originalname, path
        })
        res.status(200).send('okkk')
    }
    catch (e) {
        next(e)
    }
}
const deleteDocument = async (req, res, next) => {
    try {
        const id = req.params.id
        const record = await document.findByPk(id)
        if (!record) {
            const err = new Error('document not found')
            err.statusCode = 404
            return next(err)
        }
        fs.unlinkSync(record.path)
        await record.destroy()
        res.status(200).json({
            success: true
        })
    }
    catch (e) {
        next(e)
    }
}
module.exports = { allDocuments, download, uploadDocument, deleteDocument }