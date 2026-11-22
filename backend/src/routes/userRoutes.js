import { Router } from "express";

const routerUser = Router();

routerUser.get("/user", async (req, res) => {
    res.send("ok Get");
});

routerUser.post("/user", async (req, res) => {
    res.send("ok Post");
});

routerUser.put("/user", async (req, res) => {
    res.send("ok Put");
});

routerUser.delete("/user", async (req, res) => {
    res.send("ok Delete");
});

export default routerUser;
