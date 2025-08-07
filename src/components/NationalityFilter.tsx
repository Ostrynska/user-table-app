import React, { useState } from 'react';
import { Menu, MenuItem, Checkbox, ListItemText } from '@mui/material';
import FilterButton from './FilterButton';
import { NATIONALITY_OPTIONS } from '../constants';

export default function NationalityFilter({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleToggle = (code: string) => {
    onChange(value.includes(code) ? value.filter((v) => v !== code) : [...value, code]);
  };

  return (
    <>
      <FilterButton
        onClick={handleClick}
        open={open}
        label={'Nationality'}
        ariaLabel="Filter by nationality"
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {NATIONALITY_OPTIONS.map(({ code, label }) => (
          <MenuItem key={code} onClick={() => handleToggle(code)}>
            <Checkbox checked={value.includes(code)} size="small" />
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
