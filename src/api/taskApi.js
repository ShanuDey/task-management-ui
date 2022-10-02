class TaskApi {
  async createTask(tokenHeader, jsonData) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/task/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": tokenHeader,
          },
          body: JSON.stringify(jsonData),
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error("Something went wrong !!");
    }
  }
}

export default new TaskApi();
