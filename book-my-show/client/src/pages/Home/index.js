import React, { useEffect } from "react";
import { GetCurrentUser } from "../../api/users"; // ES modules are imported using the import keyword

function Home() {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetCurrentUser();
      console.log(response);
    };
    fetchUser();
  }, []);
  return <div>Home</div>;
}

export default Home;
