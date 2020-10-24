const axios = require("axios");

let axiosInstance = axios.create({
  headers: { "x-api-key": "" },
});

const getTasks = () => {
  // let tasks = [
  //   { id: 1, name: "Update of Financials" },
  //   { id: 2, name: "Update Business Plan" },
  // ];
  // return new Promise((resolve, reject) => {
  //   resolve(tasks);
  // });
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/tasks")
      .then((response) => {
        console.log(response)

        resolve(response.data)})
      .catch((error) => reject(error));
  });
};

const getTask = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
    .get(`/tasks/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error))
  })

  // let tasks = { id: 1, name: "qweqweqwe" };
  // return new Promise((resolve, reject) => {
  //   resolve(tasks);
  // });
};


const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/tasks/${id}`)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};


const assignMembers = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
    .delete(`/tasks/${id}/recommend`)
    .then(() => resolve())
    .catch((error) => reject(error))
  })
}

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
      .get("/skills")
      .then((response) => {
        console.log(response);

        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

const getSkill = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
    .get(`/skills/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error))
  })

  // let skill = { id: 1, name: "JAVA" };

  // return new Promise((resolve, reject) => {
  //   resolve(skill);
  // });
};

const deleteSkill = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/skills/${id}`)
      .then(() => resolve())
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

const getMember = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
    .get(`/members/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error))
  })

  // let member = { id: 1, name: "Peter" };

  // return new Promise((resolve, reject) => {
  //   resolve(member);
  // });
};

const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/members/${id}`)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};


module.exports = {
  getTasks,
  getTask,
  deleteTask,
  assignMembers,
  getSkills,
  getSkill,
  deleteSkill,
  getMembers,
  getMember,
  deleteMember
};
