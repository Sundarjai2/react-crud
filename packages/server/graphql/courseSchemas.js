// var GraphQLSchema = require('graphql').GraphQLSchema;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var GraphQLList = require('graphql').GraphQLList;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var GraphQLNonNull = require('graphql').GraphQLNonNull;
// var GraphQLID = require('graphql').GraphQLID;
// var GraphQLString = require('graphql').GraphQLString;
// var GraphQLInt = require('graphql').GraphQLInt;
// var GraphQLDate = require('graphql-date');
// var CourseModel = require('../models/Course');


// var CourseType = new GraphQLObjectType({
//   name: 'course',
//   fields: function () {
//     return {
//       _id: {
//         type: GraphQLString
//       },
//       name: {
//         type: GraphQLString
//       },
//       course: {
//         type: GraphQLString
//       }
//     }
//   }
// });




// var mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: function () {
//     return {
//       addCourse: {
//         type: courseType,
//         args: {
//           name: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           course: {
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve: function (root, params) {
//           const courseModel = new CourseModel(params);
//           const newCourse = courseModel.save();
//           if (!newCourse) {
//             throw new Error('Error');
//           }
//           return newCourse
//         }
//       },
//       updateCourse: {
//         type: courseType,
//         args: {
//           id: {
//             name: 'id',
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           name: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           course: {
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve(root, params) {
//           return StudentModel.findByIdAndUpdate(params.id, { name: params.name, course: params.course }, function (err) {
//             if (err) return next(err);
//           });
//         }
//       },
//       //   removeCourse: {
//       //     type: courseType,
//       //     args: {
//       //       id: {
//       //         type: new GraphQLNonNull(GraphQLString)
//       //       }
//       //     },
//       //     resolve(root, params) {
//       //       const delStudent = StudentModel.findByIdAndRemove(params.id).exec();
//       //       if (!delStudent) {
//       //         throw new Error('Error')
//       //       }
//       //       return delStudent;
//       //     }
//       //   }
//     }
//   }
// });

// module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });