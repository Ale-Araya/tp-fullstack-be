const {validationResult} = require('express-validator');
const Product = require('../models/Product');

//lista de Productos (READ)
const getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        products,
        msg: "ok"
    });
};

//Obtener un usuario x ID
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product !== undefined && product !== null) {
        res.status(200).json({
            product: product,
            msg: "ok"
        });
    } else {
        res
            .status(404)
            .json({
                product: null,
                msg: "el Producto no ha sido encontrado"
            })
    }
};
const getProductByName = async (req, res) => {
    const product = await Product.findOne({
        name: req.query.name
    })

    if (product !== undefined && product !== null) {
        res.status(200).json({
            product,
            msg: "ok"
        });
    } else {
        res
            .status(404)
            .json({
                product: null,
                msg: "el Producto no ha sido encontrado"
            })
    }
};
//crear un usuario nuevo(CREATE)
const postProduct = async (req, res) => {
    try {
        const validationError = validationResult(req);
        if (validationError.isEmpty()) {
            const product = new Product(req.body);
            await product.save();

            res.status(201).json({
                product: product.name,
                msg: "El Producto a sido creado Exitosamente",
            });
        } else {
            res.status(400).json({
                msg: 'error en el registro del Producto',
                validationError,
            })
        }
    } catch (error) {
        res.status(500).json({
            product: null,
            msg: "Hubo un error al crear el Producto - " + error.message,
        });
    }
};

//actualizar producto(UPDATE)
const updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            msg: "Producto Actualizado"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al actualizar - " + error.message
        })
    }
}

//Eliminar usuario (DELETE)
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "Producto Eliminado"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al Eliminar - " + error.message
        })
    }
}
module.exports = {
    getProducts,
    getProductById,
    getProductByName,
    postProduct,
    updateProduct,
    deleteProduct
};