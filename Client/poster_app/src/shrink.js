const nameCutter = (name) => {
  let result = "";

  for (let x = name.length - 1; x >= 0; x--) {
    if (name[x] === " ") {
      result = x;
      break;
    }
  }

  return name.slice(0, result);
};

export default nameCutter;
