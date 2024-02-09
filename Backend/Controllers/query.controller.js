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

  solveQuery: async (req, res) => {},

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
            const student = await studentSchema.findOne({
              _id: query.querybystudent,
            });
            const queryWithStudent = { ...query.toObject(), student };

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
            const student = await studentSchema.findOne({
              _id: query.querybystudent,
            });
            const queryWithStudent = { ...query.toObject(), student };

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
    queryByStatusForFaculty : async (req, res) => {
        const { fid , status } = await req.body;
        try {
            const faculty = await facultySchema.findOne({ id : fid });
            const query = await querySchema.find({ facultyId : faculty._id , status : status });
            if(query.length == 0)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.NO_QUERY_FOUND})
            }
            else{
                const queriesWithStudents = await Promise.all(query.map(async (query) => {
                    const student = await studentSchema.findOne({ _id : query.querybystudent });
                    const queryWithStudent = { ...query.toObject() , student };

                    return queryWithStudent;
                }))
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true , message : message.QUERY_FOUND , query : queriesWithStudents})
            }
        } catch (err) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false , message : err.message})
        }
    }
};
