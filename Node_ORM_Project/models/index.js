
const {Sequelize , DataTypes} = require('sequelize');

                                //dbname,   username,   password
const sequelize = new Sequelize('training', 'root', 'mynewpassword' , {
    host : 'localhost',
    dialect : 'mysql',
    //logging : false, //for off unwanted message on console
});

sequelize.authenticate()
.then(() => {
    console.log('connected');
}) 
.catch(err => {
    console.log(err);
});

const db = {}
db.Sequelize = Sequelize;   
db.sequelize = sequelize;

//modal sync
db.sequelize.sync({force : false , match : /training$/})
.then(() => {
    console.log("Re-sync");
})
.catch(err =>{
    console.log(err);
})

db.users = require('./user_details')(sequelize,DataTypes); 
db.post = require('./post')(sequelize,DataTypes);
db.tags = require('./tags')(sequelize,DataTypes);
db.post_tags = require('./post_tags')(sequelize,DataTypes);



//***for one to one relationship***//
// db.users.hasOne(db.post);//{foreignKey : 'user_id'});
db.post.belongsTo(db.users);//,{foreignKey : 'user_id'});
 
//***for one to many***// //users, post
db.users.hasMany(db.post);

//***for many to many relationship***// //post,tag,post_tag
db.post.belongsToMany(db.tags,{through:'post_tags'});
db.tags.belongsToMany(db.post,{through : 'post_tags'});


//***table for polymorphic relationships***//
db.image = require('./image')(sequelize,DataTypes);
db.video = require('./video')(sequelize,DataTypes);
db.comment = require('./comment')(sequelize,DataTypes);


//***Polymorphic one-many***//
//for image
db.image.hasMany(db.comment, {
    foreignKey : 'commentableId',
    constraints : false,
    scope : {
        commentableType : 'image',
    }
});

//for video
db.video.hasMany(db.comment, {
    foreignKey : 'commentableId',
    constraints : false,
    scope :{
        commentableType : 'video'
    }
});

db.comment.belongsTo (db.image, {
    foreignKey : 'commentableId',
    constraints : false,
});

db.comment.belongsTo(db.video,{
    foreignKey:'commentableId',
    constraints : false,
})

//***polymorphic many to many relationship tables***//
db.tag_taggable = require('./tag_taggable')(sequelize,DataTypes);

//***polymorphic many to many***//
//from image to tag
db.image.belongsToMany(db.tags, { 
    through : 
        {
            model : db.tag_taggable,
            unique : false,
            scope : {
                taggableType : 'image'
            }   
        }, 
        foreignKey : 'taggableId',
        constraints : false
})

//from tag to image
db.tags.belongsToMany (db.image,{
    through : {
        model : db.tag_taggable ,
        unique : false,
        scope : {
            taggableType : 'image'
        }
    },
    foreignKey : 'tagId',
    constraints : false
})

//from video to tag
db.video.belongsToMany(db.tags, {
    through : {
        model : db.tag_taggable,
        unique : false,
        scope : {
            taggableType : 'video'
        }
    },
    foreignKey : 'taggableId',
    constrainnts : false
})

//from tag to video
db.tags.belongsToMany(db.video, {
    through : {
        model : db.tag_taggable,
        unique : false,
        scope : {
            taggableType : 'video'
        }
    },
    foreignKey : 'tagId',
    constraints : false
})

module.exports = db;


