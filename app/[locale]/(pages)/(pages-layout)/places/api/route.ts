import { getPlacesList } from '@data/places/queries';

export async function GET() {
    const places = await getPlacesList();
    return Response.json(places);
}
