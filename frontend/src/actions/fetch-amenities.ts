import { cookies } from 'next/headers';

import { Amenity } from '@/types/amenity';
import { Pagination } from '@/types/global';

export async function fetchAmenities(
  page: number = 1,
  limit: number = 10,
  search: string = '',
  sortBy: string = 'name',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<{
  data: Amenity[];
  pagination: Pagination;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('Please login to continue');
  }

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    sortBy,
    sortOrder,
  });

  const res = await fetch(
    `http://localhost:4000/api/amenities?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.errors[0].message);
  }

  const { data, pagination } = await res.json();

  return { data, pagination };
}
