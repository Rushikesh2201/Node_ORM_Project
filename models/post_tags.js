//table for many to many relationship


module.exports = (sequelize, DataTypes) => {
    const Post_Tags = sequelize.define("post_tags",{
        postId : DataTypes.INTEGER,
        tagId : DataTypes.INTEGER,
    })
    return Post_Tags;
}