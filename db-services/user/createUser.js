import db from "@config/db";
export default async function createUser(){
    return new Promise(async(resolve,reject)=>{
        try{
            await db();
        }catch(e){
            reject(e);
        }

        
    })
}