import React from "react";
import { useQuery } from "react-query";
import Post from "./Post";

const Query = () => {
  const { isLoading, error, data } = useQuery(
    "repoData",
    () =>
      fetch("/data").then(
        (res) => {
          //   console.log("res", res);
          return res.json();
        }
        // {
        //   params: {
        //     id: id,
        //   },
        // }
      )
    //   ,{
    //   staleTime: 5000,
    //   cacheTime: 300000,
    //   //   enabled: !!id
    // }
  );

  //   console.log("isLoading", isLoading);
  //   console.log("error", error);
  //   console.log("data", data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Post />
      {data.map((data) => {
        return (
          <div key={data}>
            {data}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Query;
