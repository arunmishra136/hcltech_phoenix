import jwt from "jsonwebtoken";

export const authPatient = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "patient") return res.status(403).json({ message: "Not patient token" });

    req.patient = decoded; 
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
