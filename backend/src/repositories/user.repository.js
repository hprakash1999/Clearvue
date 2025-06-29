import { User } from "../models/user.model.js";

/**
 * @module repositories/user
 * Repository for user operations in the database
 *
 * Includes:
 * - insert: Create a new user entry in the database
 * - update: Update a user entry in the database
 * - findByEmail: Find a user entry by email
 * - findByEmailOrPhone: Find a user entry by email or phone
 * - findByID: Find a user entry by id
 * - findAll: Find all users
 * - delete: Delete a user entry by id
 */
export class UserRepo {
  constructor(model = User) {
    this.model = model;
  }

  // Create a new user entry in DB
  async insert(user) {
    return await this.model.create(user);
  }

  async update(id, updateData) {
    return this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Find a user entry by email
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  // Find a user by email or phone
  async findByEmailOrPhone(email, phone) {
    return await this.model.findOne({ $or: [{ email }, { phone }] });
  }

  // Find a user entry by id
  async findByID(id) {
    return await this.model.findById(id);
  }

  // Find all users
  async findAll() {
    return await this.model.find();
  }

  // Delete a user entry by id
  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export const userRepo = new UserRepo(); // User repository instance
