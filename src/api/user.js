class User {
  async createUser(jsonData) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

export default new User();
