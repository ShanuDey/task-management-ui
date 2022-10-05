import Api from "./api";

class User extends Api {
  async createUser(jsonData) {
    try {
      const response = await fetch(this.baseUrl + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error("Something went wrong !!");
    }
  }

  async loginUser(jsonData) {
    try {
      const response = await fetch(this.baseUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong !!" + err);
    }
  }
}

export default new User();
