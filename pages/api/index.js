import db from "@config/db";
const index=async(_,res)=>{
    await db();
    res.send("Hello")
}
export default index