const models = require('../models');

/*----------------verb GET ---------------*/
exports.getAllMessage = async (req, res, next) => { 
  let data = [];
  try {  //récupération de tout les messages sur la base de donnée
    messages = await models.Message.findAll();
  } catch (error) {
    return res.status(400).json({error: 'error request'})
  }  
  console.log(messages)
         //boucle sur tout les messages
  for (let i = 0; i < messages.length; i++) {
    let user = null;
    try {//recherche d'un ID dans la base de donnée User
      user = await models.User.findOne({
        where: {//recherche de l'ID qui est comparé à l'userId présent dans chaque messages
          id: messages[i].UserId
        }     
      })   
    } catch (error) {
      return res.status(400).json({error: 'error request'})
    }
    data.push({ //push de l'objet formaté dans le tableau data
      title: messages[i].title,
      content: messages[i].content,
      attachment: messages[i].attachment,
      firstname: user.firstname,
      lastname: user.lastname
    })
  }
  //renvoi du tableau dans la reponse
  console.log(data)
  return res.status(200).json(data)
};
 
/*----------------verb POST ---------------*/
exports.createMessage = async (req, res, next) => {
  console.log(req.body)
  await models.User.findOne({ where: { id: req.body.id }
  })
  const message = await models.Message.create({
    title: req.body.title,
    content: req.body.content,
    attachment: req.body.attachment,
    UserId: req.body.id
  })
  message.save()
    .then( () => res.status(201).json({ message: "créer un post sur le forum" }))
    .catch(error => res.status(400).json({ error: error }));
  };

/*----------------verb PUT ---------------*/
  exports.modifyMessage = (req, res, next) => {
    res.json({ message: "Modifier un post sur le forum"});
  }; 

/*----------------verb DELETE ---------------*/
  exports.deleteMessage = (req, res, next) => {  
    res.json({ message: "Supprimer un post sur le forum"});
   };  