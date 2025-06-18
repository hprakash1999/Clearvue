import { mergeTypeDefs } from "@graphql-tools/merge";

import { authTypeDefs } from "./schemas/auth.schema.js";

export const typeDefs = mergeTypeDefs([authTypeDefs]);
