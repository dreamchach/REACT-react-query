import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const Post = () => {
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();

  const preOnClick = useMutation(
    (value) => {
      return axios.post("/data", value);
    },
    {
      onSuccess: () => {
        console.log("onSuccess");
        queryClient.invalidateQueries("repoData");
        // queryClient.setQueryData("repoData", (data) => {
        //   console.log(data);
        //   // const curPersons = data
        // });
      },
      onError: (error) => {
        console.log("onError");
      },
      onSettled: () => {
        console.log("onSettled");
      },
    }
  );

  const onClick = () => {
    preOnClick.mutate(value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          // console.log(event.target.value);
          setValue(event.target.value);
        }}
      />
      <button type="button" onClick={onClick}>
        데이터 추가
      </button>
    </div>
  );
};

export default Post;
