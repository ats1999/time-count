import db from "@config/db";
export default async function createUser(data){
    return new Promise(async(resolve,reject)=>{
        try{
            await db();
            resolve();
        }catch(e){
            reject(e);
        }
    })
}