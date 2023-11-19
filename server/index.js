import express from 'express';
import mongoose from 'mongoose';

import authApi from "./routes/authApi.js";
import postsApi from "./routes/postsApi.js";
import commentsApi from "./routes/commentsApi.js";

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb+srv://admin:publish@cluster0.vgbkfyy.mongodb.net/social-network?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.use('/api/auth', authApi);
app.use('/api/posts', postsApi);
app.use('/api/comments', commentsApi);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
