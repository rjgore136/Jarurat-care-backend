export const apiRouteInfo = async (req, res) => {
  res.status(200).json({
    message:
      "Welcome to the Jarurat Care API! Below are the available endpoints:",
    endpoints: [
      {
        method: "POST",
        route: "/api/resources/create",
        description: "Create a new resource in the database.",
      },
      {
        method: "GET",
        route: "/api/resources/all",
        description: "Get all resources from the database.",
      },
      {
        method: "GET",
        route: "/api/resources/byId/:id",
        description: "Get a resource by its unique ID.",
      },
      {
        method: "PUT",
        route: "/api/resources/update/:id",
        description: "Update a resource by its ID.",
      },
      {
        method: "DELETE",
        route: "/api/resources/delete/:id",
        description: "Delete a resource by its ID.",
      },
      {
        method: "POST",
        route: "/api/auth/register",
        description: "Register a new user.",
      },
      {
        method: "POST",
        route: "/api/auth/login",
        description: "Login to get a JWT token.",
      },
    ],
  });
};
