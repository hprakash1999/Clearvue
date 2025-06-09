import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { getUserFromToken } from "./utils/auth";

const app: Application = express();

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await apolloServer.start();
  app.use(
    "/graphql",
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const token =
          req.cookies?.accessToken ||
          req.header("Authorization")?.replace("Bearer ", "");

        const user = await getUserFromToken(token);

        return { req, res, user };
      },
    })
  );
})();

export { app };
