import type { GridPaginationModel, GridFilterModel } from '@mui/x-data-grid';

export interface Users {
  id: string;
  first: string;
  last: string;
  gender: string;
  email: string;
  nat: string;
}

export async function getUsers({
  paginationModel,
  filterModel,
}: {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Users[]; itemCount: number }> {
  const results = paginationModel.pageSize;
  const seed = 'your-app-seed';
  const page = paginationModel.page + 1;

  const res = await fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}`
  );
  const data = await res.json();

  type ApiUser = {
    login: { uuid: string };
    name: { first: string; last: string };
    gender: string;
    email: string;
    nat: string;
  };

  let items: Users[] = data.results.map((user: ApiUser) => ({
    id: user.login.uuid,
    first: user.name.first,
    last: user.name.last,
    gender: user.gender,
    email: user.email,
    nat: user.nat,
  }));

  // Filter by gender
  const genderFilter = filterModel.items.find((item) => item.field === 'gender');
  if (genderFilter && genderFilter.value && genderFilter.value !== 'All') {
    items = items.filter((user) => user.gender.toLowerCase() === genderFilter.value.toLowerCase());
  }

  // Filter by nationality
  const nationalityFilter = filterModel.items.find((item) => item.field === 'nat');
  if (nationalityFilter && nationalityFilter.value && Array.isArray(nationalityFilter.value)) {
    const selectedNationalities = nationalityFilter.value.map((nat) => nat.toUpperCase());
    items = items.filter((user) => selectedNationalities.includes(user.nat.toUpperCase()));
  }

  return {
    items,
    itemCount: 5000,
  };
}
