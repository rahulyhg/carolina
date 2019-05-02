
class BaseFileDriver {
  
  constructor() {
    
  }
  
  /**
   * Configures this driver base on a configuration object.
   */
  configure(obj, name) {
    this.name = name;
  }
  
  getPublicUrl() {}
  
  getFullPath() {}
  
  /**
   * Returns true if the given file exists.
   * If throwError is true, FileNotFoundError is thrown if file does not exist.
   */
  async exists(filepath, throwError=false) {}
  /**
   * Returns a list of filepaths for all existing files according to this driver.
   */
  async listFiles(filepath) {}
  /**
   * Returns the bytes of the file.
   */
  async readFile(filepath) {}
  /**
   * Returns true after adding the data to the end of the existing file.
   * Throws an error if the file does not exist.
   */
  async appendToFile(filepath, data) {}
  /**
   * Returns true after writing the data to the file.
   * Throws an error if the file already exists.
   */
  async writeFile(filepath, data) {}
  /**
   * Returns true after writing the data to the file.
   * Will overwrite the file if it exists.
   */
  async overwriteFile(filepath, data) {}
  /**
   * Returns true after deleting the existing file.
   * Returns false if the file does not exist.
   * Throws an error if the file cannot be deleted but exists.
   */
  async deleteFile(filepath, data) {}
}

exports = module.exports = BaseFileDriver;