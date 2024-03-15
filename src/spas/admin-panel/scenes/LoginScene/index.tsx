import React, { memo } from "react";
import { useLoginScene } from "./index.hooks";

type LoginSceneProps = {};

export const LoginScene = memo(({}: LoginSceneProps) => {
  const {} = useLoginScene();

  return <div />;
});

LoginScene.displayName = "LoginScene";
