import { NextRequest, NextResponse } from 'next/server';

const NEWSDATA_API_KEY = 'pub_0b8bbc25434548d8a777ec2b7bf60273';
const NEWSDATA_API_URL = 'https://newsdata.io/api/1/latest';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'food';
    const language = searchParams.get('language') || 'en';
    const country = searchParams.get('country') || 'in';
    const page = searchParams.get('page');

    const externalUrl = new URL(NEWSDATA_API_URL);
    externalUrl.searchParams.append('apikey', NEWSDATA_API_KEY);
    externalUrl.searchParams.append('country', country);
    externalUrl.searchParams.append('language', language);
    externalUrl.searchParams.append('category', category);
    externalUrl.searchParams.append('image', '1');

    if (page) {
        externalUrl.searchParams.append('page', page);
    }

    try {
        const response = await fetch(externalUrl.toString());
        const data = await response.json();

        if (!response.ok) {
            console.error('NewsData API Error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('News fetch error:', error);
        return NextResponse.json({ status: 'error', message: 'Failed to fetch news' }, { status: 500 });
    }
}
