import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { GENDER_OPTIONS } from '../constants';
import FilterButton from './FilterButton';

export default function GenderFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    handleClose();
  };

  return (
    <>
      <FilterButton
        onClick={handleClick}
        open={open}
        label={value === 'All' ? 'Genders' : value}
        ariaLabel="Filter by gender"
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {GENDER_OPTIONS.map((option) => (
          <MenuItem key={option} onClick={() => handleSelect(option)}>
            {value === option && (
              <ListItemIcon>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText inset={value !== option}>{option}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
