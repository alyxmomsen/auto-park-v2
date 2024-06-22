import { Metadata } from "next";
import { toUpperCase } from "./utils"

export const metadata: Metadata = {
  title: "login",
  description: "Generated by create next app",
};


export default function Layout({ children }: {children:React.ReactNode}) {
    
    const str = toUpperCase('foo bar');

    return (
        <div>
            <h1>login layout</h1>
            <div>{ str }</div>
            <div>{ children }</div>
        </div>
    )

}