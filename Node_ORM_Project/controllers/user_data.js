

var db = require("../models");

const Users_info = db.users;
const post_details = db.post;
const tag_details = db.tags;

//***polymorphic relationship table initialization***//
const image_details = db.image;
const video_details = db.video;
const comment_details = db.comment;
const tag_taggable_details = db.tag_taggable;


//***Insert the records into user_details table***// //add
var addUser = async (req, res) => { 
  const data = await Users_info.create({
    id: 5,
    name: "Sagar",
    email: "sagar@example.com",
    gender: "male",
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });

  console.log(data); 
  res.status(200).json(data);
}
  //***type 2 for inserting the data using build***//

  // let data = await Users_info.build({
  //     name: 'Swapnil',
  //     email : 'swapnil@example.com',
  //     gender : 'male'
  //  })
  // .catch(err => {
  //     if(err){
  //         console.log(err);
  //     }
  // })
  // data.save();
//};


//***update the inserted record***// //update
var update = async (req, res) => {
     let data = Users_info.update({name : 'Satish', email: 'satish@example.com'},{
          where : {
              id :5
          }
      });
      res.status(200).json(data);
    }

//***delete the record***// //remove
var remove  = async (req,res) => {
  let data = await Users_info.destroy({
      where : {
          id : 5
      }
  });
  res.status(200).json(data);
};


//***displaying all the users***// //users
var allUsers = async (req, res) => {  
  let data = await Users_info.findAll({});
  
  res.status(200).json(data);
};


//***for relationship one to one***//
//***using user_details table to fetch the post table***// //one-one
var oneToOne = async (req, res) => {
  let data = await Users_info.findAll({
    attributes: ["name", "email"],
    include: [
      {
        model: post_details,
        attributes: ["employer", "designation"],
      },
    ],
    where: { id: 1 },
  });

  res.status(200).json(data);
};

//***using post table to fetch the user table***// //belongsTo
var belongsTo = async (req, res) => {
  let data = await post_details.findAll({
    attributes: ["employer", "designation"],
    include: [
      {
        model: Users_info,
        attributes: ["name", "email"],
      },
    ],
    where: { id: 1 },
  });

  res.status(200).json(data);
};

//for relationship one to many***// //one-many
var oneToMany = async (req,res) =>{

    let data = await Users_info.findAll({
        attributes : ['name', 'email'],
        include : [
            {
                model : post_details,
                attributes : ['employer','designation']
            }
        ],
        where : {id : 3}
    })
    res.status(200).json(data);
}

//***many to many***//  //many-many
var manyToMany = async (req,res) => {
    let data = await post_details.findAll({
          attributes:['employer', 'designation'],
          include : [{
            model : tag_details,
            attributes : ['name'],
          }]
    })
    res.status(200).json(data)
}
 
//***for one-many polymorphic relation***//poly_one-many
var polyOneToMany =  async(req,res) => {
      //***for image to comment
      // let data = await image_details.findAll({
      //   attributes : ['name', 'url'],
      //   include : [{
      //     model : comment_details,
      //    attributes : ['title']
      //   }]
      // })

      //***for video to comment
      let data = await video_details.findAll({
        attributes : ['name','text'],
        include : [{
          model : comment_details,
          attributes : ['title']
        }]
      })

      res.status(200).json(data);
}

//***polymorphic relation many to many***//poly_many-many
 var polyManyToMany = async(req,res) => {
  
  //***for image to tag***//
//   let data = await image_details.findAll({
//     include : [{
//       model : tag_details,    
//     }
//    ]
//   })


//***for video to tag***//
// let data = await video_details.findAll({
//   include : [tag_details]
// })

  //***for  tag to video and image***//
  let data = await tag_details.findAll({
    include : [  image_details, video_details ]
  })

  res.status(200).json(data)
}


module.exports = {
  addUser,
  update,
  remove,
  allUsers,
  oneToOne,
  belongsTo,
  oneToMany,
  manyToMany,
  polyOneToMany,
  polyManyToMany,
};
