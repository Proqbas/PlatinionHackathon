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
        console.log(response);

        resolve(response.data);
      })
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
        console.log(response);

        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

const getTasks = () => {
  let tasks = [
    { id: 1, name: "Update of Financials" },
    { id: 2, name: "Update Business Plan" },
  ];
  return new Promise((resolve, reject) => {
    resolve(tasks);
  });
  // return new Promise((resolve, reject) => {
  //   axiosInstance
  //     .get("/task")
  //     .then((response) => {
  //       console.log(response)

  //       resolve(response.data)})
  //     .catch((error) => reject(error));
  // });
};

const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/task/${id}`)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

const getMember = (id) => {
  // return new Promise((resolve, reject) => {
  //   axiosInstance
  //   .get(`/member/${id}`)
  //   .then((response) => resolve(response.data))
  //   .catch((error) => reject(error))
  // })

  let member = { id: 1, name: "Peter" };

  return new Promise((resolve, reject) => {
    resolve(member);
  });
};

const getSkill = (id) => {
  let skill = { id: 1, name: "JAVA" };

  return new Promise((resolve, reject) => {
    resolve(skill);
  });
};
const getTask = (id) => {
  let task = { id: 1, name: "qweqweqwe" };

  return new Promise((resolve, reject) => {
    resolve(task);
  });
};

module.exports = {
  getSkills,
  getMembers,
  getTasks,
  getTask,
  deleteTask,
  getMember,
  getSkill,
};
