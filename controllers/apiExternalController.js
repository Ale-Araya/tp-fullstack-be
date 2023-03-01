const getExternalPhotos = async(req,res)=>{
    const photos = await fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
    res.status(200).json({
        photos:photos,
        msg:"ok"
    })
};
module.exports = {getExternalPhotos};