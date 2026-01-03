import { NextRequest, NextResponse } from 'next/server';

const NEWSDATA_API_KEY = 'pub_0b8bbc25434548d8a777ec2b7bf60273';
const NEWSDATA_API_URL = 'https://newsdata.io/api/1/latest';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'food';
    const language = searchParams.get('language') || 'en';
    const country = searchParams.get('country') || 'in';
    const page = searchParams.get('page');

    let apiUrl = `${NEWSDATA_API_URL}?apikey=${NEWSDATA_API_KEY}&country=${country}&language=${language}&category=${category}&image=1`;

    if (page) {
        apiUrl += `&page=${page}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('News fetch error:', error);
        return NextResponse.json({ status: 'error', message: 'Failed to fetch news' }, { status: 500 });
    }
}
