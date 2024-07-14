import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET" && req.url === "/api/hello") {
    return res.json({ message: "Hello World, from Vercel!" });
  } else if (req.method === "POST" && req.url === "/api/compile") {
    try {
      const { language, fileName, code } = req.body;
      const headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };
      const bodyContent = JSON.stringify({
        properties: {
          language,
          files: [{ name: fileName, content: code }],
          stdin: null,
        },
      });
      const reqOptions = {
        url: "https://onecompiler.com/api/code/exec",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      const response = await axios.request(reqOptions);
      return res.json(response.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(404).json({
      message: "Not Found",
      method: req.method || "unavailable",
      url: req.url || "unavailable url",
    });
  }
}
