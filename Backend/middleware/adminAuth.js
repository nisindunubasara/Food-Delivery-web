
import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
   try {
      const {token} = req.headers;
      if (!token) {
         return res.json({ success: false, message: "Access denied. No token provided." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== "admin") {
         return res.json({ success: false, message: "Access denied. Invalid token." });
      }

      next();
      
   } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
   }
}
 
export default adminAuth;
