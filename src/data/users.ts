import axios from 'axios';
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
  const page = paginationModel.page + 1;

  const params: Record<string, string> = {
    page: String(page),
    results: String(results),
  };

  const genderFilter = filterModel.items.find((item) => item.field === 'gender');
  if (genderFilter && genderFilter.value && genderFilter.value !== 'All') {
    params.gender = genderFilter.value.toLowerCase();
  }

  const nationalityFilter = filterModel.items.find((item) => item.field === 'nat');
  if (
    nationalityFilter &&
    nationalityFilter.value &&
    Array.isArray(nationalityFilter.value) &&
    nationalityFilter.value.length > 0
  ) {
    params.nat = nationalityFilter.value.join(',').toUpperCase();
  }

  const { data } = await axios.get('https://randomuser.me/api/', { params });

  type ApiUser = {
    login: { uuid: string };
    name: { first: string; last: string };
    gender: string;
    email: string;
    nat: string;
  };

  const items: Users[] = data.results.map((user: ApiUser) => ({
    id: user.login.uuid,
    first: user.name.first,
    last: user.name.last,
    gender: user.gender,
    email: user.email,
    nat: user.nat,
  }));

  return {
    items,
    itemCount: 5000,
  };
}
