const {
    validationResult
} = require('express-validator');
const User = require('../models/User');
//lista de usuarios (READ)
const getUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        users,
        msg: "ok"
    });
};
//Obtener un usuario x ID
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user !== undefined && user !== null) {
        res.status(200).json({
            user: user,
            msg: "ok"
        });
    } else {
        res
            .status(404)
            .json({
                user: null,
                msg: "el usuario no ha sido encontrado"
            })
    }
};
const getUserByName = async (req, res) => {
    const user = await User.findOne({
        username: req.query.user
    })

    if (user !== undefined && user !== null) {
        res.status(200).json({
            user,
            msg: "ok"
        });
    } else {
        res
            .status(404)
            .json({
                user: null,
                msg: "el usuario no ha sido encontrado"
            })
    }
};
//crear un usuario nuevo(CREATE)
const postUser = async (req, res) => {
    try {
        const validationError = validationResult(req);
        if (validationError.isEmpty()) {
            const user = new User(req.body);
            await user.save();

            res.status(201).json({
                user: user.username,
                msg: "El usuario a sido creado Exitosamente",
            });
        } else {
            res.status(400).json({
                msg: 'error en el registro del usuario',
                validationError,
            })
        }
    } catch (error) {
        res.status(500).json({
            user: null,
            msg: "Hubo un error al crear el usuario - " + error.message,
        });
    }
};

//actualizar usuario(UPDATE)
const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            msg: "Usuario Actualizado"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al actualizar - " + error.message
        })
    }
}

//Eliminar usuario (DELETE)
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "Usuario Eliminado"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al Eliminar - " + error.message
        })
    }
}
module.exports = {
    getUsers,
    getUserById,
    getUserByName,
    postUser,
    updateUser,
    deleteUser
};