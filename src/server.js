const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());


const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


const dbPath = "./twitterClone.db";
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(5000, () =>
      console.log("Server running at http://localhost:5000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).send("Invalid JWT Token");
  const token = authHeader.split(" ")[1]; // Ensure "Bearer <token>" format
  if (!token) return res.status(401).send("Token missing");

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) return res.status(403).send("Invalid JWT  Token");
    req.user = user;  
    next();
  });
};


// API 1: Register User
app.post("/register/", async (req, res) => {
  const { username, password, name, gender } = req.body;
  const userExists = await db.get("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  if (userExists) return res.status(400).send("User already exists");
  if (password.length < 6) return res.status(400).send("Password is too short");

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.run(
    "INSERT INTO user (name, username, password, gender) VALUES (?, ?, ?, ?)",
    [name, username, hashedPassword, gender]
  );
  res.status(200).send("User created successfully");
});

// API 2: Login User
app.post("/login/", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.get("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  console.log(user);
  if (!user) return res.status(400).send("Invalid user");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).send("Invalid password");

  const token = jwt.sign({ user_id: user.user_id }, "SECRET_KEY");
  res.json({ jwtToken: token,name:user.name,username:user.username,gender:user.gender,userId:user.user_id });
});

// API 3: User's Tweet Feed
app.get("/user/tweets/feed/", authenticateToken, async (req, res) => {
  const { user_id } = req.user;
  const tweets = await db.all(
    `
    SELECT user.username, tweet.tweet, tweet.date_time as dateTime ,tweet.tweet_id as tweetId
    FROM tweet 
    JOIN follower ON tweet.user_id = follower.following_user_id
    JOIN user ON tweet.user_id = user.user_id
    WHERE follower.follower_user_id = ?
    ORDER BY tweet.date_time DESC
    LIMIT 4
  `,
    [user_id]
  );
  res.json(tweets);
});

// API 4: Get Following List
app.get("/user/following/", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;
    
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const followingList = await db.all(
      `
      SELECT user.user_id, user.name ,user.username
      FROM user 
      JOIN follower ON user.user_id = follower.following_user_id
      WHERE follower.follower_user_id = ?
      `,
      [user_id]
    );

    res.json(followingList);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// API 5: Get Followers List
app.get("/user/followers/", authenticateToken, async (req, res) => {
  const { user_id } = req.user;
  const followersList = await db.all(
    `
    SELECT user.name ,user.username
    FROM user 
    JOIN follower ON user.user_id = follower.follower_user_id
    WHERE follower.following_user_id = ?
  `,
    [user_id]
  );
  res.json(followersList);
});

// API 6: Get Tweet Details
app.get("/tweets/:tweetId/", authenticateToken, async (req, res) => {
  const { user_id } = req.user;
  const { tweetId } = req.params;

  const tweet = await db.get(
    `
    SELECT tweet, 
      (SELECT COUNT(*) FROM like WHERE tweet_id = tweet.tweet_id) AS likes, 
      (SELECT COUNT(*) FROM reply WHERE tweet_id = tweet.tweet_id) AS replies, 
      date_time as dateTime
    FROM tweet 
    WHERE tweet_id = ? AND user_id IN (
      SELECT following_user_id FROM follower WHERE follower_user_id = ?
    )
  `,
    [tweetId, user_id]
  );

  if (!tweet) return res.status(401).send("Invalid Request");
  res.json(tweet);
});

// API 7: Get Likes for a Tweet
app.get("/tweets/:tweetId/likes/", authenticateToken, async (req, res) => {
  const { user_id } = req.user;
  const { tweetId } = req.params;

  const likedUsers = await db.all(
    `
    SELECT user.username FROM like 
    JOIN user ON like.user_id = user.user_id
    WHERE like.tweet_id = ?
  `,
    [tweetId]
  );

  if (likedUsers.length === 0) return res.status(401).send("Invalid Request");
  res.json({ likes: likedUsers.map((u) => u.username) });
});

// API 8: Get Replies for a Tweet
app.get("/tweets/:tweetId/replies/", authenticateToken, async (req, res) => {
  const { user_id } = req.user;
  const { tweetId } = req.params;

  const replies = await db.all(
    `
    SELECT user.name, reply.reply FROM reply 
    JOIN user ON reply.user_id = user.user_id
    WHERE reply.tweet_id = ?
  `,
    [tweetId]
  );

  if (replies.length === 0) return res.status(401).send("Invalid Request");
  res.json({ replies });
});

// API 9: Get User's Tweets
app.get("/user/tweets/", authenticateToken, async (req, res) => {
  const { user_id } = req.user;
  const tweets = await db.all(
    `
    SELECT tweet, 
      (SELECT COUNT(*) FROM like WHERE tweet_id = tweet.tweet_id) AS likes, 
      (SELECT COUNT(*) FROM reply WHERE tweet_id = tweet.tweet_id) AS replies, 
      date_time as dateTime
    FROM tweet WHERE user_id = ?
  `,
    [user_id]
  );
  res.json(tweets);
});

// API 10: Create a Tweet
app.post("/user/tweets/", authenticateToken, async (req, res) => {
  const { user_id } = req.user;
  const { tweet } = req.body;
  await db.run(
    "INSERT INTO tweet (tweet, user_id, date_time) VALUES (?, ?, CURRENT_TIMESTAMP)",
    [tweet, user_id]
  );
  res.send("Created a Tweet");
});

// DELETE Tweet API
app.delete(
  "/tweets/:tweetId/",
  authenticateToken,
  async (request, response) => {
    const { tweetId } = request.params;
    const { userId } = request;

    // Check if the tweet exists
    const tweetQuery = `SELECT * FROM tweet WHERE tweet_id = ?`;
    const tweet = await db.get(tweetQuery, [tweetId]);
    if (!tweet) {
      return response.status(400).send("Invalid Request");
    }

    // Check if the logged-in user is the owner of the tweet
    if (tweet.user_id !== userId) {
      return response.status(401).send("Invalid Request");
    }

    // Delete the tweet
    const deleteQuery = `DELETE FROM tweet WHERE tweet_id = ?`;
    await db.run(deleteQuery, [tweetId]);

    response.send("Tweet Removed");
  }
);

//search for a user
app.get("/user/search", authenticateToken, async (req, res) => {
  const { username } = req.query; // Use query parameter instead of params

  try {
    const tweets = await db.all(
      `
      SELECT username FROM user 
      WHERE username LIKE ?
      `,
      [`${username}%`] // Ensure the query is properly formatted
    );

    res.json(tweets);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get profile details
app.get("/profile/:username", authenticateToken, async (req, res) => {
  const { username } = req.params;
  const loggedInUser = req.user.user_id;

  try {
    // Get the user profile details
    const userWithoutFollowStatus = await db.get(
      `SELECT user_id, name, username, gender FROM user WHERE username = ?`,
      [username] // Parameterized query to prevent SQL injection
    );

    // If user doesn't exist, return a 404 error
    if (!userWithoutFollowStatus) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the logged-in user is following the profile user
    const followingStatus = await db.get(
      `SELECT 1 FROM follower WHERE follower_user_id = ? AND following_user_id = ?`,
      [loggedInUser, userWithoutFollowStatus.user_id]
    );

    // Fetch user's tweets (Ensure multiple tweets can be fetched)
    const tweets = await db.all(`SELECT * FROM Tweet WHERE user_id = ?`, [userWithoutFollowStatus.user_id]);

    // Construct the final response
    const user = {
      ...userWithoutFollowStatus,
      followingStatus: !!followingStatus, // Convert to boolean
      tweets, // Include fetched tweets
    };
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//follow a user
app.post("/follow/:username", authenticateToken, async (req, res) => {
  const { username } = req.params; // Target user to follow
  const loggedInUser = req.user.user_id; // Extracted from JWT (logged-in user's ID)
  
  try {
    // Get the user ID of the target username
    const followId = await db.get("SELECT user_id FROM user WHERE username = ?", [username]);
    
    // Check if the target user exists
    if (!followId) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const FId = followId.user_id;
    //console.log("Logged in user ID:", loggedInUser, "Target user ID:", FId);
    
    // Ensure the user cannot follow themselves
    if (loggedInUser === FId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if already following the target user
    const checkFollow = await db.get(
      "SELECT * FROM follower WHERE follower_user_id = ? AND following_user_id = ?",
      [loggedInUser, FId]
    );

    if (checkFollow) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Insert follow relationship into the Follower Table
    await db.run(
      "INSERT INTO follower (follower_user_id, following_user_id) VALUES (?, ?)",
      [loggedInUser, FId]
    );

    res.json({ message: `You are now following ${username}` });
  } catch (error) {
    //console.error("Follow Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//unfollow a user
app.post("/unfollow/:username", authenticateToken, async (req, res) => {
  const { username } = req.params; // Target user to follow
  const loggedInUser = req.user.user_id; // Extracted from JWT (logged-in user's ID)
  
  try {
    // Get the user ID of the target username
    const followId = await db.get("SELECT user_id FROM user WHERE username = ?", [username]);
    
    // Check if the target user exists
    if (!followId) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const FId = followId.user_id;
    //console.log("Logged in user ID:", loggedInUser, "Target user ID:", FId);
    
    // Ensure the user cannot follow themselves
    if (loggedInUser === FId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if already following the target user
    const checkFollow = await db.get(
      "SELECT * FROM follower WHERE follower_user_id = ? AND following_user_id = ?",
      [loggedInUser, FId]
    );

    if ( !checkFollow) {
      return res.status(400).json({ message: "Already Unfollowing this user" });
    }

    // Insert follow relationship into the Follower Table
    await db.run(
      "DELETE from  follower where follower_user_id= ? and following_user_id=? ;",
      [loggedInUser, FId]
    );

    res.json({ message: `You are now unfollowing ${username}` });
  } catch (error) {
    //console.error("Follow Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = app;
