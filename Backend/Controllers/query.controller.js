const querySchema = require("../Models/query.model");
const studentSchema = require("../Models/student.model");
const facultySchema = require("../Models/faculty.model");
const message = require("../utils/message.json");
const enums = require("../utils/enums.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
  askMentor: async (req, res) => {
    const { question, sid } = await req.body;
    try {
      const student = await studentSchema.findOne({ id: sid });
      const faculty = await facultySchema.findOne({ _id: student.facultyId });

      let totalqueryOfFaculty = parseInt(faculty.total_query);
      let remainingquery = parseInt(faculty.remaining_query);
      totalqueryOfFaculty += 1;
      remainingquery += 1;

      let totalquery = parseInt(student.total_query);
      totalquery += 1;

      const que = {
        query: question,
        querybystudent: student._id,
        facultyId: student.facultyId,
      };

      const querydata = await querySchema.create(que);
      const studentdata = await studentSchema.updateOne(
        { id: sid },
        { $set: { total_query: totalquery } }
      );
      const facultydata = await facultySchema.updateOne(
        { id: faculty.id },
        {
          $set: {
            total_query: totalqueryOfFaculty,
            remaining_query: remainingquery,
          },
        }
      );

      if (querydata && studentdata && facultydata) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: message.QUERY_SUCCESS });
      } else {
        return res
          .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: message.FAILED });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },

  solveQuery: async (req, res) => {
    const { qid, fid, solution } = req.body;

    const data = await querySchema.updateOne(
      { _id: qid },
      { $set: { solution: solution, solvebyfaculty: fid, status: "Solved" } }
    );

    if (data) {
      return res
        .status(enums.HTTP_CODE.OK)
        .json({ success: true, message: message.QUERY_SOLVED });
    } else {
      return res
        .status(enums.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: message.FAILED });
    }
  },

  displayQueryToFaculty: async (req, res) => {
    const { fid } = await req.body;
    try {
      const faculty = await facultySchema.findOne({ id: fid });
      const query = await querySchema.find({ facultyId: faculty._id });

      if (query.length == 0) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.QUERY_NOT_FOUND });
      } else {
        const queriesWithStudents = await Promise.all(
          query.map(async (query) => {
            const studentdata = await studentSchema.findOne({
              _id: query.querybystudent,
            });
            const queryWithStudent = { ...query.toObject(), student };

            if (query.sharetofaculty) {
              const facultydata = await facultySchema.findOne({
                _id: query.sharetofaculty,
              });
              const faculty = {
                id: facultydata.id,
                name: facultydata.name,
                email: facultydata.email,
              };
              const queryWithStudent = { ...query.toObject(), faculty };
            }

            return queryWithStudent;
          })
        );
        return res.status(enums.HTTP_CODE.OK).json({
          success: true,
          message: message.QUERY_FOUND,
          query: queriesWithStudents,
        });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },

  changeMode: async (req, res) => {
    const { qid, mode } = await req.body;
    try {
      const query = await querySchema.findOne({ _id: qid });
      if (!query) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.QUERY_NOT_FOUND });
      } else {
        const querydata = await querySchema.updateOne(
          { _id: qid },
          { $set: { mode: mode } }
        );
        if (querydata) {
          return res
            .status(enums.HTTP_CODE.OK)
            .json({ success: true, message: message.MODE_CHANGED });
        } else {
          return res
            .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: message.FAILED });
        }
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },

  publicQuery: async (req, res) => {
    try {
      const query = await querySchema.find({ mode: "public" });
      if (query.length == 0) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.NO_QUERY_FOUND });
      } else {
        const queriesWithStudents = await Promise.all(
          query.map(async (query) => {
            const studentdata = await studentSchema.findOne({
              _id: query.querybystudent,
            });
            const student = {
              id: studentdata.id,
              name: studentdata.name,
              email: studentdata.email,
              batch: studentdata.batch,
            };
            const queryWithStudent = { ...query.toObject(), student };

            if (query.status === "Solved") {
              const facultydata = await facultySchema.findOne({
                _id: query.facultyId,
              });
              const faculty = {
                id: facultydata.id,
                name: facultydata.name,
                email: facultydata.email,
              };
              const queryWithStudent = { ...query.toObject(), faculty };
            }

            return queryWithStudent;
          })
        );
        return res.status(enums.HTTP_CODE.OK).json({
          success: true,
          message: message.QUERY_FOUND,
          query: queriesWithStudents,
        });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },
  displayQueryByStatusForFaculty: async (req, res) => {
    const { fid, status } = await req.body;
    try {
      const faculty = await facultySchema.findOne({ id: fid });
      const query = await querySchema.find({
        facultyId: faculty._id,
        status: status,
      });
      if (query.length == 0) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.NO_QUERY_FOUND });
      } else {
        const queriesWithStudents = await Promise.all(
          query.map(async (query) => {
            const studentdata = await studentSchema.findOne({
              _id: query.querybystudent,
            });
            const student = {
              id: studentdata.id,
              name: studentdata.name,
              email: studentdata.email,
              sem: studentdata.sem,
              total_query: studentdata.total_query,
            };
            const queryWithStudent = { ...query.toObject(), student };

            return queryWithStudent;
          })
        );
        return res.status(enums.HTTP_CODE.OK).json({
          success: true,
          message: message.QUERY_FOUND,
          query: queriesWithStudents,
        });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },
  displayQueryBySatusForStudent: async (req, res) => {
    const { sid, status } = await req.body;
    try {
      const student = await studentSchema.findOne({ id: sid });
      const queries = await querySchema.find({
        querybystudent: student._id,
        status: status,
      });

      if (queries.length == 0) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.QUERY_NOT_FOUND });
      }

      const queriesWithFaculty = await Promise.all(
        queries.map(async (query) => {
          if (query.status === "Solved") {
            const facultydata = await facultySchema.findOne({
              _id: query.facultyId,
            });
            const faculty = {
              id: facultydata.id,
              name: facultydata.name,
              email: facultydata.email,
            };
            const queryWithFaculty = { ...query.toObject(), faculty };

            return queryWithFaculty;
          }
        })
      );

      return res
        .status(enums.HTTP_CODE.OK)
        .json({
          success: true,
          message: message.QUERY_FOUND,
          query: queriesWithFaculty,
        });
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },
  shareQueryToFaculty: async (req, res) => {
    const { qid, fid } = await req.body;
    try {
      const faculty = await facultySchema.findOne({ id: fid });
      const querydata = await querySchema.findOne({ _id: qid }); 

      if(querydata.status === "Solved")
      {
        return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({success : false, message : message.QUERY_ALREADY_SOLVED})
      }
      if (querydata.sharetofaculty) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.QUERY_ALREADY_SHARED });
      }
      const totalQuery = parseInt(faculty.total_query);
      const remaingQuery = parseInt(faculty.remaining_query);

      const data = await querySchema.updateOne({id: fid },{$set : {total_query : totalQuery + 1, remaining_query : remaingQuery + 1}})
      const query = await querySchema.updateOne(
        { _id: qid },
        { $set: { sharetofaculty: faculty._id } }
      );
      if (query && data) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: message.QUERY_SHARED });
      } else {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.FAILED });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },

  displaySharedQueryToOtherFaculty: async (req, res) => {
    const { fid } = await req.body;
    try {
      const faculty = await facultySchema.findOne({ id: fid });
      const query = await querySchema.find({ sharetofaculty: faculty._id });
      if (query.length == 0) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.NO_QUERY_FOUND });
      } else {
        const queriesWithStudents = await Promise.all(
          query.map(async (query) => {
            const studentdata = await studentSchema.findOne({
              _id: query.querybystudent,
            });
            const student = {
              id: studentdata.id,
              name: studentdata.name,
              email: studentdata.email,
              batch: studentdata.batch,
            };
            const facultydata = await facultySchema.findOne({
              _id: query.facultyId,
            });
            const faculty = {
              id: facultydata.id,
              name: facultydata.name,
              email: facultydata.email,
            };
            const queryWithStudent = { ...query.toObject(), student, faculty };

            return queryWithStudent;
          })
        );
        return res
          .status(enums.HTTP_CODE.OK)
          .json({
            success: true,
            message: message.QUERY_FOUND,
            query: queriesWithStudents,
          });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },

  removeSharedQuery: async (req, res) => {
    const { qid, fid } = await req.body;
    try {
      const facultydata = await facultySchema.findOne({ id: fid });
      const query = await querySchema.findOne({ _id: qid });
      const querydata = await querySchema.findOne({ _id: qid , facultyId : facultydata._id});
      // console.log(query.facultyId);
      // console.log(facultydata._id);
      // console.log(querydata);-
      // console.log(query.facultyId == facultydata._id);
      if(!querydata)
      {
        return res
        .status(enums.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: message.NOT_AUTHORIZED });
      }
      if (!query.sharetofaculty) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.QUERY_NOT_SHARED });
      }

      const faculty = await facultySchema.findOne({ _id: query.sharetofaculty});
      const remaingQuery = parseInt(faculty.remaining_query);
      const totalQuery = parseInt(faculty.total_query);

      const data = await facultySchema.updateOne({ id: faculty.id }, {$set : {remaining_query : remaingQuery - 1, total_query : totalQuery - 1}});

      const update = await querySchema.updateOne({_id : qid},{$set : {sharetofaculty : null}})

      if(update && data)
      {
        return res
                .status(enums.HTTP_CODE.OK)
                .json({success : true, message : message.QUERY_REMOVED})
      }else{
        return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({success : false, message : message.FAILED})
      }


    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },

  displaySharedQueryForFaculty : async (req,res) => {
    const {fid} = req.body;
    try {
      const faculty = await facultySchema.findOne({id : fid});
      const query = await querySchema.find({sharetofaculty : faculty._id});

      if(query.length == 0)
      {
        return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({success : true, message : message.NO_QUERY_FOUND})
      }
      const queriesWithStudents = await Promise.all(
        query.map(async (query) => {
          const studentdata = await studentSchema.findOne({
            _id: query.querybystudent,
          });
          const student = {
            id: studentdata.id,
            name: studentdata.name,
            email: studentdata.email,
            batch: studentdata.batch,
          };
          const facultydata = await facultySchema.findOne({
            _id: query.facultyId,
          });
          const faculty = {
            id: facultydata.id,
            name: facultydata.name,
            email: facultydata.email,
          };
          const queryWithStudent = { ...query.toObject(), student, faculty};

          return queryWithStudent;
        })
      );

      return res
              .status(enums.HTTP_CODE.OK)
              .json({success : true, message : message.QUERY_FOUND, query : queriesWithStudents})
  }catch(err){
    return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
  }
},
solveSharedQuery : async (req,res) => {
  const { fid , qid , solution} = req.body;
  try{
    const faculty = await facultySchema.findOne({id :fid});
    if(!faculty) {
      return res
              .status(enums.HTTP_CODE.BAD_REQUEST)
              .json({success : false, message : message.FACULTY_NOT_EXIST})
    }
    const query = await querySchema.findOne({_id : qid, sharetofaculty : faculty._id});
    if(!query)
    {
      return res
              .status(enums.HTTP_CODE.BAD_REQUEST)
              .json({success : false, message : message.NOT_ALLOW_TO_ANS})
    }
    const querydata = await querySchema.updateOne({_id : qid},{$set : {solution : solution, status : "Solved", solvebyfaculty : faculty._id}});

    const remaingQuery = parseInt(faculty.remaining_query);
    const solveQuery = parseInt(faculty.solve_query);

    const facultydata = await facultySchema.updateOne({id : faculty.id},{$set : {remaining_query : remaingQuery - 1, solve_query : solveQuery + 1}});

    if(querydata && facultydata)
    {
      return res
              .status(enums.HTTP_CODE.OK)
              .json({success : true, message : message.QUERY_SOLVED})
    }else{
      return res
              .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
              .json({success : false, message : message.FAILED})
    }
    
  } catch(error){
    return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
  }
}

};
