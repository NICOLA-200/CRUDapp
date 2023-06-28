var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    
    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

     if(req.query.id){
         const id = req.query.id;
 
         Userdb.findById(id)
             .then(data =>{
                 if(!data){
                     res.status(404).send({ message : "Not found user with id "+ id})
                 }else{
                     res.send(data)
                 }
             })
             .catch(err =>{
                 res.status(500).send({ message: "Erro retrieving user with id " + id})
             })