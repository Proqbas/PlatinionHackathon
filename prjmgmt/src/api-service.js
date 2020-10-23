const axios = require("axios");

let axiosInstance = axios.create({
  headers: { "x-api-key": "" },
});

const getSkills = () => {
  // let skills = [
  //   { id: 1, name: "Java" },
  //   { id: 2, name: "Python" },
  //   { id: 3, name: "Social Network Analysis" },
  // ];

  // return new Promise((resolve, reject) => {
  //   resolve(skills);
  // });

  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/skill")
      .then((response) => {
        console.log(response)
        
        resolve(response.data)})
      .catch((error) => reject(error));
  });
};

const getMembers = () => {
  // let members = [
  //   { id: 1, name: "Peter" },
  //   { id: 2, name: "Captain" },
  // ];

  // return new Promise((resolve, reject) => {
  //   resolve(members);
  // });
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/members")
      .then((response) => {
        console.log(response)
        
        resolve(response.data)})
      .catch((error) => reject(error));
  });
};

const getTasks = () => {
  // let tasks = [
  //   { id: 1, desc: "Update of Financials" },
  //   { id: 2, desc: "Update Business Plan" },
  // ];
  // return new Promise((resolve, reject) => {
  //   resolve(tasks);
  // });
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/task")
      .then((response) => {
        console.log(response)
        
        resolve(response.data)})
      .catch((error) => reject(error));
  });
};

const getMember = (id) => {
  return;
};

const getSkill = (id) => {
  return;
};
const getTask = (id) => {
  return;
};

module.exports = {
  getSkills,
  getMembers,
  getTasks,
  getTask,
  getMember,
  getSkill,
};
