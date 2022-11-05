// todo
export const getUserName = (req, res) => {
  if (req?.session?.user?.name) {
    res.json(req.session.user.name);
  } else {
    res.json("");
  }
};
