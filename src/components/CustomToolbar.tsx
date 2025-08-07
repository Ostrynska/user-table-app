import { Box } from '@mui/material';
import GenderFilter from './GenderFilter';
import NationalityFilter from './NationalityFilter';

type Props = {
  genderFilter: string;
  onGenderChange: (value: string) => void;
  selectedNationalities: string[];
  onNationalityChange: (value: string[]) => void;
};

export default function CustomToolbar({
  genderFilter,
  onGenderChange,
  selectedNationalities,
  onNationalityChange,
}: Props) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        minHeight: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 1,
        backgroundColor: (theme) => (theme.vars || theme).palette.background.paper,
        boxSizing: 'border-box',
      }}
    >
      <GenderFilter value={genderFilter} onChange={onGenderChange} />
      <NationalityFilter value={selectedNationalities} onChange={onNationalityChange} />
    </Box>
  );
}
