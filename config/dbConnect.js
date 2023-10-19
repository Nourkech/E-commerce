const {default :mongoose }= require('mongoose');


const dbConnect = ()=> {
    mongoose.connect('mongodb://127.0.0.1:27017/digitic' )
    .then(()=> console.log('connection done'))
    .catch((err)=> console.error('connection failed'));
    
};

module.exports = dbConnect;
