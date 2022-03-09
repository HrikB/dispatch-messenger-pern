import { Action } from "@reduxjs/toolkit";
import { ObjectType } from "type-graphql";

export default (action: Action) => {
  const socketActionTemplate = {
    type: "",
  };

  return {
    SOCKET_ACTION: Object.assign({}, socketActionTemplate, action),
  };
};
