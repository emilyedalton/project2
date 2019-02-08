module.exports = function(sequelize, DataTypes) {
  const Movie = sequelize.define("Movie", {
    //movieTitle will be the property name
    movieTitle: {
      field: "movie_title",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    movieLink: {
      field: "movie_link",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    movieDesc: {
      field: "movie_desc",
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    movieImg: {
      field: "movie_Img",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    userReview: {
      field: "user_review",
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    userRating: {
      field: "user_rating",
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    userName: {
      field: "username",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Movie;
};
