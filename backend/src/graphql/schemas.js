import { mergeTypeDefs } from "@graphql-tools/merge";

// Schemas
import { authTypeDefs } from "./schemas/auth.schema.js";

/**
 * @module graphql/typeDefs
 * Merges all modular GraphQL type definitions into a single schema.
 *
 * Uses `@graphql-tools/merge` for combining SDL strings or ASTs.
 */

// Merging all schema definitions into one schema
export const typeDefs = mergeTypeDefs([authTypeDefs]);
