import { rest } from "msw";

let datas = ["jimmy", "timmy", "cindy", "judy", "marry", "tommy"];

export const handler = [
  rest.get("/data", async (req, res, ctx) => {
    return res(ctx.json(datas));
  }),
  rest.post("/data", async (req, res, ctx) => {
    console.log("req", await req.text());
    console.log("res", res());
    console.log("ctx", ctx);

    const request = req.body;

    datas.push(request);
    console.log(datas);
    return res(ctx.json(datas));
  }),
];
