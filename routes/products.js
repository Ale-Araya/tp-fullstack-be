const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const productController = require("../controllers/productController");
const validateProductName = require('../middlewares/validateProductName');

//READ: OBTENER DATOS
router.get("/", productController.getProducts);
router.get("/buscar", productController.getProductByName);
router.get("/:id", productController.getProductById);

//CREATE: CREAR REGISTRO
router.post('/registro',validateProductName,
[check("name").not().isEmpty().withMessage("El nombre del producto es obligatorio"),
    check("price").not().isEmpty().withMessage("el precio es obligatorio").isNumeric().withMessage("El precio debe ser numerico"),
], productController.postProduct);
// agregar todos los chequeos
//UPDATE: ACTUALIZAR REGISTRO/DOCUMENTO
router.put("/actualizar/:id", productController.updateProduct);
//DELETE: BORRAR REGISTRO/DOCUMENTO
router.delete("/:id", productController.deleteProduct);
module.exports = router;