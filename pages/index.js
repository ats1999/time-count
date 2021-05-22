import dynamic from "next/dynamic";
const Today = dynamic(()=>import("@components/charts/Today"),{
    ssr:false
});
export default function Index(){
    return <div>
        <h1 className="text-dark text-center">Track where is your time</h1>
        <Today/>
    </div>
}