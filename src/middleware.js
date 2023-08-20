import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default middleware = (request) => {
    const url = request.url
    const verified = request.cookies.get('loggedIn')

    // if (verified && url?.includes('/auth'))
    //     NextResponse.redirect('http://localhost:3000')

    // if (!verified && !url?.includes('/auth'))
    //     NextResponse.redirect('http://localhost:3000/auth')
}