import colors from "picocolors";

export const { green, cyan, white, yellow, bold } = colors;

export const print = (msg) => {
  console.info(
    [
      yellow("====================================================="),
      msg,
      yellow("====================================================="),
      "\n",
    ].join("\n")
  );
};
