import * as React from "react";
import { useController } from "@oversee/core";
import { UserController } from "./controllers/UserController";
import { useEffect } from "react";
import { Fullname } from "./components/Fullname";
import { useAsyncWatch } from "@oversee/core/src";

const userPlaceholder = {
  gender: "",
  name: {
    title: "",
    first: "",
    last: "",
  },
  location: {
    street: {
      number: 0,
      name: "",
    },
    city: "",
    state: "",
    country: "",
    postcode: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
    timezone: {
      offset: "",
      description: "",
    },
  },
  email: "",
  login: {
    uuid: "",
    username: "",
    password: "",
    salt: "",
    md5: "",
    sha1: "",
    sha256: "",
  },
  dob: {
    date: "",
    age: 0,
  },
  registered: {
    date: "",
    age: 0,
  },
  phone: "",
  cell: "",
  id: {
    name: "",
    value: "",
  },
  picture: {
    large: "",
    medium: "",
    thumbnail: "",
  },
  nat: "",
};

export const App = () => {
  const controller = useController(UserController);
  const {
    loading,
    result: user,
    error,
  } = useAsyncWatch(UserController, "getRandomUser", userPlaceholder);

  const onClick = () => {
    controller.getRandomUser();
  };

  useEffect(() => {
    controller.getRandomUser();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={user.picture.large} alt={"avatar"} />
          <Fullname {...user.name} />
        </div>
      )}
      <button onClick={onClick}>get new</button>
    </div>
  );
};
