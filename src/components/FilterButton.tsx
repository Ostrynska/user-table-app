import { Button, Tooltip } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface FilterButtonProps extends ButtonProps {
  open: boolean;
  label: string;
  ariaLabel: string;
}

export default function FilterButton({
  open,
  label,
  ariaLabel,
  disabled,
  ...buttonProps
}: FilterButtonProps) {
  const button = (
    <Button
      variant="outlined"
      startIcon={<FilterListIcon />}
      endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      sx={{
        textTransform: 'none',
        borderRadius: 1.5,
        px: 1.5,
        maxWidth: '140px',
        justifyContent: 'space-between',
      }}
      disabled={disabled}
      {...buttonProps}
    >
      {label}
    </Button>
  );

  return (
    <Tooltip title={ariaLabel} placement="top" enterDelay={500}>
      {disabled ? <span>{button}</span> : button}
    </Tooltip>
  );
}
