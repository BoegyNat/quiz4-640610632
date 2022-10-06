import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    //compute DB summary
    const users = readUsersDB();
    let countCustomer = 0;
    let countAdmin = 0;
    let sumMoney = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].isAdmin) {
        countAdmin++;
      } else {
        countCustomer++;
        sumMoney += users[i].money;
      }
    }
    //return response
    return res.json({
      ok: true,
      userCount: countCustomer,
      adminCount: countAdmin,
      totalMoney: sumMoney,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
