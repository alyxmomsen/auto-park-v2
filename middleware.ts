import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export default async function my_mw(req: NextRequest, res: NextResponse) {
  const all_cookies = cookies().getAll();

  const response = NextResponse.next();

  if (req.nextUrl.pathname === "/") {
    cookies().getAll();

    // cookies().set('foo' , 'bar');

    console.log({ message: "hello from the middleware", all_cookies });
  }

  return response;
}
