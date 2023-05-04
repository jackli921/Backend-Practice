const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/relationshipDB")
  .then(() => {
    console.log("MongoDB Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error!", err);
  });

const userSchema = new Schema({
  name: String,
  age: Number
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'}

});

// make a model

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);


// const makeTweets = async () =>{
//     // const user = await User.findOne({name: "Chickenfan99", age: 61})
//     // const tweet3 = new Tweet({text: "Yesyesyes!", likes:1313})
//     // tweet3.user = user;
//     // tweet3.save()
// }

// makeTweets()


const findTweet = async () =>{
    const t = await Tweet.find({}).populate('user')
    console.log(t)
}

findTweet()