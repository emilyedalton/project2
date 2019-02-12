module.exports = function(sequelize, DataTypes) {
  const Movie = sequelize.define("Movie", {
    //movieTitle will be the property name
    movieTitle: {
      field: "movie_title",
      type: DataTypes.STRING,
      allowNull: true
    },
    movieLink: {
      field: "movie_link",
      type: DataTypes.STRING,
      allowNull: true
    },
    movieDesc: {
      field: "movie_desc",
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    movieImg: {
      field: "movie_Img",
      type: DataTypes.STRING,
      allowNull: true
    },
    userReview: {
      field: "user_review",
      type: DataTypes.TEXT,
      allowNull: true
    },
    userRating: {
      field: "user_rating",
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    userName: {
      field: "username",
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Movie;
};
