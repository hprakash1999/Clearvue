import { mergeResolvers } from "@graphql-tools/merge";

// Resolvers
import { authResolvers } from "./resolvers/auth.resolver.js";
import { userResolver } from "./resolvers/user.resolver.js";

/**
 * @module graphql/resolvers
 * Merges all resolver maps into a single root resolver object.
 *
 * Uses `@graphql-tools/merge` to combine resolver maps from different modules.
 */

// Combining all resolvers into one
export const resolvers = mergeResolvers([authResolvers, userResolver]);
