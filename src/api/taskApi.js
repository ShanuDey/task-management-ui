import Api from "./api";

class TaskApi extends Api {
  baseUrl = this.baseUrl + "/task";

  async createTask(tokenHeader, jsonData) {
    try {
      const response = await fetch(this.baseUrl + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": tokenHeader,
        },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error("Something went wrong !!");
    }
  }

  async updateTask(tokenHeader, taskID, jsonData) {
    try {
      const response = await fetch(this.baseUrl + `/${taskID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": tokenHeader,
        },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error("Something went wrong !!");
    }
  }

  async getTasks(tokenHeader) {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": tokenHeader,
        },
      });
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error("Something went wrong !!");
    }
  }

  async deleteTask(tokenHeader, taskID) {
    try {
      const response = await fetch(this.baseUrl + `/${taskID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": tokenHeader,
        },
      });
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error("Something went wrong !!");
    }
  }
}

export default new TaskApi();
