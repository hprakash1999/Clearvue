import { mergeResolvers } from "@graphql-tools/merge";

import { authResolvers } from "./resolvers/auth.resolver.js";

export const resolvers = mergeResolvers([authResolvers]);
