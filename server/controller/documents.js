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
        const record = await document.findByPk(req.params.id)
        if (!record) {
            const err = new Error('document not found')
            err.statusCode = 404
            return next(err)
        }
        res.download(path.resolve('uploads', record.filename), record.originalname)
    }
    catch (e) {
        next(e)
    }
}
const uploadDocument = async (req, res, next) => {
    try {
        const { filename, size, originalname, mimetype } = req.file
        if (mimetype !== 'application/pdf') {
            const err = new Error('Invalid file type')
            err.statusCode = 400
            return next(err)
        }
        await document.create({
            filename, size, originalname
        })
        res.status(201).json({
            success: true,
            message: 'Document Uploaded'
        })
    }
    catch (e) {
        next(e)
    }
}
const deleteDocument = async (req, res, next) => {
    try {
        const record = await document.findByPk(req.params.id)
        if (!record) {
            const err = new Error('document not found')
            err.statusCode = 404
            return next(err)
        }
        fs.unlinkSync(`uploads/${record.filename}`)
        await record.destroy()
        res.status(200).json({
            success: true,
            message: 'Document Deleted'
        })
    }
    catch (e) {
        next(e)
    }
}
module.exports = { allDocuments, download, uploadDocument, deleteDocument }