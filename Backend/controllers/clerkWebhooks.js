import User from "../models/useModel.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
   try {
      
      const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
      console.log("Received webhook:", req.body);

      const headers = {
         "svix-id": req.headers["svix-id"],
         "svix-timestamp": req.headers["svix-timestamp"],
         "svix-signature": req.headers["svix-signature"],
      };
      console.log("Verifying webhook with headers:", headers);

      await whook.verify(JSON.stringify(req.body), headers)
      console.log("Webhook verified successfully");

      const {data, type} = req.body
      console.log("Processing webhook of type:", type, "with data:", data);

      const userData = {
         _id: data.id,
         email: data.email_addresses[0].email_address,
         username: data.first_name + " " + data.last_name,
         image: data.image_url,
      }
      console.log("Constructed user data for database operation:", userData);

      switch (type) {
         case "user.created":{
            const userData = {
               _id: data.id,
               email: data.email_addresses[0].email_address,
               username: data.first_name + " " + data.last_name,
               image: data.image_url,
            }
            await User.create(userData);
            console.log("User created in database with ID:", userData._id);
            break;
            
         }
         case "user.updated":{
            const userData = {
               _id: data.id,
               email: data.email_addresses[0].email_address,
               username: data.first_name + " " + data.last_name,
               image: data.image_url,
            }
            await User.findByIdAndUpdate(data.id, userData);
            console.log("User updated in database with ID:", userData._id);
            break;
           
         }
         case "user.deleted":{
            const userData = {
               _id: data.id,
               email: data.email_addresses[0].email_address,
               username: data.first_name + " " + data.last_name,
               image: data.image_url,
            }
            await User.findByIdAndDelete(data.id);
            console.log("User deleted from database with ID:", data.id);
            break;
            
         }
         default:
            console.log("Unhandled webhook type:", type);
            break;
            
      }
      res.json({success: true, message: "Webhook received successfully"})
      console.log("Response sent for webhook of type:");

   }  catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message});
      console.log("Error occurred while processing webhook of type:");
   }
}

export default clerkWebhooks;