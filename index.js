// /**
//  *
//  * fs module - provides a way to work with the file system
//  * fs module is a core module that comes with Node.js
//  */

// const fs = require("fs");

// // fs.readFile("file.txt", "utf8", (err, data) => {
// //   // callback follows an error first callback pattern
// //   if (err) {
// //     console.log(err);
// //     return;
// //   } else {
// //     console.log(data);
// //   }
// // });

// // const content = "Hello World";
// // fs.writeFile("example.txt", content, "utf8", (err) => {
// //   if (err) {
// //     console.log(err);
// //     return;
// //   }
// //   console.log("File written successfully");
// // });

// // fs.rename("./example.txt", "new-example.txt", (err) => {
// //   if (err) {
// //     console.log(err);
// //     return;
// //   }
// //   console.log("File renamed successfully");
// // });

// // fs.stat("my-dir", (err, stats) => {
// //   if (err) {
// //     console.log(err);
// //     return;
// //   } else {
// //     console.log(stats.size);
// //     console.log(stats.isDirectory());
// //   }
// // });

// const directoryName = "my-directory";
// // fs.mkdir(directoryName, (err) => {
// //   if (err) {
// //     console.log("Errior", err);
// //     return;
// //   }
// //   console.log("Directory created successfully");
// // });

// // fs.rmdir(directoryName, { recursive: true }, (err) => {
// //   if (err) {
// //     console.log(err);
// //     return;
// //   }
// //   console.log("Directory deleted successfully");
// // });

// /**
//  * path module - provides utilities for working with file and directory paths across different operating systems
//  * file paths differ from one operating system to another
//  * windows uses backslashes (\) while unix ( POSIX ) based systems use forward slashes (/)
//  */

// // const path = require("path");

// // const fullPath = path.join("folder", "subFolder", "file.txt");
// // console.log(fullPath);

// // const fileName = path.basename(fullPath);
// // console.log("filename", fileName);

// // const extName = path.extname(fullPath);
// // console.log("extension", extName);

// // const pathInfo = path.parse(fullPath);
// // console.log(pathInfo);

// // const normalizedPath = path.normalize("/path/to/../file.txt"); // relative path -> . ..
// // console.log(normalizedPath);

// // const complexPath = "/path/./to/../to/../../file.txt";
// // const normalizedPath = path.normalize(complexPath);
// // console.log("normalized", normalizedPath);

// const sourceFilePath = "./dir/file.txt";
// const destinationFilePath = "./destination-file.txt";

// // create a readable stream
// const readStream = fs.createReadStream(sourceFilePath);

// // create a writable stream
// const writeStream = fs.createWriteStream(destinationFilePath);

// // pipe the read stream to the write stream
// readStream.pipe(writeStream);

// readStream.on("error", (err) => {
//   console.error("Error reading the file", err);
// });

// writeStream.on("error", (err) => {
//   console.error("Error writing the file", err);
// });

// writeStream.on("finish", () => {
//   console.log("File written successfully");
// });

const http = require("http");
const server = http.createServer((req, res) => {
  // handle incoming requests
  res.setHeader("Content-type", "application/json"); // mime - types
  //   res.write("Hello World");
  //   res.write("<html><head><title>Node Js Http Server</title></head><body>");
  //   res.write("<h1>Hello World from Node</h1>");
  //   res.write("</body></html>");
  const jsonData = {
    message: "Hello World",
    date: new Date(),
  };

  const jsonResponse = JSON.stringify(jsonData);
  res.write(jsonResponse);
  res.end();
});

const port = 8001;
const host = "localhost";
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

/**
 * ephemereal ports
 */
