const app = require("./app");

app.listen(app.get("port"));


console.log(`Server running in port ${app.get("port")}`)


