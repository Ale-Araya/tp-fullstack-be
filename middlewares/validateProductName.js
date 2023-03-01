const Product=require('../models/Product')

const validateProductName= async (req,res,next)=>{
    const product= await Product.findOne({name: req.body.name})

    if(product){
        res.status(400).json({msg:"El Producto ya existe en nuestros registros"})
    }else {
        next();
    }
}
module.exports = validateProductName;