const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const userController = require("../controllers/userControler");
const validarUserName = require('../middlewares/validarUserName');

//READ: OBTENER DATOS
router.get("/", userController.getUsers);
router.get("/buscar", userController.getUserByName);
router.get("/:id", userController.getUserById);
//CREATE: CREAR REGISTRO
router.post('/registro',validarUserName,
[check("username").not().isEmpty().withMessage("el nombre de usuario es obligatorio"),
    check("password").not().isEmpty().withMessage("la contraseña es obligatoria").isNumeric().withMessage("La contraseña debe ser numerica").isLength({
        min: 4,
        max: 10
    }).withMessage("la contraseña debe ser de 4 o mas caracteres"),
    check("email").not().isEmpty().withMessage("el email es es obligatorio").isEmail().withMessage("Debe ingresar un mail valido")
], userController.postUser);
//UPDATE: ACTUALIZAR REGISTRO/DOCUMENTO
router.put("/actualizar/:id", userController.updateUser);
//DELETE: BORRAR REGISTRO/DOCUMENTO
router.delete("/borrar/:id", userController.deleteUser);
module.exports = router;