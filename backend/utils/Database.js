import mongoose from 'mongoose';

// Singleton Design Pattern Implementation for Database Connection
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    Database.instance = this;
  }

  // Static method to get the single instance of the class
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(uri) {
    if (this.connection) {
      return this.connection;
    }
    try {
      this.connection = await mongoose.connect(uri);
      console.log('Connected to local MongoDB (Singleton Instance)');
      return this.connection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
}

export default Database;
