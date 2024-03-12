export const getBooks = (req, res) => {
  res.status(200).json({
    message: "tout va bien",
    books: [
      {
        id: 23,
        title: "Harry potter",
      },
      {
        id: 4567,
        title: "Oui-Oui à la plage",
      },
    ],
  });
};
