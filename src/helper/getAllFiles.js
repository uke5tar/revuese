export default (context) => {
  const req = context;
  const fileNames = req.keys().map((key) => {
    const name = key.match(/\w+/)[0];
    return name.toLowerCase();
  });

  return fileNames;
};
