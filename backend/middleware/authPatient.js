import jwt from "jsonwebtoken";

export const authPatient = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.patient = decoded; // attaches patient data (id, email)
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
