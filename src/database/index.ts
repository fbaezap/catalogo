const { MONGO_HOST, MONGO_DATABASE } = process.env;

export const dbConnection = {
  url: `mongodb+srv://${MONGO_HOST}/${MONGO_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
